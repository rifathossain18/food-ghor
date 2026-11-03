import { ApiEnvelope, Category, InquiryPayload, Product, Testimonial } from '../types';
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_TESTIMONIALS } from '../data/seedData';
import { ENV } from '../config/env';

const BASE_URL = ENV.API_BASE_URL;

// In-memory / localStorage rate limiting for inquiries
const RATE_LIMIT_KEY = 'foodghor_rl_inquiries';
const MAX_INQUIRIES = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 mins

function checkRateLimit(): boolean {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let hits: number[] = raw ? JSON.parse(raw) : [];
    hits = hits.filter((t) => now - t < WINDOW_MS);
    if (hits.length >= MAX_INQUIRIES) {
      return false; // limited
    }
    hits.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(hits));
    return true;
  } catch {
    return true;
  }
}

export const api = {
  async getHealth(): Promise<ApiEnvelope<{ ok: boolean; time: string }>> {
    return {
      data: { ok: true, time: new Date().toISOString() },
      meta: {},
      error: null
    };
  },

  async getProducts(params?: { category?: string; featured?: number; limit?: number }): Promise<ApiEnvelope<Product[]>> {
    if (BASE_URL) {
      try {
        const query = new URLSearchParams();
        if (params?.category) query.append('category', params.category);
        if (params?.featured) query.append('featured', String(params.featured));
        if (params?.limit) query.append('limit', String(params.limit));
        const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local dataset', err);
      }
    }

    // Local filter per 04_TRD
    let items = [...SEED_PRODUCTS].filter((p) => p.is_active === 1);
    if (params?.category) {
      const cat = SEED_CATEGORIES.find((c) => c.slug === params.category);
      if (cat) {
        items = items.filter((p) => p.category_id === cat.id);
      } else {
        items = [];
      }
    }
    if (params?.featured) {
      items = items.filter((p) => p.is_featured === 1);
    }
    if (params?.limit && params.limit > 0) {
      items = items.slice(0, params.limit);
    }

    return {
      data: items,
      meta: { total: items.length },
      error: null
    };
  },

  async getProductBySlug(slug: string): Promise<ApiEnvelope<Product>> {
    if (BASE_URL) {
      try {
        const res = await fetch(`${BASE_URL}/products/${slug}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local dataset', err);
      }
    }

    const product = SEED_PRODUCTS.find((p) => p.slug === slug && p.is_active === 1);
    if (!product) {
      return {
        data: null,
        meta: {},
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }
      };
    }

    return {
      data: product,
      meta: {},
      error: null
    };
  },

  async getCategories(): Promise<ApiEnvelope<Category[]>> {
    if (BASE_URL) {
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local dataset', err);
      }
    }

    const categories = SEED_CATEGORIES.filter((c) => c.is_active === 1).sort((a, b) => a.sort_order - b.sort_order);
    return {
      data: categories,
      meta: { total: categories.length },
      error: null
    };
  },

  async getTestimonials(limit: number = 3): Promise<ApiEnvelope<Testimonial[]>> {
    if (BASE_URL) {
      try {
        const res = await fetch(`${BASE_URL}/testimonials?limit=${limit}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local dataset', err);
      }
    }

    const list = SEED_TESTIMONIALS.filter((t) => t.is_active === 1)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, limit);

    return {
      data: list,
      meta: { total: list.length },
      error: null
    };
  },

  async submitInquiry(payload: InquiryPayload): Promise<ApiEnvelope<{ id: number; message: string }>> {
    // 1. Honeypot check
    if (payload.website && payload.website.trim().length > 0) {
      return {
        data: null,
        meta: {},
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Bot detected',
          fields: { website: 'must_be_empty' }
        }
      };
    }

    // 2. Rate limit check (5 per 15 min per 04_TRD §5)
    if (!checkRateLimit()) {
      return {
        data: null,
        meta: {},
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please try again after some time.'
        }
      };
    }

    // 3. Validation per 02_AppFlow §3.4
    const errors: Record<string, string> = {};
    if (!payload.name || payload.name.trim().length < 2 || payload.name.trim().length > 120) {
      errors.name = 'invalid_name_length';
    }

    const cleanPhone = payload.phone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!cleanPhone || !bdPhoneRegex.test(cleanPhone)) {
      errors.phone = 'invalid_format';
    }

    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errors.email = 'invalid_email';
    }

    if (Object.keys(errors).length > 0) {
      return {
        data: null,
        meta: {},
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Input validation failed',
          fields: errors
        }
      };
    }

    // 4. Remote forward if configured
    if (BASE_URL) {
      try {
        const res = await fetch(`${BASE_URL}/inquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return await res.json();
      } catch (err) {
        console.warn('API submit error, storing locally', err);
      }
    }

    // Store in localStorage for demonstration & pipeline view
    const storedInquiries = JSON.parse(localStorage.getItem('foodghor_inquiries') || '[]');
    const newId = Date.now();
    storedInquiries.push({
      id: newId,
      ...payload,
      status: 'new',
      created_at: new Date().toISOString()
    });
    localStorage.setItem('foodghor_inquiries', JSON.stringify(storedInquiries));

    return {
      data: { id: newId, message: 'Inquiry recorded successfully' },
      meta: {},
      error: null
    };
  }
};
