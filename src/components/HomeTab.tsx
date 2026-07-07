import React from 'react';
import { 
  FileText, Calendar, HelpCircle, 
  Wrench, ShieldAlert, CheckCircle2, ChevronRight, Info,
  Bell, Pin, CalendarDays, ExternalLink, ArrowRight, DollarSign, PenTool
} from 'lucide-react';
import { motion } from 'motion/react';
import { Announcement } from '../types';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Annual Pool Re-Opening & Safety Rules',
      date: '2026-07-01',
      category: 'Important',
      content: 'The community pool is officially open for the summer season! Operating hours are daily from 8:00 AM to 10:00 PM. Please review the updated safety policies, including the 2-guest-per-unit limit and no glass containers on the pool deck. Physical pool passes must be visible at all times.',
      author: 'Chloe Tremblay, Board Social Chair',
    },
    {
      id: '2',
      title: 'Buildings C & D Roofing Inspections Scheduled',
      date: '2026-06-28',
      category: 'Maintenance',
      content: 'Apex Roofing will conduct comprehensive attic and roof-shingle inspections for Buildings C and D on July 10th and 11th, between 8:30 AM and 4:30 PM. Inspectors will use drone cameras and ladders. Co-owners do not need to be home. Please ensure balconies are cleared of delicate items.',
      author: 'Marcus Vance, VP of Facilities',
    },
    {
      id: '3',
      title: 'Monthly HOA Dues Payment Portal Active',
      date: '2026-06-25',
      category: 'Important',
      content: 'Residents can now calculate, view, and make simulated secure payments for their monthly HOA dues directly through our new Resident Portal tab on this website! If you have direct debit set up, no actions are required.',
      author: 'Elena Rostova, Treasurer',
    },
    {
      id: '4',
      title: 'Next Board of Directors Meeting Details',
      date: '2026-06-20',
      category: 'General',
      content: 'Our next quarterly Board Meeting is scheduled for July 15th at 7:00 PM. It will be held in person in the clubhouse, with a streaming Zoom link option for remote participants. General discussion on our 30-year reserve fund study will be the main agenda item.',
      author: 'David Kojo, Secretary',
    }
  ];

  const quickLinks = [
    {
      title: 'Download Governing Docs',
      desc: 'Access full Covenants, Rules and Bylaws.',
      icon: FileText,
      tab: 'documents',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Architectural Approvals',
      desc: 'Submit exterior alteration requests online.',
      icon: PenTool,
      tab: 'portal',
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Report Maintenance Issue',
      desc: 'Log issues for community fixtures or grounds.',
      icon: Wrench,
      tab: 'portal',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Dues & Payments',
      desc: 'Review balance and pay monthly dues securely.',
      icon: DollarSign,
      tab: 'portal',
      color: 'from-amber-500 to-orange-600',
    }
  ];

  const rulesPreview = [
    { title: 'Pets Limits', value: 'Max 2 domestic pets, under 40 lbs.' },
    { title: 'Trash Collection', value: 'Mondays and Thursdays by 7:00 AM.' },
    { title: 'Quiet Hours', value: '10:00 PM to 8:00 AM daily.' },
    { title: 'Leasing Policy', value: 'Min 6-month leases, Airbnb strictly prohibited.' },
    { title: 'Clubhouse Hire', value: '$75 fee + $150 refundable deposit.' },
  ];

  return (
    <div className="space-y-12" id="home-view-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl" id="home-hero">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Hero Visual Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-indigo-950/90 to-slate-900/90" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 border border-amber-500/35 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Official Portal
            </span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                Waterford Place
              </span> Condominiums
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              A serene, well-maintained community of condominium homes. Our association is dedicated to preserving property values, maintaining pristine common elements, and promoting architectural harmony.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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

          {/* Quick Stats / Info Widget */}
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur p-6 space-y-6 shadow-xl shrink-0" id="hero-quick-status">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
              Community Dashboard
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800/80">
                <p className="text-xs text-slate-500 font-mono">Dues Status</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">$385.00</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Due Monthly on 1st</p>
              </div>
              <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800/80">
                <p className="text-xs text-slate-500 font-mono">Next Meeting</p>
                <p className="text-lg font-bold text-amber-400 mt-1">July 15</p>
                <p className="text-[10px] text-slate-500 mt-0.5">7:00 PM @ Clubhouse</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Property Manager:</span>
                <span className="font-semibold text-slate-200">Elite Mgmt CAM</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Leasing Occupancy:</span>
                <span className="font-semibold text-slate-200">Cap Active (85%)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Trash Pick-up Days:</span>
                <span className="font-semibold text-slate-200">Mon & Thu</span>
              </div>
            </div>
          </div>
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
                onClick={() => setActiveTab(item.tab)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
              >
                {/* Visual Accent */}
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

      {/* Two-Column split: Announcements & Quick Rules */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left 2 Columns: Announcements Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              Latest Announcements
            </h3>
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">
              Updated July 2026
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
                <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Key Rules Overview */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-blue-900" />
              Rules At-A-Glance
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3 rounded-xl bg-blue-50/50 p-3.5 border border-blue-100/50">
              <Info className="h-5 w-5 text-blue-900 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-normal">
                These points are selected summaries of our community bylaws. For formal matters, always refer to the complete printed governing books.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {rulesPreview.map((rule, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
                      {rule.title}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {rule.value}
                    </p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('documents')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span>View Full Documents Room</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
