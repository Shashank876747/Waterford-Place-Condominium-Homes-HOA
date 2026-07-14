import React, { useState } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';

export default function FaqTab() {
  const { faqs } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<'all' | 'dues' | 'parking' | 'pets' | 'trash' | 'amenities' | 'rules'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  // Helper to highlight matching text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 text-amber-950 px-0.5 rounded font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-12" id="faq-view-container">
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#3e3223] sm:text-4xl bg-[#f5efe6] inline-block px-6 py-2 rounded-2xl border border-[#e5dac4] shadow-sm">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Quickly find answers regarding assessments, towing policies, trash schedules, and Architectural Review Committee approvals. Filter by category or search below.
        </p>
      </section>

      {/* Categories & Search Panel */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-900/40 bg-slate-50 focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4" id="faq-accordion-container">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-blue-50/10 border-blue-200 shadow-sm' 
                    : 'bg-white border-slate-150 hover:border-slate-300'
                }`}
              >
                {/* Header panel */}
                <div className="flex items-center justify-between p-5 gap-4">
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="flex-1 text-left flex gap-3 items-start cursor-pointer focus:outline-none group"
                  >
                    <div className={`rounded-lg p-2 border shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'bg-blue-900 text-white border-blue-900' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-slate-100'
                    }`}>
                      <HelpCircle className="h-4 w-4" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {categoryLabels[faq.category] || faq.category}
                      </span>
                      <h4 className={`font-serif font-bold text-sm sm:text-base leading-snug transition-colors ${
                        isOpen ? 'text-blue-950' : 'text-slate-800 group-hover:text-slate-950'
                      }`}>
                        {highlightText(faq.question, searchTerm)}
                      </h4>
                    </div>
                  </button>

                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-transform"
                  >
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-900" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                </div>

                {/* Expanded Answer Content panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-slate-100 p-5 bg-white text-xs sm:text-sm text-slate-650 leading-relaxed space-y-3">
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
              No frequently asked questions registered yet. Add some FAQs in the Edit Site dashboard!
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
            If you need clarification regarding individual property guidelines, lease registrations, or standard procedures, don't hesitate to reach out to our management representatives.
          </p>
        </div>

        <button
          onClick={() => {
            const contactBtn = document.getElementById('nav-btn-contact');
            if (contactBtn) contactBtn.click();
          }}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-white px-5 py-3 text-xs shadow-md shrink-0 transition-colors cursor-pointer"
        >
          Contact Management Office
        </button>
      </section>
    </div>
  );
}
