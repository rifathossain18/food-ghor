import React from 'react';
import { Link } from 'react-router-dom';
import { BN } from '../../content/bn';
import { JaggeryImages } from '../../assets/jaggeryImages';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToInquiry = () => {
    const elem = document.getElementById('inquiry');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 overflow-hidden">
      {/* Background warm subtle ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[var(--color-accent-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-[var(--color-brand-700)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top pill badge */}
            <Badge
              variant="trust"
              className="mb-4 sm:mb-6"
              icon={<Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-500)]" />}
            >
              {BN.hero.badge}
            </Badge>

            {/* H1 Display Heading */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-[1.18] mb-5">
              {BN.hero.title}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--color-text-muted)] font-normal leading-relaxed mb-8 max-w-2xl">
              {BN.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                onClick={scrollToInquiry}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                {BN.hero.ctaPrimary}
              </Button>

              <Link to="/products" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {BN.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* 3 Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--color-border)] w-full">
              {BN.hero.trustHighlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Image Card Col */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative framing */}
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)] border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
                <img
                  src={JaggeryImages.hero}
                  alt="খাঁটি যশোরের খেজুর পাটালি ও নলেন গুড় — ফুড ঘর"
                  fetchPriority="high"
                  className="w-full aspect-[4/3] object-cover"
                />

                {/* Floating Authenticity Seal */}
                <div className="absolute bottom-4 left-4 right-4 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-[var(--radius-md)] p-3.5 shadow-[var(--shadow-md)] flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand-700)] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-accent-400)]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold font-display text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                      ১০০% কেমিক্যাল ও চিনি মুক্ত
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      যশোরের ঐতিহ্যবাহী গাছিদের মাটির চুলায় গাঢ় করা
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative background card tilt */}
              <div className="absolute -inset-3 -z-10 rounded-[24px] bg-gradient-to-tr from-[var(--color-brand-700)]/20 via-[var(--color-accent-500)]/20 to-transparent blur-xs transform -rotate-1 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
