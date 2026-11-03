import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--color-brand-700)] text-white rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
    >
      মূল কন্টেন্টে যান
    </a>
  );
};
