import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SkipToContent } from './components/layout/SkipToContent';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { InquiryPage } from './pages/InquiryPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { waLink } from './lib/whatsapp';
import { MessageSquare } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SkipToContent />
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
        <Header />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating WhatsApp Quick Action Button for Mobile & Desktop */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp-এ মেসেজ দিন"
          className="fixed bottom-6 right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-lg)] hover:scale-108 active:scale-95 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-whatsapp)]"
          title="WhatsApp-এ যোগাযোগ"
        >
          <MessageSquare className="w-7 h-7 fill-white" />
          <span className="sr-only">WhatsApp</span>
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
