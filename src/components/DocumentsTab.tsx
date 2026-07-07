import React, { useState } from 'react';
import { 
  FileText, Download, ArrowDownToLine, Search, Info, 
  HelpCircle, Scale, ShieldCheck, CheckCircle2, Check, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { documentsList, covenantsQuickReference } from '../data/documentsData';
import { DocumentItem } from '../types';

export default function DocumentsTab() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'governing' | 'rules' | 'minutes' | 'forms'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const categories = [
    { name: 'All Documents', id: 'all' },
    { name: 'Governing Documents', id: 'governing' },
    { name: 'Rules & Guidelines', id: 'rules' },
    { name: 'Financials & Minutes', id: 'minutes' },
    { name: 'Forms & Applications', id: 'forms' },
  ];

  const filteredDocs = documentsList.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: string, filename: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    
    // Simulate server response download lag
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, id]);
      
      // Simulate file delivery popup confirmation
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', filename);
      // We don't actually trigger natural system downloads since it is a mock environment,
      // but the full animation and status indicators are shown beautifully!
      
      // Reset downloaded tag after 4 seconds
      setTimeout(() => {
        setDownloadedIds((prev) => prev.filter((dId) => dId !== id));
      }, 4000);
    }, 1500);
  };

  return (
    <div className="space-y-12" id="documents-view-container">
      {/* Upper Title Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Documents Room & Covenants
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Access Waterford Place Condominium Association's public folders. Read the complete master covenants, bylaws, financial budgets, or download direct Architectural Control (ARC) forms.
        </p>
      </section>

      {/* Main Grid: Filters & Search */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5" id="doc-category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                id={`doc-cat-btn-${cat.id}`}
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

          {/* Search Input bar */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by code or title..."
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-blue-900"
              id="doc-search-bar"
            />
          </div>
        </div>

        {/* Documents Download Cards Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" id="documents-grid-layout">
          <AnimatePresence mode="popLayout">
            {filteredDocs.map((doc) => {
              const isDownloading = downloadingId === doc.id;
              const isDownloaded = downloadedIds.includes(doc.id);

              return (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-100 text-slate-500 rounded-lg px-2 py-0.5 border border-slate-200/50">
                        {doc.code}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-slate-800 text-base leading-tight">
                      {doc.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-normal">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Updated: {doc.lastUpdated}
                    </span>

                    <button
                      onClick={() => handleDownload(doc.id, `${doc.title}.${doc.fileType.toLowerCase()}`)}
                      disabled={isDownloading}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                        isDownloaded
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isDownloading
                          ? 'bg-blue-50 text-blue-900 border-blue-200'
                          : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:shadow-md'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-900" />
                          <span>Preparing...</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
                          <span>Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownToLine className="h-3.5 w-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                          <span>Get File</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredDocs.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No documents matched your category or search terms. Try searching for "Covenants" or "Rules".
            </div>
          )}
        </div>
      </section>

      {/* Covenants Quick Reference Guide */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <Scale className="h-6 w-6 text-blue-900" />
          <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900">
            Rules & Covenants Reference Room
          </h3>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl">
          We believe in mutual respect and clear guidelines. Here is a handy digest of the common rules enforced by the Board of Directors and property management.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2" id="covenants-reference-room">
          {covenantsQuickReference.map((topicItem, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Decorative line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-900 to-indigo-950" />
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-950 border border-blue-100">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  {topicItem.topic}
                </h4>
              </div>

              <ul className="space-y-3">
                {topicItem.rules.map((ruleText, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-600 leading-normal">
                      {ruleText}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
