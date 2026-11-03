import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../lib/api';
import { BN } from '../content/bn';
import { Badge } from '../components/ui/Badge';
import { InquiryForm } from '../components/forms/InquiryForm';

export const InquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialProductSlug = searchParams.get('product') || undefined;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then((res) => {
      if (res.data) setProducts(res.data);
    });
  }, []);

  return (
    <div className="py-12 sm:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="trust" className="mb-3">
            {BN.inquiry.badge}
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
            {BN.inquiry.title}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3">
            {BN.inquiry.subtitle}
          </p>
        </div>

        <InquiryForm
          products={products}
          initialProductSlug={initialProductSlug}
          variant="standalone"
        />
      </div>
    </div>
  );
};
