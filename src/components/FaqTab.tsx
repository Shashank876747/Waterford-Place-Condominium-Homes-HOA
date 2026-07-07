import React, { useState } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp, Info, 
  ShieldAlert, BadgeInfo 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';
import { useSiteData } from '../context/SiteDataContext';

export default function FaqTab() {
  const { faqs } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<'all' | 'dues' | 'parking' | 'pets' | 'trash' | 'amenities' | 'rules'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1'); // Default open first FAQ

  const categories = [
    { name: 'All FAQs', id: 'all' },
    { name: 'Assessments & Dues', id: 'dues' },
    { name: 'Parking & Towing', id: 'parking' },
    { name: 'Pets Restrictions', id: 'pets' },
    { name: 'Trash & Bulk Waste', id: 'trash' },
    { name: 'Amenity & Clubhouse', id: 'amenities' },
    { name: 'Rules & Violations', id: 'rules' },
  ];

  const categoryLabels: Record<string, string> = {
    dues: 'Dues & Finance',
    parking: 'Parking Code',
    pets: 'Pets & Leashes',
    trash: 'Sanitation',
    amenities: 'Facilities',
    rules: 'Covenants',
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Helper to highlight search keywords
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-yellow-100 text-slate-900 font-semibold rounded px-0.5">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-12" id="faq-view-container">
      {/* Page Title header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Need quick answers regarding trash days, pet weights, clubhouse rental deposits, or auto-debit payments? Browse our categorized community guide or use the search bar.
        </p>
      </section>

      {/* Categories & Search block */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          {/* Categories list */}
          <div className="flex flex-wrap gap-1.5" id="faq-category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setExpandedId(null); // Close active when changing category
                }}
                id={`faq-cat-btn-${cat.id}`}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setExpandedId(null); // Reset expand during search for better view
              }}
              placeholder="Search FAQ answers..."
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-blue-900"
              id="faq-search-bar"
            />
          </div>
        </div>

        {/* Accordion list */}
        <div className="max-w-4xl mx-auto space-y-3" id="faq-accordion-list">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-blue-200 bg-blue-50/10 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Accordion trigger header */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  id={`faq-trigger-${faq.id}`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="rounded-full bg-slate-100 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200/40">
                        {categoryLabels[faq.category]}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {highlightText(faq.question, searchTerm)}
                    </h4>
                  </div>
                  <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-transform">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-900" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer Content panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-slate-100 p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                        <p>{highlightText(faq.answer, searchTerm)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No matching FAQs found for your current filter or search criteria. Try a simpler keyword.
            </div>
          )}
        </div>
      </section>

      {/* HOA Board Advisory Help Note */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto" id="faq-help-advisory">
        <div className="space-y-2 max-w-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-950 border border-blue-200">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-slate-900 text-lg">
            Have a question not listed here?
          </h3>
          <p className="text-xs text-slate-600 leading-normal">
            If you need clarification regarding individual property guidelines, lease registrations, or standard procedures, don't hesitate to reach out to Jennifer Sterling at Elite Management.
          </p>
        </div>

        <button
          onClick={() => {
            const contactBtn = document.getElementById('nav-btn-contact');
            if (contactBtn) contactBtn.click();
          }}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-white px-5 py-3 text-xs shadow-md shrink-0 transition-colors"
        >
          Contact Management Office
        </button>
      </section>
    </div>
  );
}
