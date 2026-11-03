import React from 'react';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { HeartPulse, Droplets, Sparkles, ShieldAlert } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const icons = [
    <Droplets className="w-6 h-6 text-[var(--color-brand-700)]" />,
    <HeartPulse className="w-6 h-6 text-[var(--color-success)]" />,
    <ShieldAlert className="w-6 h-6 text-[var(--color-accent-500)]" />,
    <Sparkles className="w-6 h-6 text-[var(--color-warning)]" />
  ];

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-[var(--color-surface-alt)]/30 border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Badge variant="trust" className="mb-3">
            {BN.benefits.badge}
          </Badge>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
            {BN.benefits.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3 leading-relaxed">
            {BN.benefits.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BN.benefits.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all hover:-translate-y-1 text-left flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mb-4">
                {icons[idx]}
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-brand-900)] dark:text-[var(--color-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
