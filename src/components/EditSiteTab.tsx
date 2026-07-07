import React, { useState } from 'react';
import { 
  Settings, Shield, Plus, Edit2, Trash2, Check, RefreshCw, 
  Sparkles, FileText, Calendar, Users, HelpCircle, LayoutGrid, Info 
} from 'lucide-react';
import { useSiteData, SiteMetadata } from '../context/SiteDataContext';
import { Announcement, BoardMember, DocumentItem, CalendarEvent, FaqItem } from '../types';

export default function EditSiteTab() {
  const {
    siteMetadata, updateSiteMetadata,
    announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    boardMembers, addBoardMember, updateBoardMember, deleteBoardMember,
    documents, addDocument, updateDocument, deleteDocument,
    events, addEvent, updateEvent, deleteEvent,
    faqs, addFaq, updateFaq, deleteFaq,
    isEditMode, setIsEditMode,
    resetAllToDefault
  } = useSiteData();

  const [activeSubSection, setActiveSubSection] = useState<'metadata' | 'announcements' | 'board' | 'events' | 'documents' | 'faqs'>('metadata');

  // Metadata Forms states
  const [metaForm, setMetaForm] = useState<SiteMetadata>({ ...siteMetadata });
  
  // Announcement Form states
  const [newAnn, setNewAnn] = useState({ title: '', date: '2026-07-07', category: 'General' as Announcement['category'], content: '', author: 'Board of Directors' });
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);

  // Board Member Form states
  const [newBM, setNewBM] = useState({ name: '', role: '', description: '', email: '', termEnds: 'November 2027' });
  const [editingBMId, setEditingBMId] = useState<string | null>(null);

  // Document Form states
  const [newDoc, setNewDoc] = useState({ title: '', category: 'governing' as DocumentItem['category'], code: 'SEC-1.0', fileType: 'PDF' as DocumentItem['fileType'], fileSize: '1.2 MB', description: '', lastUpdated: 'July 2026' });
  const [editingDocId, setEditingDocId] = useState<string | null>(null);

  // Event Form states
  const [newEvt, setNewEvt] = useState({ title: '', date: '2026-07-15', time: '7:00 PM', location: 'Clubhouse', category: 'meeting' as CalendarEvent['category'], description: '' });
  const [editingEvtId, setEditingEvtId] = useState<string | null>(null);

  // FAQ Form states
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'rules' as FaqItem['category'] });
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteMetadata(metaForm);
    alert('General Site Settings updated successfully!');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;
    addAnnouncement(newAnn);
    setNewAnn({ title: '', date: '2026-07-07', category: 'General', content: '', author: 'Board of Directors' });
    alert('Announcement published successfully!');
  };

  const handleAddBoardMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBM.name || !newBM.role) return;
    addBoardMember(newBM);
    setNewBM({ name: '', role: '', description: '', email: '', termEnds: 'November 2027' });
    alert('Board Member added!');
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.description) return;
    addDocument(newDoc);
    setNewDoc({ title: '', category: 'governing', code: 'SEC-1.0', fileType: 'PDF', fileSize: '1.2 MB', description: '', lastUpdated: 'July 2026' });
    alert('Document category logged!');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvt.title || !newEvt.date) return;
    addEvent(newEvt);
    setNewEvt({ title: '', date: '2026-07-15', time: '7:00 PM', location: 'Clubhouse', category: 'meeting', description: '' });
    alert('Community Event created!');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    addFaq(newFaq);
    setNewFaq({ question: '', answer: '', category: 'rules' });
    alert('FAQ published!');
  };

  return (
    <div className="space-y-10" id="edit-site-view-container">
      {/* Header section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Edit Site & Administration
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Welcome to the Waterford Place Administration Portal. Toggle edit controls, publish new board announcements, schedule monthly meetings, or update document logs directly in your browser.
        </p>
      </section>

      {/* Global Toggle & Reset controls */}
      <div className="rounded-2xl border border-blue-250 bg-blue-50/10 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-900" />
            <h3 className="font-semibold text-slate-900 text-base">Global Edit Mode Control</h3>
          </div>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            When active, pencil icons (<span className="text-amber-500 font-bold font-mono">✎</span>) will appear directly next to title text blocks, FAQs, events, and cards across all tabs. You can click them to edit content in-place instantly!
          </p>
        </div>

        <div className="flex flex-wrap gap-4 shrink-0">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`rounded-xl px-5 py-3 text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
              isEditMode 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{isEditMode ? 'Edit Mode: ACTIVE' : 'Enable In-Place Editing'}</span>
          </button>

          <button
            onClick={resetAllToDefault}
            className="rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-3 text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset All Changes</span>
          </button>
        </div>
      </div>

      {/* Inline edit helper advice */}
      {isEditMode && (
        <div className="rounded-xl bg-amber-50 text-amber-900 p-4 border border-amber-200 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 leading-normal">
            <span className="font-bold">In-Place Editing is Active!</span>
            <p>You can now navigate to any of the site tabs (like Home, Board, Documents, or Community Links) and click any yellow pencil icons to modify that specific content in real-time. Changes save locally immediately.</p>
          </div>
        </div>
      )}

      {/* Main Administrative Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Navigation pane */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">
            Section Selector
          </h4>
          
          {[
            { id: 'metadata', label: 'General Site Text', icon: Settings },
            { id: 'announcements', label: 'News Announcements', icon: LayoutGrid },
            { id: 'board', label: 'Board & Committees', icon: Users },
            { id: 'events', label: 'Upcoming Events', icon: Calendar },
            { id: 'documents', label: 'Documents Room', icon: FileText },
            { id: 'faqs', label: 'FAQ Directory', icon: HelpCircle },
          ].map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSubSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSubSection(sec.id as any)}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-left transition-all ${
                  isSelected 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Section Form */}
        <div className="lg:col-span-9 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          
          {/* Section 1: General Metadata */}
          {activeSubSection === 'metadata' && (
            <form onSubmit={handleSaveMetadata} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">General Site Typography & Settings</h3>
                <p className="text-xs text-slate-500 mt-1">Modify branding slogans, location details, and welcome greetings here.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Branding Name</label>
                  <input
                    type="text"
                    value={metaForm.name}
                    onChange={e => setMetaForm({ ...metaForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Branding Slogan</label>
                  <input
                    type="text"
                    value={metaForm.subtitle}
                    onChange={e => setMetaForm({ ...metaForm, subtitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Hero Title Banner</label>
                  <input
                    type="text"
                    value={metaForm.heroTitle}
                    onChange={e => setMetaForm({ ...metaForm, heroTitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Hero Subtitle</label>
                  <input
                    type="text"
                    value={metaForm.heroSubtitle}
                    onChange={e => setMetaForm({ ...metaForm, heroSubtitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Welcome Portal Heading</label>
                <input
                  type="text"
                  value={metaForm.welcomeTitle}
                  onChange={e => setMetaForm({ ...metaForm, welcomeTitle: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Welcome Body Text</label>
                <textarea
                  rows={4}
                  value={metaForm.welcomeText}
                  onChange={e => setMetaForm({ ...metaForm, welcomeText: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Community Address</label>
                  <input
                    type="text"
                    value={metaForm.address}
                    onChange={e => setMetaForm({ ...metaForm, address: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Facebook Private Group URL</label>
                  <input
                    type="text"
                    value={metaForm.facebookUrl}
                    onChange={e => setMetaForm({ ...metaForm, facebookUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-5 py-3 shadow transition-colors"
              >
                Save General Site Text
              </button>
            </form>
          )}

          {/* Section 2: News / Announcements */}
          {activeSubSection === 'announcements' && (
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Manage Community Announcements</h3>
                <p className="text-xs text-slate-500 mt-1">Publish news bulletins, construction logs, or pool alerts.</p>
              </div>

              {/* Publish New Form */}
              <form onSubmit={handleAddAnnouncement} className="rounded-xl border border-slate-150 p-4 bg-slate-50/50 space-y-4">
                <h4 className="font-serif font-bold text-slate-850 text-sm">Add New Bulletin Announcement</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Title</label>
                    <input
                      type="text"
                      required
                      value={newAnn.title}
                      onChange={e => setNewAnn({ ...newAnn, title: e.target.value })}
                      placeholder="e.g. Balcony Painting Starting"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Author</label>
                    <input
                      type="text"
                      required
                      value={newAnn.author}
                      onChange={e => setNewAnn({ ...newAnn, author: e.target.value })}
                      placeholder="Board & Committees"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Date</label>
                    <input
                      type="date"
                      required
                      value={newAnn.date}
                      onChange={e => setNewAnn({ ...newAnn, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Category Tag</label>
                    <select
                      value={newAnn.category}
                      onChange={e => setNewAnn({ ...newAnn, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <option value="Important">Important / Alert</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Social">Social</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Announcement Body Content</label>
                  <textarea
                    rows={3}
                    required
                    value={newAnn.content}
                    onChange={e => setNewAnn({ ...newAnn, content: e.target.value })}
                    placeholder="Write detailed bulletin content here..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Publish Announcement</span>
                </button>
              </form>

              {/* Feed List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-800 text-sm">Active Feed Bulletins ({announcements.length})</h4>
                <div className="space-y-2">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="rounded-xl border border-slate-150 p-4 bg-white flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 rounded">{ann.category}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{ann.date}</span>
                        </div>
                        <h5 className="font-semibold text-slate-900 text-sm">{ann.title}</h5>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-1">{ann.content}</p>
                      </div>
                      <button
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 shrink-0"
                        title="Delete announcement"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Board Members */}
          {activeSubSection === 'board' && (
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Manage Board Members</h3>
                <p className="text-xs text-slate-500 mt-1">Add, update positions, or remove members of the Board of Directors.</p>
              </div>

              {/* Add Board Member form */}
              <form onSubmit={handleAddBoardMember} className="rounded-xl border border-slate-150 p-4 bg-slate-50/50 space-y-4">
                <h4 className="font-serif font-bold text-slate-850 text-sm">Add Board Member</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newBM.name}
                      onChange={e => setNewBM({ ...newBM, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">HOA Role</label>
                    <input
                      type="text"
                      required
                      value={newBM.role}
                      onChange={e => setNewBM({ ...newBM, role: e.target.value })}
                      placeholder="e.g. President, Treasurer"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={newBM.email}
                      onChange={e => setNewBM({ ...newBM, email: e.target.value })}
                      placeholder="e.g. board@waterfordplacehoa.org"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Term Expiry</label>
                    <input
                      type="text"
                      required
                      value={newBM.termEnds}
                      onChange={e => setNewBM({ ...newBM, termEnds: e.target.value })}
                      placeholder="November 2027"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Short Bio / Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newBM.description}
                    onChange={e => setNewBM({ ...newBM, description: e.target.value })}
                    placeholder="Resident since 2020. Dedicated to financial health..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Board Member</span>
                </button>
              </form>

              {/* Members List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-800 text-sm">Active Board of Directors ({boardMembers.length})</h4>
                <div className="space-y-2">
                  {boardMembers.map((member) => (
                    <div key={member.id} className="rounded-xl border border-slate-150 p-4 bg-white flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-slate-900 text-sm">{member.name}</h5>
                          <span className="text-[10px] font-mono bg-blue-50 text-blue-900 font-bold px-1.5 rounded">{member.role}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-1">{member.description}</p>
                        <p className="text-[10px] font-mono text-slate-400">Term ends: {member.termEnds} | {member.email}</p>
                      </div>
                      <button
                        onClick={() => deleteBoardMember(member.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 shrink-0"
                        title="Delete member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Upcoming Events */}
          {activeSubSection === 'events' && (
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Manage Community Events</h3>
                <p className="text-xs text-slate-500 mt-1">Add, reschedule, or remove events displayed on the calendar or home feed.</p>
              </div>

              {/* Add Event Form */}
              <form onSubmit={handleAddEvent} className="rounded-xl border border-slate-150 p-4 bg-slate-50/50 space-y-4">
                <h4 className="font-serif font-bold text-slate-850 text-sm">Schedule New Event</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Event Title</label>
                    <input
                      type="text"
                      required
                      value={newEvt.title}
                      onChange={e => setNewEvt({ ...newEvt, title: e.target.value })}
                      placeholder="e.g. Community Cleanup Day"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Location</label>
                    <input
                      type="text"
                      required
                      value={newEvt.location}
                      onChange={e => setNewEvt({ ...newEvt, location: e.target.value })}
                      placeholder="Common Area Entrance"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      required
                      value={newEvt.date}
                      onChange={e => setNewEvt({ ...newEvt, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Time</label>
                    <input
                      type="text"
                      required
                      value={newEvt.time}
                      onChange={e => setNewEvt({ ...newEvt, time: e.target.value })}
                      placeholder="9:00 AM"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Category</label>
                    <select
                      value={newEvt.category}
                      onChange={e => setNewEvt({ ...newEvt, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <option value="meeting">Board Meeting</option>
                      <option value="social">Social Gathering</option>
                      <option value="trash">Trash / Waste Schedule</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="holiday">Holiday Office Closing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newEvt.description}
                    onChange={e => setNewEvt({ ...newEvt, description: e.target.value })}
                    placeholder="Provide details on attendance, Zoom info, or prerequisites..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Event</span>
                </button>
              </form>

              {/* Events List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-800 text-sm">Scheduled HOA Events ({events.length})</h4>
                <div className="space-y-2">
                  {events.map((evt) => (
                    <div key={evt.id} className="rounded-xl border border-slate-150 p-4 bg-white flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-slate-900 text-sm">{evt.title}</h5>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 rounded uppercase">{evt.category}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-1">{evt.description}</p>
                        <p className="text-[10px] font-mono text-slate-400">Date: {evt.date} | Time: {evt.time} | Location: {evt.location}</p>
                      </div>
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 shrink-0"
                        title="Delete event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Documents Room */}
          {activeSubSection === 'documents' && (
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Manage Governing Documents</h3>
                <p className="text-xs text-slate-500 mt-1">Log governing rules, printed covenants, financial logs, or forms.</p>
              </div>

              {/* Add Doc Form */}
              <form onSubmit={handleAddDocument} className="rounded-xl border border-slate-150 p-4 bg-slate-50/50 space-y-4">
                <h4 className="font-serif font-bold text-slate-850 text-sm">Log New Document Card</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Document Title</label>
                    <input
                      type="text"
                      required
                      value={newDoc.title}
                      onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                      placeholder="e.g. Q2 2026 Financial Balances"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Section Code</label>
                    <input
                      type="text"
                      required
                      value={newDoc.code}
                      onChange={e => setNewDoc({ ...newDoc, code: e.target.value })}
                      placeholder="e.g. REG-4.2 or FIN-2026"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Category Category</label>
                    <select
                      value={newDoc.category}
                      onChange={e => setNewDoc({ ...newDoc, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <option value="governing">Governing & Covenants</option>
                      <option value="rules">Rules & Bylaws</option>
                      <option value="minutes">Board Meeting Minutes</option>
                      <option value="forms">Resident Packages & Forms</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">File Type</label>
                    <select
                      value={newDoc.fileType}
                      onChange={e => setNewDoc({ ...newDoc, fileType: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="DOCX">Word DOCX</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">File Size Estimate</label>
                    <input
                      type="text"
                      required
                      value={newDoc.fileSize}
                      onChange={e => setNewDoc({ ...newDoc, fileSize: e.target.value })}
                      placeholder="1.2 MB"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newDoc.description}
                    onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                    placeholder="Describe content, updates, or policies inside..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Log Document</span>
                </button>
              </form>

              {/* Documents List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-800 text-sm">Active Logged Files ({documents.length})</h4>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="rounded-xl border border-slate-150 p-4 bg-white flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-slate-900 text-sm">{doc.title}</h5>
                          <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1 rounded">{doc.code}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-1">{doc.description}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Category: {doc.category} | Format: {doc.fileType} | Size: {doc.fileSize}</p>
                      </div>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 shrink-0"
                        title="Delete file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 6: FAQs */}
          {activeSubSection === 'faqs' && (
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Manage Frequently Asked Questions</h3>
                <p className="text-xs text-slate-500 mt-1">Add, rewrite, or remove questions in the directory.</p>
              </div>

              {/* Add FAQ Form */}
              <form onSubmit={handleAddFaq} className="rounded-xl border border-slate-150 p-4 bg-slate-50/50 space-y-4">
                <h4 className="font-serif font-bold text-slate-850 text-sm">Publish FAQ Item</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400">FAQ Category</label>
                    <select
                      value={newFaq.category}
                      onChange={e => setNewFaq({ ...newFaq, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                    >
                      <option value="dues">HOA Dues & Finance</option>
                      <option value="parking">Parking Policies</option>
                      <option value="pets">Pets Regulations</option>
                      <option value="trash">Trash & Recycling</option>
                      <option value="amenities">Clubhouse & Amenities</option>
                      <option value="rules">Bylaws & Covenants</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Question Text</label>
                  <input
                    type="text"
                    required
                    value={newFaq.question}
                    onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                    placeholder="e.g. What is the trash pick-up day?"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400">Answer Explanation</label>
                  <textarea
                    rows={3}
                    required
                    value={newFaq.answer}
                    onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                    placeholder="Explain clearly including Section numbers where applicable..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 text-white font-bold text-xs px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Publish FAQ</span>
                </button>
              </form>

              {/* FAQs List */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-800 text-sm">Active FAQ Items ({faqs.length})</h4>
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="rounded-xl border border-slate-150 p-4 bg-white flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 rounded uppercase">{faq.category}</span>
                        </div>
                        <h5 className="font-semibold text-slate-900 text-xs sm:text-sm">{faq.question}</h5>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-2">{faq.answer}</p>
                      </div>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 shrink-0"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
