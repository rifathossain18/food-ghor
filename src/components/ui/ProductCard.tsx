import React, { useState } from 'react';
import { Product } from '../../types';
import { formatBDT, formatWeight } from '../../lib/format';
import { waProductLink } from '../../lib/whatsapp';
import { Button } from './Button';
import { Badge } from './Badge';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onSelect?: (slug: string) => void;
  onOrderNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onOrderNow }) => {
  const [imgError, setImgError] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent if clicked on a button or link
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    if (onSelect) onSelect(product.slug);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSelect) onSelect(product.slug);
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${product.name_bn}, দাম ${formatBDT(product.price_bdt)}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] text-left cursor-pointer"
    >
      {/* 4:3 Image Container with hover zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface-alt)]">
        {!imgError ? (
          <img
            src={product.image_primary}
            alt={product.name_bn}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#D4A574] to-[#7A4F2C] text-white">
            <span className="text-3xl mb-1">🍯</span>
            <span className="text-xs font-semibold tracking-wider uppercase opacity-90 font-display">
              খাঁটি দেশি গুড়
            </span>
          </div>
        )}

        {/* Featured Tag */}
        {product.is_featured === 1 && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <Badge variant="trust" icon={<Sparkles className="w-3 h-3 text-[var(--color-accent-500)]" />}>
              সেরা পছন্দ
            </Badge>
          </div>
        )}

        {/* Category Pill */}
        {product.category_name_bn && (
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium">
            {product.category_name_bn}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Name & Weight */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--color-brand-900)] dark:text-[var(--color-text)] group-hover:text-[var(--color-brand-700)] transition-colors line-clamp-1">
            {product.name_bn}
          </h3>
        </div>

        {/* Weight & Price Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium">
            নেট ওজন: {formatWeight(product.weight_grams)}
          </span>
          <span className="text-lg sm:text-xl font-bold font-numeric text-[var(--color-brand-700)] dark:text-[var(--color-accent-400)]">
            {formatBDT(product.price_bdt)}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.short_desc_bn}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[var(--color-border)]/60 flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            className="flex-1 text-xs sm:text-sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              if (onOrderNow) {
                onOrderNow(product);
              } else if (onSelect) {
                onSelect(product.slug);
              }
            }}
          >
            অর্ডার করুন
          </Button>

          <a
            href={waProductLink(product.name_bn, formatWeight(product.weight_grams))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${product.name_bn} WhatsApp-এ অর্ডার করুন`}
            className="h-9 px-3 rounded-[var(--radius-md)] bg-[var(--color-whatsapp)] text-white hover:brightness-105 shadow-[var(--shadow-sm)] flex items-center justify-center transition-all duration-200"
            title="WhatsApp-এ অর্ডার"
          >
            <MessageSquare className="w-4 h-4 fill-white text-[var(--color-whatsapp)]" />
          </a>
        </div>
      </div>
    </article>
  );
};
