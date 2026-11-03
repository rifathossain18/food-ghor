import React from 'react';

export type BadgeVariant = 'trust' | 'success' | 'warning' | 'error' | 'neutral';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'trust',
  className = '',
  icon
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    trust:
      'border border-[var(--color-accent-500)] bg-[var(--color-surface)] text-[var(--color-brand-800)] dark:text-[var(--color-accent-400)] font-medium',
    success:
      'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20 font-medium',
    warning:
      'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20 font-medium',
    error:
      'bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20 font-medium',
    neutral:
      'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)] font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] text-xs tracking-wide select-none ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
