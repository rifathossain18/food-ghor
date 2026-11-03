import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BN } from '../content/bn';
import { waLink } from '../lib/whatsapp';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, MessageSquare, Home, Phone } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const userName = location.state?.name;

  return (
    <div className="py-20 sm:py-28 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)] flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-sm)]">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2]" />
        </div>

        <Badge variant="success" className="mb-4">
          {BN.thankYou.badge}
        </Badge>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight mb-4">
          {userName ? `${userName}, আপনার তথ্য সফলভাবে গৃহীত হয়েছে!` : BN.thankYou.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-lg mx-auto">
          {BN.thankYou.subtitle}
        </p>

        {/* 2 Primary CTAs per 02_AppFlow §3.5 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link to="/" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" leftIcon={<Home className="w-5 h-5" />} className="w-full sm:w-auto">
              {BN.thankYou.homeBtn}
            </Button>
          </Link>

          <a
            href={waLink(
              undefined,
              userName
                ? `আসসালামু আলাইকুম। আমি (${userName}) একটু আগে ফুড ঘরে অর্ডার সাবমিট করেছি।`
                : 'আসসালামু আলাইকুম। আমি একটু আগে ফুড ঘরে অর্ডার সাবমিট করেছি।'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="whatsapp"
              leftIcon={<MessageSquare className="w-5 h-5 fill-white" />}
              className="w-full sm:w-auto"
            >
              {BN.thankYou.whatsappBtn}
            </Button>
          </a>
        </div>

        {/* Support Direct Call */}
        <div className="pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
          <span>{BN.thankYou.supportText} </span>
          <a
            href={`tel:${BN.brand.phoneRaw}`}
            className="font-bold text-[var(--color-brand-700)] hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>{BN.brand.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
