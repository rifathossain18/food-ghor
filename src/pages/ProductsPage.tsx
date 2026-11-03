import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Category, Product } from '../types';
import { api } from '../lib/api';
import { BN } from '../content/bn';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/ui/ProductCard';
import { SkeletonCard } from '../components/ui/Skeleton';
import { EmptyState, ErrorState } from '../components/ui/EmptyState';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategorySlug = searchParams.get('category') || '';

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadData = async (catSlug?: string) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [catsRes, prodsRes] = await Promise.all([
        api.getCategories(),
        api.getProducts(catSlug ? { category: catSlug } : undefined)
      ]);

      if (catsRes.data) setCategories(catsRes.data);
      if (prodsRes.data) setProducts(prodsRes.data);

      if (catsRes.error || prodsRes.error) {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedCategorySlug);
  }, [selectedCategorySlug]);

  const handleCategorySelect = (slug: string) => {
    if (!slug) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="trust" className="mb-3">
            {BN.products.badge}
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
            {BN.products.title}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3">
            {BN.products.subtitle}
          </p>
        </div>

        {/* Category Filter Pills per 02_AppFlow §3.2 */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium transition-all cursor-pointer ${
              selectedCategorySlug === ''
                ? 'bg-[var(--color-brand-700)] text-white shadow-[var(--shadow-sm)]'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]'
            }`}
          >
            {BN.products.filterAll}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium transition-all cursor-pointer ${
                selectedCategorySlug === cat.slug
                  ? 'bg-[var(--color-brand-700)] text-white shadow-[var(--shadow-sm)]'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {cat.name_bn}
            </button>
          ))}
        </div>

        {/* Screen State Handling */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : hasError ? (
          <ErrorState onRetry={() => loadData(selectedCategorySlug)} />
        ) : products.length === 0 ? (
          <EmptyState
            title="কোনো পণ্য পাওয়া যায়নি"
            description={
              selectedCategorySlug
                ? 'এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।'
                : 'শীঘ্রই নতুন মৌসুমি গুড় সংগ্রহ আসছে।'
            }
            actionText={selectedCategorySlug ? 'সব পণ্য দেখুন' : undefined}
            onAction={() => handleCategorySelect('')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(slug) => navigate(`/products/${slug}`)}
                onOrderNow={(p) => navigate(`/inquiry?product=${p.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
