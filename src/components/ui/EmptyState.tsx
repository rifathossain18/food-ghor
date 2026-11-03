import React from 'react';
import { PackageOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'কোনো তথ্য পাওয়া যায়নি',
  description = 'শীঘ্রই নতুন তথ্য ও পণ্য সংযোজন করা হবে।',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`py-12 px-6 flex flex-col items-center justify-center text-center max-w-md mx-auto rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-brand-600)] mb-4">
        <PackageOpen className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-xl font-bold font-display text-[var(--color-text)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">{description}</p>
      {actionText && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'কিছু তথ্য লোড করতে সমস্যা হচ্ছে',
  description = 'দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন অথবা পুনরায় চেষ্টা করুন।',
  onRetry,
  className = ''
}) => {
  return (
    <div
      className={`py-10 px-6 flex flex-col items-center justify-center text-center max-w-md mx-auto rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-error)]/30 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center text-[var(--color-error)] mb-3">
        <AlertCircle className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold font-display text-[var(--color-text)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-5">{description}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
          আবার চেষ্টা করুন
        </Button>
      )}
    </div>
  );
};
