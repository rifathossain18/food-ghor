import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BN } from '../../content/bn';
import { Product, InquiryType } from '../../types';
import { api } from '../../lib/api';
import { waLink } from '../../lib/whatsapp';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { MessageSquare, AlertTriangle } from 'lucide-react';

export interface InquiryFormProps {
  products?: Product[];
  initialProductSlug?: string;
  variant?: 'inline' | 'standalone';
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  products = [],
  initialProductSlug,
  variant = 'inline'
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState<number | string>('');
  const [quantity, setQuantity] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>('retail');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // website field

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitCooldown, setRateLimitCooldown] = useState(0);
  const [toastMessage, setToastMessage] = useState<{ type: 'error' | 'warning'; text: string } | null>(null);

  // Pre-fill product if given
  useEffect(() => {
    if (initialProductSlug && products.length > 0) {
      const match = products.find((p) => p.slug === initialProductSlug);
      if (match) {
        setProductId(match.id);
      }
    }
  }, [initialProductSlug, products]);

  // Handle rate limit countdown
  useEffect(() => {
    if (rateLimitCooldown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitCooldown]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = BN.inquiry.errors.nameRequired;
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const bdRegex = /^01[3-9]\d{8}$/;
    if (!cleanPhone || !bdRegex.test(cleanPhone)) {
      errs.phone = BN.inquiry.errors.phoneRequired;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = BN.inquiry.errors.emailInvalid;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(null);

    if (rateLimitCooldown > 0) {
      setToastMessage({
        type: 'warning',
        text: `অপেক্ষা করুন (${rateLimitCooldown} সেকেন্ড পর পুনরায় চেষ্টা করতে পারবেন)`
      });
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        product_id: productId ? Number(productId) : null,
        quantity: quantity.trim() || null,
        inquiry_type: inquiryType,
        message: message.trim() || undefined,
        website: honeypot // honeypot
      });

      if (res.error) {
        if (res.error.code === 'RATE_LIMITED') {
          setRateLimitCooldown(60);
          setToastMessage({
            type: 'warning',
            text: BN.inquiry.errors.rateLimit
          });
        } else if (res.error.code === 'VALIDATION_ERROR' && res.error.fields) {
          const fieldErrs: Record<string, string> = {};
          if (res.error.fields.name) fieldErrs.name = BN.inquiry.errors.nameRequired;
          if (res.error.fields.phone) fieldErrs.phone = BN.inquiry.errors.phoneRequired;
          setErrors(fieldErrs);
        } else {
          setToastMessage({
            type: 'error',
            text: BN.inquiry.errors.serverError
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Success -> Redirect to /thank-you with state { name }
      navigate('/thank-you', { state: { name: name.trim() } });
    } catch {
      setToastMessage({
        type: 'error',
        text: BN.inquiry.errors.serverError
      });
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setProductId('');
    setQuantity('');
    setInquiryType('retail');
    setMessage('');
    setErrors({});
    setToastMessage(null);
  };

  const productOptions = products.map((p) => ({
    value: p.id,
    label: `${p.name_bn} (${p.weight_grams ? p.weight_grams + ' গ্রাম' : ''} - ৳ ${p.price_bdt})`
  }));

  return (
    <div
      className={`w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-md)] text-left ${
        variant === 'standalone' ? 'max-w-2xl mx-auto' : ''
      }`}
    >
      {/* Toast Alert Banner if error/warning */}
      {toastMessage && (
        <div
          role="alert"
          className={`p-4 rounded-[var(--radius-md)] mb-6 flex items-start gap-3 text-sm font-medium ${
            toastMessage.type === 'warning'
              ? 'bg-[var(--color-warning)]/15 border border-[var(--color-warning)]/40 text-[var(--color-warning)]'
              : 'bg-[var(--color-error)]/15 border border-[var(--color-error)]/40 text-[var(--color-error)]'
          }`}
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{toastMessage.text}</p>
            {toastMessage.type === 'error' && (
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold underline"
              >
                <span>WhatsApp-এ সরাসরি মেসেজ দিন</span>
              </a>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Honeypot field (hidden from genuine users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Input
            label={BN.inquiry.form.nameLabel}
            placeholder={BN.inquiry.form.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <Input
            label={BN.inquiry.form.phoneLabel}
            placeholder={BN.inquiry.form.phonePlaceholder}
            helper={BN.inquiry.form.phoneHint}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            required
          />
        </div>

        {/* Row 2: Product and Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Select
            label={BN.inquiry.form.productLabel}
            placeholder={BN.inquiry.form.productPlaceholder}
            options={productOptions}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <Input
            label={BN.inquiry.form.quantityLabel}
            placeholder={BN.inquiry.form.quantityPlaceholder}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Inquiry Type (Retail vs Wholesale / পাইকারি) */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-sm font-medium text-[var(--color-text)]">
            {BN.inquiry.form.typeLabel}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`flex items-center gap-3 p-3.5 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                inquiryType === 'retail'
                  ? 'border-[var(--color-brand-700)] bg-[var(--color-surface-alt)] font-semibold text-[var(--color-brand-900)] dark:text-[var(--color-text)] ring-1 ring-[var(--color-brand-700)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]'
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value="retail"
                checked={inquiryType === 'retail'}
                onChange={() => setInquiryType('retail')}
                className="w-4 h-4 text-[var(--color-brand-700)] accent-[var(--color-brand-700)] cursor-pointer"
              />
              <span className="text-sm">{BN.inquiry.form.typeRetail}</span>
            </label>

            <label
              className={`flex items-center gap-3 p-3.5 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                inquiryType === 'wholesale'
                  ? 'border-[var(--color-brand-700)] bg-[var(--color-surface-alt)] font-semibold text-[var(--color-brand-900)] dark:text-[var(--color-text)] ring-1 ring-[var(--color-brand-700)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]'
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value="wholesale"
                checked={inquiryType === 'wholesale'}
                onChange={() => setInquiryType('wholesale')}
                className="w-4 h-4 text-[var(--color-brand-700)] accent-[var(--color-brand-700)] cursor-pointer"
              />
              <span className="text-sm">{BN.inquiry.form.typeWholesale}</span>
            </label>
          </div>
        </div>

        {/* Email (Optional) */}
        <Input
          label={BN.inquiry.form.emailLabel}
          placeholder={BN.inquiry.form.emailPlaceholder}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        {/* Message / Address */}
        <Textarea
          label={BN.inquiry.form.messageLabel}
          placeholder={BN.inquiry.form.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />

        {/* Buttons / Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            disabled={rateLimitCooldown > 0}
            className="w-full sm:flex-1 text-base sm:text-lg"
          >
            {rateLimitCooldown > 0
              ? `অপেক্ষা করুন (${rateLimitCooldown}s)`
              : BN.inquiry.form.submitBtn}
          </Button>

          <Button
            type="button"
            size="md"
            variant="ghost"
            onClick={handleReset}
            className="w-full sm:w-auto text-sm text-[var(--color-text-muted)]"
          >
            {BN.inquiry.form.cancelBtn}
          </Button>
        </div>

        {/* Direct WhatsApp Helper Banner */}
        <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[var(--color-text-muted)]">
          <span>{BN.inquiry.form.directWaText}</span>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              type="button"
              size="sm"
              variant="whatsapp"
              leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto text-xs"
            >
              {BN.inquiry.form.directWaBtn}
            </Button>
          </a>
        </div>
      </form>
    </div>
  );
};
