import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../lib/api';
import { BN } from '../content/bn';
import { formatBDT, formatWeight } from '../lib/format';
import { waProductLink } from '../lib/whatsapp';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/EmptyState';
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [is404, setIs404] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchProduct = async () => {
    if (!slug) {
      setIs404(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setIs404(false);

    try {
      const res = await api.getProductBySlug(slug);
      if (res.error?.code === 'NOT_FOUND') {
        setIs404(true);
      } else if (res.data) {
        setProduct(res.data);
        setSelectedImage(res.data.image_primary);
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  if (is404) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-6xl font-display font-extrabold text-[var(--color-brand-700)] mb-4">
          {BN.notFound.code}
        </h1>
        <h2 className="text-2xl font-bold font-display text-[var(--color-text)] mb-2">
          {BN.notFound.title}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto mb-6">
          {BN.notFound.desc}
        </p>
        <Link to="/products">
          <Button variant="primary">{BN.productDetail.backToProducts}</Button>
        </Link>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-20 px-4">
        <ErrorState onRetry={fetchProduct} />
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <Skeleton className="w-full aspect-[4/3] rounded-[var(--radius-lg)]" />
          </div>
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = product.images_json && product.images_json.length > 0
    ? product.images_json
    : [product.image_primary];

  return (
    <div className="py-8 sm:py-14 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-brand-700)] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{BN.productDetail.backToProducts}</span>
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-left mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Featured Photo */}
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] aspect-[4/3]">
              <img
                src={selectedImage || product.image_primary}
                alt={product.name_bn}
                className="w-full h-full object-cover"
              />
              {product.is_featured === 1 && (
                <div className="absolute top-3 left-3">
                  <Badge variant="trust" icon={<Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-500)]" />}>
                    সেরা সংগ্রহ
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-[var(--radius-sm)] overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImage === img
                        ? 'border-[var(--color-brand-700)] ring-2 ring-[var(--color-accent-500)]/40'
                        : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name_bn} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Information & 3 CTAs */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Category */}
            {product.category_name_bn && (
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)] mb-1">
                {product.category_name_bn}
              </span>
            )}

            {/* H1 Name */}
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight mb-3">
              {product.name_bn}
            </h1>

            {/* Weight and Price */}
            <div className="flex items-baseline gap-4 py-3 border-y border-[var(--color-border)] mb-5">
              <span className="text-2xl sm:text-3xl font-bold font-numeric text-[var(--color-brand-700)] dark:text-[var(--color-accent-400)]">
                {formatBDT(product.price_bdt)}
              </span>
              <span className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium">
                (নেট ওজন: {formatWeight(product.weight_grams)})
              </span>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20">
                {BN.products.stockIn}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-base text-[var(--color-text)] leading-relaxed mb-6 font-medium">
              {product.short_desc_bn}
            </p>

            {/* 3 CTAs as specified in 02_AppFlow §3.3 */}
            <div className="flex flex-col gap-3 mb-6">
              {/* CTA 1: WhatsApp with prefilled Bengali message */}
              <a
                href={waProductLink(product.name_bn, formatWeight(product.weight_grams))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="whatsapp"
                  className="w-full text-base sm:text-lg"
                  leftIcon={<MessageSquare className="w-5 h-5 fill-white" />}
                >
                  {BN.productDetail.whatsappCta}
                </Button>
              </a>

              {/* CTA 2 & CTA 3 Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`tel:${BN.brand.phoneRaw}`} className="w-full">
                  <Button
                    size="md"
                    variant="secondary"
                    className="w-full text-sm"
                    leftIcon={<Phone className="w-4 h-4 text-[var(--color-brand-700)]" />}
                  >
                    {BN.productDetail.callCta}
                  </Button>
                </a>

                <Link to={`/inquiry?product=${product.slug}`} className="w-full">
                  <Button
                    size="md"
                    variant="primary"
                    className="w-full text-sm"
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    {BN.productDetail.inquiryCta}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]/60 border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-text)] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                <span>১০০% প্রাকৃতিক খেজুর রস থেকে সরাসরি মাটির চুলায় গাঢ় করা</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[var(--color-brand-700)] shrink-0" />
                <span>{BN.productDetail.guaranteeNotice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Long Description and Sourcing Story */}
        {product.long_desc_bn && (
          <div className="border-t border-[var(--color-border)] pt-10 text-left max-w-4xl">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] mb-4">
              {BN.productDetail.sourcingTitle}
            </h2>
            <div className="text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
              <p>{product.long_desc_bn}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
