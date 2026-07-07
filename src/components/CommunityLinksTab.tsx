import React, { useState } from 'react';
import { 
  Facebook, Mail, MapPin, ExternalLink, Globe, Landmark, 
  Sparkles, CheckCircle2, ShieldAlert, Edit2, Check 
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { motion, AnimatePresence } from 'motion/react';

export default function CommunityLinksTab() {
  const { siteMetadata, updateSiteMetadata, isEditMode, communityPhotos, updateCommunityPhoto } = useSiteData();
  const [emailInput, setEmailInput] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoEditUrl, setPhotoEditUrl] = useState('');
  const [photoEditTitle, setPhotoEditTitle] = useState('');

  // Inline edit state
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [activeEditField, setActiveEditField] = useState<string | null>(null);

  const handleStartFieldEdit = (fieldName: string, value: string) => {
    setEditFields(prev => ({ ...prev, [fieldName]: value }));
    setActiveEditField(fieldName);
  };

  const handleSaveFieldEdit = (fieldName: keyof typeof siteMetadata) => {
    updateSiteMetadata({ [fieldName]: editFields[fieldName] });
    setActiveEditField(null);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSignedUp(true);
    setTimeout(() => {
      setEmailInput('');
      setSignedUp(false);
    }, 5000);
  };

  const handleStartPhotoEdit = (id: string, url: string, title: string) => {
    setEditingPhotoId(id);
    setPhotoEditUrl(url);
    setPhotoEditTitle(title);
  };

  const handleSavePhotoEdit = (id: string) => {
    updateCommunityPhoto(id, photoEditUrl, photoEditTitle);
    setEditingPhotoId(null);
  };

  const localResources = [
    { name: 'City of Smyrna Official Website', url: 'https://www.smyrnaga.gov', desc: 'Local municipal resources, trash guidelines, property taxes, and city hall contacts.', icon: Landmark },
    { name: 'Smyrna Public Safety & Police', url: 'https://www.smyrnaga.gov/departments/police', desc: 'Non-emergency dispatch line and precinct locations near Waterford Place.', icon: ShieldAlert },
    { name: 'Cobb County Water System', url: 'https://www.cobbcounty.org/water', desc: 'Main billing and municipal water authority for Smyrna, GA.', icon: Globe },
    { name: 'Georgia Power Company', url: 'https://www.georgiapower.com', desc: 'Report power outages, check grid status, and manage electrical accounts.', icon: Sparkles },
  ];

  return (
    <div className="space-y-12" id="community-links-view-container">
      {/* Header section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Community Links & Connections
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Stay connected with Waterford Place neighbors, local Smyrna municipal bodies, and public utility organizations. Use these shortcuts to find social spaces and municipal resources.
        </p>
      </section>

      {/* Grid containing Connections (Facebook & Email) and Address card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Social & Notification Centers */}
        <div className="space-y-6">
          {/* Facebook Group link Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900 border border-blue-200">
                <Facebook className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Facebook Group</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Join our private, resident-only Facebook group to converse with neighbors, discuss lost pets, share recommendations, and support a tight neighborhood network.
              </p>
            </div>
            
            <div className="pt-4 space-y-3">
              {isEditMode && activeEditField === 'facebookText' ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editFields['facebookText'] || ''}
                    onChange={e => setEditFields({ ...editFields, facebookText: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                    placeholder="Link Label Text"
                  />
                  <input
                    type="text"
                    value={editFields['facebookUrl'] || ''}
                    onChange={e => setEditFields({ ...editFields, facebookUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                    placeholder="Group URL"
                  />
                  <button
                    onClick={() => {
                      updateSiteMetadata({
                        facebookText: editFields['facebookText'],
                        facebookUrl: editFields['facebookUrl']
                      });
                      setActiveEditField(null);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <Check className="h-3 w-3" />
                    Save Connection Link
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <a
                    href={siteMetadata.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-xs font-bold text-white hover:bg-blue-800 shadow-sm transition-all"
                  >
                    <span>{siteMetadata.facebookText}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {isEditMode && (
                    <button
                      onClick={() => {
                        handleStartFieldEdit('facebookText', siteMetadata.facebookText);
                        setEditFields(prev => ({ ...prev, facebookUrl: siteMetadata.facebookUrl }));
                      }}
                      className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
                      title="Edit Facebook details"
                    >
                      <Edit2 className="h-4 w-4 text-amber-500" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Email Sign-up Announcement Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Mail className="h-6 w-6" />
            </div>
            
            <div>
              {isEditMode && activeEditField === 'emailListTitle' ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editFields['emailListTitle'] || ''}
                    onChange={e => setEditFields({ ...editFields, emailListTitle: e.target.value })}
                    className="w-full font-serif font-bold text-slate-900 text-lg rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editFields['emailListText'] || ''}
                    onChange={e => setEditFields({ ...editFields, emailListText: e.target.value })}
                    className="w-full text-xs text-slate-500 rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      handleSaveFieldEdit('emailListTitle');
                      updateSiteMetadata({ emailListText: editFields['emailListText'] });
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <Check className="h-3 w-3" /> Save Text
                  </button>
                </div>
              ) : (
                <div className="relative group">
                  <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                    {siteMetadata.emailListTitle}
                    {isEditMode && (
                      <button
                        onClick={() => {
                          handleStartFieldEdit('emailListTitle', siteMetadata.emailListTitle);
                          setEditFields(prev => ({ ...prev, emailListText: siteMetadata.emailListText }));
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-50"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-amber-500" />
                      </button>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                    {siteMetadata.emailListText}
                  </p>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {signedUp ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl bg-emerald-50 text-emerald-800 p-4 border border-emerald-100 flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold">Thank you for joining our community broadcast distribution list!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2 pt-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="your-email@example.com"
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 shadow transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Address & Geography Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-950 border border-indigo-200">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg">Location & Address</h3>
            
            {isEditMode && activeEditField === 'address' ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editFields['address'] || ''}
                  onChange={e => setEditFields({ ...editFields, address: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                />
                <button
                  onClick={() => handleSaveFieldEdit('address')}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Check className="h-3 w-3" /> Save Address
                </button>
              </div>
            ) : (
              <div className="relative group">
                <p className="text-xl font-bold text-slate-800 font-serif leading-relaxed">
                  {siteMetadata.address}
                </p>
                {isEditMode && (
                  <button
                    onClick={() => handleStartFieldEdit('address', siteMetadata.address)}
                    className="absolute -top-1 -right-2 p-1.5 rounded hover:bg-slate-50"
                  >
                    <Edit2 className="h-4 w-4 text-amber-500" />
                  </button>
                )}
              </div>
            )}
            
            <p className="text-xs text-slate-500 leading-normal">
              Waterford Place is situated beautifully in the heart of Smyrna, GA, offering residential convenience, local landscaping perimeter hedges, and direct connectivity to Killarney SE roads.
            </p>
          </div>

          {/* Simple Mock Map display block */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative min-h-[160px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] bg-slate-50" />
            <div className="relative text-center z-10 px-4 space-y-1">
              <div className="h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto shadow animate-bounce">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <p className="text-[11px] font-bold text-slate-800 font-serif">{siteMetadata.name}</p>
              <p className="text-[10px] text-slate-500 font-mono">{siteMetadata.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Local Resources Section */}
      <section className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-slate-900 border-b border-slate-150 pb-3">
          Local Municipal & Public Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localResources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div key={idx} className="rounded-xl border border-slate-150 bg-white p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex gap-4 items-start">
                <div className="rounded-lg bg-slate-50 p-2.5 text-slate-700 border border-slate-100 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-950 text-sm leading-tight truncate">{res.name}</h4>
                    <a href={res.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-900">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{res.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Image Gallery (6 Photos) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-150 pb-3">
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Our Community Gallery
          </h3>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
            {isEditMode ? 'Click pencil to replace image' : 'Waterford Place Scenes'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityPhotos.map((photo) => (
            <div key={photo.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              
              {editingPhotoId === photo.id ? (
                <div className="p-4 space-y-3 bg-slate-50 border-b border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Image Title</label>
                    <input
                      type="text"
                      value={photoEditTitle}
                      onChange={e => setPhotoEditTitle(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Image URL</label>
                    <input
                      type="text"
                      value={photoEditUrl}
                      onChange={e => setPhotoEditUrl(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSavePhotoEdit(photo.id)}
                      className="rounded bg-emerald-600 text-white px-2.5 py-1 text-[10px] font-bold hover:bg-emerald-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPhotoId(null)}
                      className="rounded bg-slate-200 text-slate-700 px-2.5 py-1 text-[10px] font-bold hover:bg-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isEditMode && (
                    <button
                      onClick={() => handleStartPhotoEdit(photo.id, photo.url, photo.title)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm text-amber-500 hover:text-amber-600 flex items-center justify-center transition-all hover:scale-110"
                      title="Edit Image Source"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}
              
              <div className="p-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">HOA Photo Asset</span>
                <h4 className="font-serif font-bold text-slate-900 text-sm mt-1">{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
