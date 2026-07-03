import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqData: FAQItem[];
  onOpenEnquiry: (subject?: string) => void;
}

export default function FAQSection({ faqData, onOpenEnquiry }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14 space-y-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
          <HelpCircle size={12} />
          <span>Frictionless Answers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-on-surface tracking-tight">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-sm sm:text-base text-brand-on-surface-variant">
          Transparent insights into the engineering collaboration, project timelines, pricing models, and specialized support services.
        </p>
      </motion.div>

      {/* Accordion Layout */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'border-brand-primary/40 bg-brand-surface shadow-lg' 
                  : 'border-brand-outline-variant/20 dark:border-white/5 hover:border-brand-primary/30 hover:bg-brand-surface-container-low/30'
              }`}
            >
              {/* Trigger Button */}
              <button
                id={`faq-btn-${idx}`}
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-brand-on-surface transition-colors focus:outline-none cursor-pointer select-none"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
              >
                <span className="leading-snug">{faq.question}</span>
                <span 
                  className={`w-7 h-7 rounded-lg bg-brand-surface-container flex items-center justify-center text-brand-on-surface-variant/80 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-primary bg-brand-primary/10' : ''
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {/* Collapsible content wrapper */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-content-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: "easeOut" },
                        opacity: { duration: 0.25, delay: 0.05 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.25, ease: "easeIn" },
                        opacity: { duration: 0.15 }
                      }
                    }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-on-surface-variant/90 leading-relaxed font-sans border-t border-brand-outline-variant/10 dark:border-white/5 bg-brand-bg/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-brand-surface-container/50 border border-brand-outline-variant/20 dark:border-white/5 px-6 py-4 rounded-2xl max-w-2xl mx-auto shadow-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-on-surface-variant font-medium">
            <MessageSquare size={16} className="text-brand-tertiary" />
            <span>Have a different question about custom enterprise solutions?</span>
          </div>
          <button
            id="faq-enquiry-btn"
            onClick={() => onOpenEnquiry('Direct FAQ Consulting Inquiry')}
            className="text-brand-primary hover:text-brand-on-surface dark:hover:text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1 cursor-pointer group"
          >
            Ask Suhas Directly
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
