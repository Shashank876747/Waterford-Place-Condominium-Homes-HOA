import React, { useState } from 'react';
import { 
  FileText, ArrowDownToLine, Search, Info, Check, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';

export default function DocumentsTab() {
  const { siteMetadata, documents } = useSiteData();
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

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.code && doc.code.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: string, fileName: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      // Simulate download link trigger
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      // Clean up
      document.body.removeChild(link);
      
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, id]);
    }, 1200);
  };

  return (
    <div className="space-y-12" id="docs-view-container">
      {/* Overview Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#3e3223] sm:text-4xl bg-[#f5efe6] inline-block px-6 py-2 rounded-2xl border border-[#e5dac4] shadow-sm">
          Governing Documents & Forms
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Access the official governing files, rules, financial records, and application packets for {siteMetadata.name} HOA. Files are distributed as PDFs or DOCs.
        </p>
      </section>

      {/* Info Notice */}
      <section className="rounded-2xl bg-amber-500/5 border border-amber-500/15 p-5 flex gap-4 max-w-3xl mx-auto items-start shadow-sm" id="governance-notice">
        <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Owner Legal Disclosure Requirement</h4>
          <p className="text-xs text-slate-550 leading-relaxed">
            By Georgia law and standard HOA Covenants, sellers of properties in {siteMetadata.name} must provide full sets of governing documents to potential buyers prior to closing. Download copies of full declarations or contact Elite Property Management for current structural resale disclosures.
          </p>
        </div>
      </section>

      {/* Category Tabs & Search Bar */}
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

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-900/40 bg-slate-50 focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Documents Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="docs-library-grid">
          <AnimatePresence>
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
                  className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold text-blue-900 uppercase tracking-widest bg-blue-50 border border-blue-100/50 rounded-md px-2 py-0.5">
                        {doc.code || 'DOC-GEN'}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-slate-400 uppercase">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-50 p-2.5 text-slate-700 border border-slate-100 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {categories.find((c) => c.id === doc.category)?.name || doc.category}
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
                          : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:shadow-md cursor-pointer'
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
                          <ArrowDownToLine className="h-3.5 w-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform animate-pulse" />
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
              No documents logged yet. Create or upload governing files in the Edit Site dashboard!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
