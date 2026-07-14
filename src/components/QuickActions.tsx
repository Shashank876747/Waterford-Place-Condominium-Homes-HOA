import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, X, Wrench, DollarSign, PenTool, FileText, Calendar, ChevronRight, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickActionsProps {
  onNavigate: (tab: string, subTab?: 'dues' | 'maintenance' | 'arc') => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (tab: string, subTab?: 'dues' | 'maintenance' | 'arc') => {
    onNavigate(tab, subTab);
    setIsOpen(false);
  };

  const actionItems = [
    {
      label: 'Submit Maintenance Request',
      description: 'Report plumbing, lighting, or grounds issues.',
      icon: Wrench,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      hoverColor: 'hover:bg-emerald-50/50',
      action: () => handleAction('portal', 'maintenance'),
    },
    {
      label: 'Pay Monthly Dues',
      description: 'Review statement and pay assessments.',
      icon: DollarSign,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      hoverColor: 'hover:bg-amber-50/50',
      action: () => handleAction('portal', 'dues'),
    },
    {
      label: 'Submit Exterior Alteration',
      description: 'Apply for windows, door, or patio changes.',
      icon: PenTool,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      hoverColor: 'hover:bg-purple-50/50',
      action: () => handleAction('portal', 'arc'),
    },
    {
      label: 'HOA Governing Docs',
      description: 'View declarations, rules, and minutes.',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      hoverColor: 'hover:bg-blue-50/50',
      action: () => handleAction('documents'),
    },
    {
      label: 'Community Calendar',
      description: 'Check meeting schedules and social events.',
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      hoverColor: 'hover:bg-indigo-50/50',
      action: () => handleAction('calendar'),
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={menuRef} id="quick-actions-floating-container">
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md"
            id="quick-actions-dropdown-panel"
          >
            {/* Header */}
            <div className="bg-slate-900 px-4 py-3.5 text-white">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                Resident Services
              </span>
              <h3 className="font-serif text-sm font-bold">
                HOA Quick Command Menu
              </h3>
            </div>

            {/* Actions List */}
            <div className="divide-y divide-slate-100 p-2 max-h-[380px] overflow-y-auto">
              {actionItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={item.action}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-150 text-left cursor-pointer group ${item.hoverColor}`}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${item.color}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 self-center group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Footer Support Info */}
            <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                Need general support?
              </span>
              <button
                onClick={() => handleAction('contact')}
                className="text-[10px] font-bold text-blue-900 hover:underline cursor-pointer"
              >
                Contact Board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`flex h-14 items-center justify-center rounded-full shadow-2xl transition-all border cursor-pointer z-50 ${
          isOpen 
            ? 'w-14 bg-slate-900 text-white border-slate-950' 
            : 'px-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white border-blue-950/25 hover:from-blue-800 hover:to-indigo-900'
        }`}
        title={isOpen ? 'Close Quick Actions' : 'Open Quick Actions Menu'}
        id="quick-actions-floating-trigger"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="zap-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 font-semibold text-sm tracking-wide"
            >
              <Zap className="h-5 w-5 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Quick Actions</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
