import React from 'react';
import { 
  FileText, ChevronRight, Bell, ArrowRight, DollarSign, PenTool, Wrench
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import waterfordEntrance from '../assets/images/waterford_entrance_1784035525881.jpg';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  navigateToPortal?: (tab: string, subTab?: 'dues' | 'maintenance' | 'arc') => void;
}

export default function HomeTab({ setActiveTab, navigateToPortal }: HomeTabProps) {
  const { siteMetadata, announcements } = useSiteData();

  const quickLinks = [
    {
      title: 'Download Governing Docs',
      desc: 'Access full Covenants, Rules and Bylaws.',
      icon: FileText,
      tab: 'documents',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Submit Exterior Alterations',
      desc: 'Submit exterior alteration requests online.',
      icon: PenTool,
      tab: 'portal',
      subTab: 'arc' as const,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Report Maintenance Issue',
      desc: 'Log issues for community fixtures or grounds.',
      icon: Wrench,
      tab: 'portal',
      subTab: 'maintenance' as const,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Dues & Payments',
      desc: 'Review balance and pay monthly dues securely.',
      icon: DollarSign,
      tab: 'portal',
      subTab: 'dues' as const,
      color: 'from-amber-500 to-orange-600',
    }
  ];

  return (
    <div className="space-y-12" id="home-view-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl" id="home-hero">
        {/* Entrance Sign Background Image */}
        <img 
          src={waterfordEntrance}
          alt="Waterford Place Entrance monument"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-indigo-950/80 to-slate-900/80" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-12 sm:py-28 lg:px-16 flex flex-col items-center text-center justify-center gap-8">
          <div className="max-w-3xl space-y-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 border border-amber-500/35 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Waterford Place Community Portal
            </span>
            
            <div className="inline-flex justify-center">
              <h2 className="font-serif text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3.5 rounded-2xl border border-white/10 shadow-xl">
                <span>{siteMetadata.heroTitle}</span>
              </h2>
            </div>

            {siteMetadata.heroSubtitle && (
              <p className="text-base text-slate-300 leading-relaxed max-w-xl flex items-center justify-center gap-2">
                <span>{siteMetadata.heroSubtitle}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('portal')}
                className="w-full sm:w-auto rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg hover:bg-amber-400 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Access Resident Portal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="w-full sm:w-auto rounded-xl bg-slate-800 border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Read HOA Rules</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome to our Community Portal Card */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase font-mono tracking-widest block">Welcome</span>
          
          <h3 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            {siteMetadata.welcomeTitle}
          </h3>

          <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
            {siteMetadata.welcomeText}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => setActiveTab('contact')}
            className="rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs px-5 py-3 shadow transition-all"
          >
            Contact Management
          </button>
          
          <button
            onClick={() => setActiveTab('documents')}
            className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs px-5 py-3 shadow-sm transition-all"
          >
            View Documents
          </button>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900">
          Resident Quick Links
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (item.tab === 'portal' && navigateToPortal) {
                    navigateToPortal('portal', item.subTab);
                  } else {
                    setActiveTab(item.tab);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.color}`} />
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-800 transition-colors group-hover:bg-blue-50 group-hover:text-blue-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-900 transition-all group-hover:translate-x-1" />
                </div>
                <h4 className="font-semibold text-slate-900 mt-4 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community News Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" />
            Community News
          </h3>
          <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">
            Live Feed
          </span>
        </div>

        <div className="space-y-6">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                    item.category === 'Important' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200/50' 
                      : item.category === 'Maintenance' 
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200/50' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-semibold">{item.date}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">By: {item.author}</span>
              </div>
              <h4 className="font-semibold text-slate-900 text-lg mt-3 hover:text-blue-900 cursor-pointer">
                {item.title}
              </h4>
              <p className="text-sm text-slate-650 leading-relaxed mt-2.5">
                {item.content}
              </p>
            </article>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
              <p className="text-sm text-slate-500">No active announcements. Publish some in the Edit Site dashboard!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
