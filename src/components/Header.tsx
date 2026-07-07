import React, { useState } from 'react';
import { Menu, X, Search, Shield, Building, User, KeyRound, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqList } from '../data/faqData';
import { documentsList } from '../data/documentsData';
import { eventsList } from '../data/eventsData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, setSearchQuery }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Covenants & Docs', id: 'documents' },
    { name: 'Board & Management', id: 'board' },
    { name: 'Calendar & Events', id: 'calendar' },
    { name: 'FAQs', id: 'faq' },
    { name: 'Resident Portal', id: 'portal' },
    { name: 'Contact Us', id: 'contact' },
  ];

  // Perform a live lookup across FAQs, Documents, and Events
  const searchResults = localSearch.trim()
    ? [
        ...faqList
          .filter(
            f =>
              f.question.toLowerCase().includes(localSearch.toLowerCase()) ||
              f.answer.toLowerCase().includes(localSearch.toLowerCase())
          )
          .map(f => ({ ...f, type: 'FAQ', tab: 'faq' })),
        ...documentsList
          .filter(
            d =>
              d.title.toLowerCase().includes(localSearch.toLowerCase()) ||
              d.description.toLowerCase().includes(localSearch.toLowerCase())
          )
          .map(d => ({ ...d, type: 'Document', tab: 'documents' })),
        ...eventsList
          .filter(
            e =>
              e.title.toLowerCase().includes(localSearch.toLowerCase()) ||
              e.description.toLowerCase().includes(localSearch.toLowerCase())
          )
          .map(e => ({ ...e, type: 'Event', tab: 'calendar' })),
      ].slice(0, 5)
    : [];

  const handleSearchResultClick = (tab: string, query: string) => {
    setActiveTab(tab);
    setSearchQuery(query);
    setShowSearch(false);
    setLocalSearch('');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand */}
          <div 
            className="flex cursor-pointer items-center space-x-3" 
            onClick={() => setActiveTab('home')}
            id="header-brand"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 shadow-md">
              <Shield className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Waterford Place
              </h1>
              <p className="text-xs font-mono font-medium tracking-widest uppercase text-slate-500">
                Condominium Homes HOA
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav">
            {navigation.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-amber-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility buttons (Search & Portal Quick Link) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(true)}
              id="search-trigger-btn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Search website"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              id="portal-quick-btn"
              className="flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md"
            >
              <KeyRound className="h-4 w-4 text-amber-400" />
              <span>Resident Portal</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={() => setShowSearch(true)}
              id="search-trigger-btn-mobile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Search website"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-100 bg-white xl:hidden overflow-hidden"
            id="mobile-nav-drawer"
          >
            <div className="space-y-1.5 px-4 py-4">
              {navigation.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    id={`mobile-nav-btn-${item.id}`}
                    className={`flex w-full items-center rounded-xl px-4 py-3 text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50/70 text-blue-900 pl-6'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setActiveTab('portal');
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-900"
                >
                  <KeyRound className="h-4 w-4 text-amber-400" />
                  <span>Resident Sign-In</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Live Search Modal Overlay */}
      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="search-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSearch(false);
                setLocalSearch('');
              }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <div className="flex min-h-screen items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24">
              <motion.div
                initial={{ scale: 0.95, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: -20, opacity: 0 }}
                className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5"
              >
                {/* Input bar */}
                <div className="flex items-center border-b border-slate-200 px-4 py-3">
                  <Search className="h-6 w-6 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Search covenants, bylaws, FAQs, events..."
                    className="ml-3 h-10 w-full text-slate-800 placeholder-slate-400 focus:outline-none sm:text-base"
                    autoFocus
                    id="search-input-field"
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setLocalSearch('');
                    }}
                    className="ml-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Results panel */}
                <div className="max-h-96 overflow-y-auto p-4">
                  {localSearch.trim() === '' ? (
                    <div className="py-6 text-center">
                      <p className="text-sm text-slate-500">
                        Type keywords to scan the community knowledge base
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {['covenants', 'parking', 'trash', 'dues', 'pool', 'bylaws'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setLocalSearch(tag)}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-1">
                      <p className="px-2 text-xs font-mono tracking-wider uppercase text-slate-400 font-bold mb-2">
                        Search Results ({searchResults.length})
                      </p>
                      {searchResults.map((res: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchResultClick(res.tab, localSearch)}
                          className="flex w-full items-start rounded-xl p-3 text-left hover:bg-slate-50 transition-colors group"
                        >
                          <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors">
                            {res.type === 'FAQ' && <Shield className="h-4 w-4" />}
                            {res.type === 'Document' && <Building className="h-4 w-4" />}
                            {res.type === 'Event' && <User className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                                {res.type}
                              </span>
                              <span className="text-xs font-semibold text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                Go <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-900">
                              {res.title || res.question}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {res.description || res.answer}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-500">
                      No results found for "<span className="font-semibold">{localSearch}</span>"
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
