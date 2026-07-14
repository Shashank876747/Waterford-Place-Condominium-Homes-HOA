import React from 'react';
import { Shield, Mail, Phone, Clock, FileText, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { siteMetadata } = useSiteData();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800" id="footer-container">
      {/* Upper area */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-800 text-amber-400 shadow">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight">{siteMetadata.name}</span>
                <p className="text-[10px] font-mono tracking-widest uppercase text-slate-500">{siteMetadata.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Official communication portal for the co-owners and residents of {siteMetadata.name}. Governing with transparency and care.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Community Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Community Covenants', tab: 'documents' },
                { name: 'Board of Directors', tab: 'board' },
                { name: 'Calendar of Events', tab: 'calendar' },
                { name: 'Frequently Asked Questions', tab: 'faq' },
                { name: 'Community Links', tab: 'community-links' },
                { name: 'Resident Service Portal', tab: 'portal' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveTab(link.tab)}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Governing Docs shortcuts */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Key Documents
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="flex items-center hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2 text-amber-500/80" />
                  <span>Master Declarations (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="flex items-center hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2 text-amber-500/80" />
                  <span>Rules & Regulations Handbook</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="flex items-center hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2 text-amber-500/80" />
                  <span>Exterior Alteration Request Form</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="flex items-center hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2 text-amber-500/80" />
                  <span>Clubhouse Rental Form</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Management Quick contact */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              {siteMetadata.managementName}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs">
                  {siteMetadata.managementHours}
                </span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs">
                  {siteMetadata.managementPhone}
                </span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs break-all">
                  {siteMetadata.managementEmail}
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-700 hover:text-amber-400 cursor-pointer"
                >
                  <span>Request Assistance</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            &copy; {currentYear} {siteMetadata.name} Condominium Association, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <a href="#" className="hover:text-slate-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
