import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';
import { SkeletonCard } from '../ui/Skeleton';
import { ArrowRight } from 'lucide-react';

export interface FeaturedProductsSectionProps {
  products: Product[];
  isLoading?: boolean;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  isLoading = false
}) => {
  const navigate = useNavigate();

  const handleSelectProduct = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  const handleOrderProduct = (product: Product) => {
    navigate(`/inquiry?product=${product.slug}`);
  };

  return (
    <section id="products" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 text-left">
          <div className="max-w-2xl">
            <Badge variant="trust" className="mb-3">
              {BN.products.badge}
            </Badge>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
              {BN.products.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-2">
              {BN.products.subtitle}
            </p>
          </div>

          <Link to="/products" className="shrink-0 hidden sm:inline-block">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              সব পণ্য দেখুন
            </Button>
          </Link>
        </div>

        {/* Product Cards Grid: 1 col < sm, 2 col sm-lg, 3 col >= lg */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleSelectProduct}
                onOrderNow={handleOrderProduct}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] py-8">{BN.products.emptyAllMessage}</p>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="w-full inline-block">
            <Button variant="secondary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              সব পণ্য দেখুন
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
