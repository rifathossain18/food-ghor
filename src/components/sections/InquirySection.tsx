import React from 'react';
import { Product } from '../../types';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { InquiryForm } from '../forms/InquiryForm';
import { Phone, ShieldCheck, Truck } from 'lucide-react';

export interface InquirySectionProps {
  products: Product[];
  selectedProductSlug?: string;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  products,
  selectedProductSlug
}) => {
  return (
    <section id="inquiry" className="py-16 sm:py-24 bg-[var(--color-surface-alt)]/20 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading & Reassurance */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <Badge variant="trust" className="mb-3">
              {BN.inquiry.badge}
            </Badge>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight mb-4">
              {BN.inquiry.title}
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
              {BN.inquiry.subtitle}
            </p>

            {/* Reassurance Feature Highlights */}
            <div className="flex flex-col gap-4 w-full">
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-start gap-3">
                <Truck className="w-5 h-5 text-[var(--color-brand-700)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-sm text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                    ক্যাশ অন ডেলিভারি
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    পণ্য হাতে পেয়ে ঘ্রাণ ও খাঁটি রূপ যাচাই করে নিশ্চিত মনে মূল্য পরিশোধ করুন।
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-sm text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                    শতভাগ বিশুদ্ধতার গ্যারান্টি
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    এক ফোঁটাও চিনি বা সোডা প্রমাণিত হলে সম্পূর্ণ টাকা তাৎক্ষণিক ফেরত।
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-accent-500)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-sm text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                    সরাসরি কথা বলুন
                  </h3>
                  <a
                    href={`tel:${BN.brand.phoneRaw}`}
                    className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline mt-0.5 inline-block"
                  >
                    হটলাইন: {BN.brand.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Form */}
          <div className="lg:col-span-7 w-full">
            <InquiryForm
              products={products}
              initialProductSlug={selectedProductSlug}
              variant="inline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
