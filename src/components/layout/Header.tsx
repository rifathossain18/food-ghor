import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BN } from '../../content/bn';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { waLink } from '../../lib/whatsapp';
import { Menu, X, Sun, Moon, MessageSquare, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: BN.nav.home, to: '/' },
    { label: BN.nav.products, to: '/products' },
    { label: BN.nav.about, to: '/#about' },
    { label: BN.nav.benefits, to: '/#benefits' },
    { label: BN.nav.testimonials, to: '/#testimonials' },
    { label: BN.nav.faq, to: '/#faq' },
    { label: BN.nav.contact, to: '/inquiry' }
  ];

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    if (to.includes('#') && location.pathname === '/') {
      e.preventDefault();
      const hash = to.split('#')[1];
      const elem = document.getElementById(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[var(--shadow-md)] border-b border-[var(--color-border)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-brand-800)] to-[var(--color-brand-600)] flex items-center justify-center text-white shadow-[var(--shadow-sm)] group-hover:scale-105 transition-transform">
              <span className="text-xl">🍯</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-none">
                {BN.brand.nameBn}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium tracking-wide">
                {BN.brand.name} · খাঁটি দেশি গুড়
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(link.to, e)}
                className="px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand-700)] hover:bg-[var(--color-surface-alt)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Actions (Theme Toggle + CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--color-accent-400)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--color-brand-700)]" />
              )}
            </button>

            {/* Quick Order CTA */}
            <Link to="/inquiry" className="hidden sm:inline-block">
              <Button size="sm" variant="primary">
                {BN.nav.orderNow}
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[var(--color-surface)] shadow-[var(--shadow-lg)] flex flex-col p-6 z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍯</span>
                <span className="font-display font-bold text-lg text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
                  {BN.brand.nameBn}
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="মেনু বন্ধ করুন"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1.5 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(link.to, e)}
                  className="px-4 py-3 rounded-[var(--radius-md)] text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors text-left"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-2.5">
              <Link to="/inquiry" onClick={() => setIsMobileOpen(false)}>
                <Button size="md" variant="primary" className="w-full">
                  {BN.nav.orderNow}
                </Button>
              </Link>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="md"
                  variant="whatsapp"
                  className="w-full"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp-এ অর্ডার
                </Button>
              </a>

              <a
                href={`tel:${BN.brand.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল: {BN.brand.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
