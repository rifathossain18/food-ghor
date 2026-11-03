import React, { useEffect, useState } from 'react';
import { Product, Testimonial } from '../types';
import { api } from '../lib/api';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturedProductsSection } from '../components/sections/FeaturedProductsSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FaqSection } from '../components/sections/FaqSection';
import { InquirySection } from '../components/sections/InquirySection';
import { AlertCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        const [prodRes, testRes] = await Promise.all([
          api.getProducts({ featured: 1, limit: 3 }),
          api.getTestimonials(5)
        ]);

        if (isMounted) {
          if (prodRes.data) setProducts(prodRes.data);
          if (testRes.data) setTestimonials(testRes.data);
          if (prodRes.error || testRes.error) {
            setErrorBanner('কিছু তথ্য লোড করতে সমস্যা হচ্ছে।');
          }
        }
      } catch {
        if (isMounted) {
          setErrorBanner('কিছু তথ্য লোড করতে সমস্যা হচ্ছে।');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Inline Bengali error banner if data had issues */}
      {errorBanner && (
        <div className="bg-[var(--color-warning)]/15 border-b border-[var(--color-warning)]/30 text-[var(--color-warning)] px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. About & Sourcing Story */}
      <AboutSection />

      {/* 3. Featured Products */}
      <FeaturedProductsSection products={products} isLoading={isLoading} />

      {/* 4. Benefits */}
      <BenefitsSection />

      {/* 5. Customer Testimonials (Slider / Grid) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 6. FAQ (Common questions about chemical-free purity, delivery, payment) */}
      <FaqSection />

      {/* 7. Inquiry Form Section */}
      <InquirySection products={products} />
    </div>
  );
};
