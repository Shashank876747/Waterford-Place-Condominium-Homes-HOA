import React from 'react';
import { 
  Award, Mail, CalendarClock, FileSpreadsheet, User
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface BoardTabProps {
  setActiveTab: (tab: string) => void;
  setSelectedContact: (email: string) => void;
}

export default function BoardTab({ setActiveTab, setSelectedContact }: BoardTabProps) {
  const { siteMetadata, boardMembers, committees } = useSiteData();

  const handleContactMember = (email: string) => {
    setSelectedContact(email);
    setActiveTab('contact');
  };

  return (
    <div className="space-y-12" id="board-view-container">
      {/* Introduction Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#3e3223] sm:text-4xl bg-[#f5efe6] inline-block px-6 py-2 rounded-2xl border border-[#e5dac4] shadow-sm">
          Board & Committees
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          {siteMetadata.name} is governed by a volunteer Board of Directors comprised of resident co-owners. The board is elected annually and serves staggered multi-year terms to oversee community finances and guidelines.
        </p>
      </section>

      {/* Board Members Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Award className="h-5.5 w-5.5 text-blue-900" />
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Current Board of Directors
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="board-members-grid">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-lg leading-snug">{member.name}</h4>
                    <span className="inline-block mt-1 rounded-full bg-blue-50 border border-blue-100 text-blue-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400">
                    <User className="h-5 w-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{member.description}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-y-2 items-center justify-between text-[11px] font-semibold text-slate-500">
                <div className="flex items-center space-x-1 font-mono">
                  <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Term ends: {member.termEnds}</span>
                </div>

                {member.email && (
                  <button
                    onClick={() => handleContactMember(member.email)}
                    className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-800 cursor-pointer"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Contact</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {boardMembers.length === 0 && (
            <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
              <p className="text-sm text-slate-500">No active board members logged. Create some in the Edit Site dashboard!</p>
            </div>
          )}
        </div>
      </section>

      {/* Committees Section */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5.5 w-5.5 text-blue-900" />
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Advisory Committees
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="committees-grid">
          {committees.map((comm) => (
            <div
              key={comm.id}
              className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-base">{comm.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {comm.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] font-mono">Committee Chair:</span>
                  <span className="font-semibold text-slate-800">{comm.chair}</span>
                </div>
                {comm.members && comm.members.length > 0 && (
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] font-mono mt-0.5">Volunteers:</span>
                    <span className="font-medium text-slate-600 text-right max-w-[200px]">
                      {comm.members.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {committees.length === 0 && (
            <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
              <p className="text-sm text-slate-500">No active advisory committees created. Register committees in the Edit Site dashboard!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
