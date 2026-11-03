import React from 'react';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { Sparkles, Leaf, Award, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const badgeIcons = [
    <Leaf className="w-5 h-5 text-[var(--color-success)]" />,
    <Flame className="w-5 h-5 text-[var(--color-warning)]" />,
    <Sparkles className="w-5 h-5 text-[var(--color-accent-500)]" />,
    <Award className="w-5 h-5 text-[var(--color-brand-700)]" />
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[var(--color-surface-alt)]/40 border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Sourcing Story */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Badge variant="trust" className="mb-4">
              {BN.about.badge}
            </Badge>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight mb-6 leading-tight">
              {BN.about.title}
            </h2>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              <p>{BN.about.p1}</p>
              <p>{BN.about.p2}</p>
              <p className="font-medium text-[var(--color-text)] border-l-2 border-[var(--color-accent-500)] pl-4 italic">
                {BN.about.p3}
              </p>
            </div>
          </div>

          {/* Right Column: Trust Badges Grid */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {BN.trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] flex items-start gap-3.5 text-left transition-all hover:border-[var(--color-brand-500)]"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center shrink-0 mt-0.5">
                  {badgeIcons[idx]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--color-brand-900)] dark:text-[var(--color-text)] mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
