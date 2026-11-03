import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { waLink } from '../../lib/whatsapp';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  LayoutGrid,
  SlidersHorizontal,
  MessageSquare
} from 'lucide-react';

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <Badge variant="trust" className="mb-3">
              {BN.testimonials.badge}
            </Badge>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
              {BN.testimonials.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-2">
              {BN.testimonials.subtitle}
            </p>
          </div>

          {/* Aggregate Rating & View Mode Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Rating badge */}
            <div className="hidden sm:flex items-center gap-2 p-2 px-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
              <div className="flex text-[var(--color-accent-500)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                ৪.৯ / ৫.০ (৫০০+ পরিবার)
              </span>
            </div>

            {/* Slider / Grid Toggle */}
            <div className="flex items-center bg-[var(--color-surface-alt)] p-1 rounded-[var(--radius-md)] border border-[var(--color-border)]">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                aria-label="স্লাইডার ভিউ"
                className={`p-1.5 rounded-[var(--radius-sm)] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[var(--color-surface)] text-[var(--color-brand-700)] shadow-[var(--shadow-sm)] font-bold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">স্লাইডার</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="গ্রিড ভিউ"
                className={`p-1.5 rounded-[var(--radius-sm)] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[var(--color-surface)] text-[var(--color-brand-700)] shadow-[var(--shadow-sm)] font-bold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">সব রিভিউ</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. SLIDER LAYOUT MODE */}
        {viewMode === 'slider' ? (
          <div className="relative">
            {/* Active Card Showcase */}
            <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 sm:p-12 shadow-[var(--shadow-md)] text-left overflow-hidden">
              {/* Giant Background Quote Icon */}
              <Quote className="w-24 h-24 text-[var(--color-brand-500)]/10 absolute -top-4 -right-4 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                {/* Rating & Verified Buyer Pill */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex text-[var(--color-accent-500)]">
                    {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>যাচাইকৃত ক্রেতা</span>
                  </span>
                </div>

                {/* Big Quote */}
                <blockquote className="text-lg sm:text-2xl font-display text-[var(--color-brand-900)] dark:text-[var(--color-text)] leading-relaxed italic mb-8">
                  "{activeTestimonial.quote_bn}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]/60">
                  {activeTestimonial.avatar_url ? (
                    <img
                      src={activeTestimonial.avatar_url}
                      alt={activeTestimonial.customer_name_bn}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-accent-500)] shadow-[var(--shadow-sm)]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--color-surface-alt)] border-2 border-[var(--color-accent-500)] flex items-center justify-center font-bold text-lg text-[var(--color-brand-700)] shadow-[var(--shadow-sm)]">
                      {activeTestimonial.customer_name_bn.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[var(--color-brand-900)] dark:text-[var(--color-text)] leading-tight">
                      {activeTestimonial.customer_name_bn}
                    </h3>
                    {activeTestimonial.customer_location_bn && (
                      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-0.5">
                        📍 {activeTestimonial.customer_location_bn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Controls (Prev / Next & Dots) */}
            <div className="flex items-center justify-between mt-6 px-2">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`স্লাইড ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-[var(--color-brand-700)]'
                        : 'w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-brand-400)]'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="আগের রিভিউ"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-brand-500)] flex items-center justify-center transition-colors shadow-[var(--shadow-sm)] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="পরের রিভিউ"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-brand-500)] flex items-center justify-center transition-colors shadow-[var(--shadow-sm)] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 2. GRID LAYOUT MODE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex text-[var(--color-accent-500)]">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>যাচাইকৃত</span>
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed italic mb-6">
                    "{t.quote_bn}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.customer_name_bn}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center font-bold text-sm text-[var(--color-brand-700)]">
                      {t.customer_name_bn.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                      {t.customer_name_bn}
                    </h4>
                    {t.customer_location_bn && (
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {t.customer_location_bn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback invitation CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-3">
            আপনি কি ফুড ঘরের গুড় ব্যবহার করেছেন? আপনার মূল্যবান অভিজ্ঞতা আমাদের জানান।
          </p>
          <a
            href={waLink(undefined, 'আসসালামু আলাইকুম। আমি ফুড ঘরের গুড় নিয়ে আমার মতামত জানাতে চাই।')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<MessageSquare className="w-3.5 h-3.5 text-[var(--color-whatsapp)]" />}
            >
              আপনার রিভিউ পাঠান
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
