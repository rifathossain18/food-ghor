import React, { useState } from 'react';
import { BN } from '../../content/bn';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { waLink } from '../../lib/whatsapp';
import { ChevronDown, HelpCircle, MessageSquare, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const filteredItems = BN.faq.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[var(--color-surface-alt)]/25 border-y border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <Badge variant="trust" className="mb-3" icon={<HelpCircle className="w-3.5 h-3.5 text-[var(--color-accent-500)]" />}>
            {BN.faq.badge}
          </Badge>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-brand-900)] dark:text-[var(--color-text)] tracking-tight leading-tight">
            {BN.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3 leading-relaxed">
            {BN.faq.subtitle}
          </p>

          {/* Quick Search inside FAQ */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="প্রশ্ন খুঁজুন (যেমন: ডেলিভারি, ক্যাশ অন ডেলিভারি, সংরক্ষণ)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-700)] focus:ring-2 focus:ring-[var(--color-accent-500)]/30 transition-all shadow-[var(--shadow-sm)]"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5 text-left mb-10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-[var(--radius-md)] border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[var(--color-surface)] border-[var(--color-brand-700)] shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-brand-700)]/20'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-brand-500)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-[var(--color-brand-900)] dark:text-[var(--color-text)] leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[var(--color-brand-700)] dark:text-[var(--color-accent-400)] bg-[var(--color-surface-alt)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[var(--color-brand-700)] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)]/50">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
              আপনার অনুসন্ধানের সাথে মিল রেখে কোনো প্রশ্ন পাওয়া যায়নি। সরাসরি WhatsApp-এ জানতে পারেন।
            </div>
          )}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[var(--color-brand-900)] dark:text-[var(--color-text)]">
              {BN.faq.contactPrompt}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              আমাদের টিম সবসময় আপনাকে খাঁটি তথ্য ও পরামর্শ দিতে প্রস্তুত।
            </p>
          </div>
          <a
            href={waLink(undefined, 'আসসালামু আলাইকুম। ফুড ঘরের গুড় সম্পর্কে আমার কিছু জানার ছিল।')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0"
          >
            <Button
              size="md"
              variant="whatsapp"
              leftIcon={<MessageSquare className="w-4 h-4 fill-white" />}
              className="w-full sm:w-auto text-sm"
            >
              {BN.faq.whatsappCta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
