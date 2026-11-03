import React from 'react';
import { Link } from 'react-router-dom';
import { BN } from '../../content/bn';
import { waLink } from '../../lib/whatsapp';
import { Phone, MapPin, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-12 text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-left">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🍯</span>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] leading-none">
                  {BN.brand.nameBn}
                </h3>
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  {BN.brand.tagline}
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {BN.brand.shortDescription}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success)]/10 px-3 py-1.5 rounded-[var(--radius-full)] w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% রাসায়নিক ও চিনিমুক্ত গ্যারান্টি</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-base text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
              {BN.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.products}
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.about}
                </a>
              </li>
              <li>
                <a href="/#benefits" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.benefits}
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.faq}
                </a>
              </li>
              <li>
                <Link to="/inquiry" className="hover:text-[var(--color-brand-700)] transition-colors">
                  {BN.nav.orderNow}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-base text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
              {BN.footer.contactTitle}
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--color-text-muted)]">
              <a
                href={`tel:${BN.brand.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-[var(--color-brand-700)] transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--color-brand-700)] shrink-0" />
                <span>{BN.brand.phoneDisplay}</span>
              </a>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[var(--color-success)] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[var(--color-whatsapp)] shrink-0" />
                <span>WhatsApp: {BN.brand.phoneDisplay}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-brand-700)] shrink-0" />
                <span>{BN.brand.email}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-brand-700)] shrink-0 mt-0.5" />
                <span>{BN.brand.address}</span>
              </div>
            </div>
          </div>

          {/* Trust & Guarantee */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-base text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
              ডেলিভারি ও নিশ্চয়তা
            </h4>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              ঢাকা সহ সারা দেশে হোম ডেলিভারি সুবিধা। পণ্য হাতে পেয়ে ঘ্রাণ ও বিশুদ্ধতা পরীক্ষা করে মূল্য পরিশোধ করুন।
            </p>
            <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-xs text-[var(--color-brand-800)] dark:text-[var(--color-accent-400)] font-medium">
              🌾 {BN.brand.established}
            </div>
          </div>
        </div>

        {/* Copyright & Bottom */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>{BN.footer.copyright}</p>
          <p className="flex items-center gap-1">
            <span>{BN.footer.craftedWith}</span>
            <Heart className="w-3.5 h-3.5 fill-[var(--color-brand-700)] text-[var(--color-brand-700)]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
