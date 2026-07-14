import React, { useState } from 'react';
import { 
  Facebook, Mail, MapPin, ExternalLink, Globe, Landmark, 
  Sparkles, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const categoryIcons = {
  municipal: Landmark,
  safety: ShieldAlert,
  utility: Sparkles,
  general: Globe,
};

const categoryLabels = {
  municipal: 'Municipal & Smyrna Public Services',
  safety: 'Local Safety & Emergencies',
  utility: 'Utility Companies & Services',
  general: 'General Resources & Links',
};

export default function CommunityLinksTab() {
  const { 
    siteMetadata, 
    communityPhotos, 
    communityLinks
  } = useSiteData();

  const [emailInput, setEmailInput] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSignedUp(true);
    setTimeout(() => {
      setEmailInput('');
      setSignedUp(false);
    }, 5000);
  };

  // Group links by category
  const categories: ('municipal' | 'safety' | 'utility' | 'general')[] = ['safety', 'municipal', 'utility', 'general'];

  return (
    <div className="space-y-12" id="community-links-view-container">
      {/* Header section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#3e3223] sm:text-4xl bg-[#f5efe6] inline-block px-6 py-2 rounded-2xl border border-[#e5dac4] shadow-sm">
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
            
            <div className="pt-4">
              <a
                href={siteMetadata.facebookUrl || "https://facebook.com/groups/waterfordplace"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white px-5 py-3 text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>{siteMetadata.facebookText || "Go to Waterford Place Facebook Group"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Email Subscription Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-950 border border-blue-200">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                {siteMetadata.emailListTitle || "Association Mailing List"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Subscribe to our electronic newsletter to receive notices, board agendas, emergency water main repairs, and upcoming pool events.
              </p>
            </div>

            <div className="pt-4">
              {signedUp ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-emerald-800 text-xs sm:text-sm font-semibold animate-pulse">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Subscribed! You will now receive news updates at this address.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-900/40 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 shadow transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Contact & Location details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-slate-800 border border-blue-200">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg">Association Location</h3>
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Waterford Place is located off Spring Road and Cumberland Boulevard in beautiful Smyrna, Georgia. 
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Physical Community Address</div>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {siteMetadata.address || "Waterford Place, Smyrna, GA 30080"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 space-y-1 text-xs">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">HOA Property Management Agent</div>
              <div className="font-bold text-slate-800 mt-1">Elite Property Management Services, Inc.</div>
              <div className="text-slate-600 font-medium">Attn: Jennifer Sterling, Association Manager</div>
              <div className="text-slate-600 font-mono text-[11px] mt-1">Phone: (770) 555-0182</div>
              <div className="text-slate-600 font-mono text-[11px]">Email: jsterling@elitemanagement.com</div>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteMetadata.address || "Waterford Place, Smyrna, GA 30080")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span>View Community Map</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Categorized Community Links */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900">
          Smyrna, GA & Utility Directory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const categoryLinks = communityLinks.filter((link) => link.category === cat);
            if (categoryLinks.length === 0) return null;

            const Icon = categoryIcons[cat];

            return (
              <div
                key={cat}
                className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-900 border border-blue-100/50">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-800 text-base">
                    {categoryLabels[cat]}
                  </h4>
                </div>

                <ul className="space-y-3.5">
                  {categoryLinks.map((link) => (
                    <li key={link.id} className="group/item">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-4 rounded-xl p-3 hover:bg-slate-50 border border-transparent hover:border-slate-150 transition-all cursor-pointer"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="font-bold text-slate-800 text-sm group-hover/item:text-blue-900 transition-colors flex items-center gap-1.5">
                            {link.name}
                          </span>
                          <p className="text-xs text-slate-500 leading-normal">
                            {link.desc}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-300 group-hover/item:text-blue-900 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Gallery Section */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900">
            Waterford Place Scenes
          </h3>
          <p className="text-xs text-slate-500 leading-normal mt-1">
            Enjoy standard landscapes and shared spaces from around our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="community-photos-grid">
          {communityPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-150 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-white">
                <h4 className="font-serif font-bold text-slate-800 text-sm truncate">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}

          {communityPhotos.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No photos loaded. Add neighborhood photos in the Edit Site dashboard!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
