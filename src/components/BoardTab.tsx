import React from 'react';
import { 
  User, ShieldAlert, Award, CalendarClock, Mail, 
  Building2, PhoneCall, FileSpreadsheet, Hourglass, HelpCircle 
} from 'lucide-react';
import { boardMembers, committees, managementCompany } from '../data/boardData';

interface BoardTabProps {
  setActiveTab: (tab: string) => void;
  setSelectedContact: (email: string) => void;
}

export default function BoardTab({ setActiveTab, setSelectedContact }: BoardTabProps) {
  const handleContactMember = (email: string) => {
    setSelectedContact(email);
    setActiveTab('contact');
  };

  return (
    <div className="space-y-12" id="board-view-container">
      {/* Introduction Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Board of Directors & Committees
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Waterford Place is governed by a volunteer Board of Directors comprised of resident co-owners. The board is elected annually and serves staggered multi-year terms to oversee community finances and guidelines.
        </p>
      </section>

      {/* Board Members Grid */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <Award className="h-5.5 w-5.5 text-blue-900" />
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Current Board of Directors
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="board-members-grid">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Visual Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-950 border border-blue-100">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base leading-tight">
                      {member.name}
                    </h4>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mt-1 block">
                      {member.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {member.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-medium flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1 text-slate-300" />
                  Ends: {member.termEnds}
                </span>

                <button
                  onClick={() => handleContactMember(member.email)}
                  className="rounded-lg bg-slate-50 hover:bg-slate-100 px-3 py-1.5 font-bold text-blue-900 border border-slate-200/50 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Committees Section */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <FileSpreadsheet className="h-5.5 w-5.5 text-blue-900" />
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Advisory Committees
          </h3>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl">
          Committees are appointed by the Board of Directors to focus on specific community programs and operations. They advise the board and coordinate vital neighborhood actions.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" id="committees-list">
          {committees.map((com) => (
            <div
              key={com.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
            >
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  {com.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  {com.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono uppercase font-bold tracking-wider">Chairperson:</span>
                  <span className="font-semibold text-slate-800">{com.chair}</span>
                </div>
                <div className="flex flex-col text-xs pt-1">
                  <span className="text-slate-400 font-mono uppercase font-bold tracking-wider mb-1">Members:</span>
                  <div className="flex flex-wrap gap-1">
                    {com.members.map((m, idx) => (
                      <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 rounded-md px-2 py-0.5 text-[10px] font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Management Partnership */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center" id="property-management-box">
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-amber-400 shadow">
            <Building2 className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">Professional Property Management</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              {managementCompany.name}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            Our association partners with Elite Property Management Services to oversee daily maintenance operations, process association fees, manage financial books, and handle official vendor contracting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="space-y-1">
              <span className="text-slate-400 font-mono uppercase font-bold tracking-wider">Representative CAM:</span>
              <p className="font-semibold text-slate-800">{managementCompany.representative}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-mono uppercase font-bold tracking-wider">Office Hours:</span>
              <p className="font-semibold text-slate-800">{managementCompany.officeHours}</p>
            </div>
          </div>
        </div>

        {/* Contact details Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm" id="pm-contact-card">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            Management Directory
          </h4>
          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Main Phone:</span>
              <span className="font-bold text-slate-800">{managementCompany.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">CAM Email:</span>
              <span className="font-semibold text-blue-900 break-all">{managementCompany.email}</span>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-[10px] text-rose-500 font-mono uppercase font-bold flex items-center gap-1">
                <PhoneCall className="h-3 w-3" /> Emergency Call (After Hours):
              </p>
              <p className="font-bold text-slate-800 mt-1">{managementCompany.emergencyPhone}</p>
            </div>
          </div>
          <button
            onClick={() => handleContactMember(managementCompany.email)}
            className="w-full rounded-xl bg-slate-950 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-900 flex items-center justify-center gap-1.5"
          >
            <Mail className="h-4 w-4 text-amber-400" />
            <span>Email Property Manager</span>
          </button>
        </div>
      </section>
    </div>
  );
}
