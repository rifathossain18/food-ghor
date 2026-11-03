import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] animate-pulse ${className}`}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 flex flex-col gap-3">
      <Skeleton className="w-full aspect-[4/3]" />
      <Skeleton className="h-6 w-3/4 mt-2" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-12 w-full mt-2" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};
