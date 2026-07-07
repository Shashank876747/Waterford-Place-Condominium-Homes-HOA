import React, { useState, useEffect } from 'react';
import { 
  Shield, Bell, X, Info, Megaphone, Calendar, 
  ExternalLink, PhoneCall, MailOpen, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom components
import Header from './components/Header';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import DocumentsTab from './components/DocumentsTab';
import BoardTab from './components/BoardTab';
import CalendarTab from './components/CalendarTab';
import FaqTab from './components/FaqTab';
import PortalTab from './components/PortalTab';
import ContactTab from './components/ContactTab';
import CommunityLinksTab from './components/CommunityLinksTab';
import EditSiteTab from './components/EditSiteTab';
import { useSiteData } from './context/SiteDataContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotification, setShowNotification] = useState(true);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  
  const { announcements } = useSiteData();

  // Scroll to top on tab change for standard SPA feeling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSetSelectedContact = (email: string) => {
    setPrefilledEmail(email);
  };

  // Get the most recent Important or Maintenance announcement for the alert banner
  const alertAnnouncement = announcements.find(a => a.category === 'Important') || announcements[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-slate-900" id="app-root-container">
      {/* Top Banner alert */}
      <AnimatePresence>
        {showNotification && alertAnnouncement && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-blue-950 to-slate-900 border-b border-blue-900 text-white overflow-hidden relative z-50"
            id="top-alert-banner"
          >
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/35">
                  <Megaphone className="h-4.5 w-4.5" />
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed truncate">
                  <span className="font-bold text-amber-400 font-mono tracking-wider uppercase bg-amber-400/10 border border-amber-400/20 rounded px-1.5 py-0.5 text-[10px] mr-2">
                    {alertAnnouncement.category}
                  </span>
                  {alertAnnouncement.title}: {alertAnnouncement.content}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setActiveTab('home');
                  }}
                  className="hidden sm:inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Read News</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </button>
                <button
                  onClick={() => setShowNotification(false)}
                  className="rounded-lg p-1 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Dismiss notification"
                  id="dismiss-banner-btn"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header Brand */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Page Layout Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="outline-none"
          >
            {activeTab === 'home' && (
              <HomeTab setActiveTab={setActiveTab} />
            )}
            {activeTab === 'documents' && (
              <DocumentsTab />
            )}
            {activeTab === 'board' && (
              <BoardTab 
                setActiveTab={setActiveTab} 
                setSelectedContact={handleSetSelectedContact} 
              />
            )}
            {activeTab === 'calendar' && (
              <CalendarTab />
            )}
            {activeTab === 'faq' && (
              <FaqTab />
            )}
            {activeTab === 'portal' && (
              <PortalTab />
            )}
            {activeTab === 'contact' && (
              <ContactTab prefilledEmail={prefilledEmail} />
            )}
            {activeTab === 'community-links' && (
              <CommunityLinksTab />
            )}
            {activeTab === 'edit-site' && (
              <EditSiteTab />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Site Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
