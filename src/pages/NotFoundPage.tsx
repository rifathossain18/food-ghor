import React from 'react';
import { Link } from 'react-router-dom';
import { BN } from '../content/bn';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto">
        <span className="font-display font-black text-7xl sm:text-8xl text-[var(--color-brand-700)] dark:text-[var(--color-accent-400)] block mb-4">
          {BN.notFound.code}
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] mb-3">
          {BN.notFound.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] mb-8 leading-relaxed">
          {BN.notFound.desc}
        </p>
        <Link to="/">
          <Button size="lg" variant="primary" leftIcon={<Home className="w-5 h-5" />}>
            {BN.notFound.homeBtn}
          </Button>
        </Link>
      </div>
    </div>
  );
};
