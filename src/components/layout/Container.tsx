import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alt';
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = '',
  variant = 'default'
}) => {
  const bgStyle = variant === 'alt' ? 'bg-[var(--color-surface-alt)]/50' : 'bg-transparent';
  return (
    <section id={id} className={`py-12 sm:py-20 lg:py-24 ${bgStyle} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};
