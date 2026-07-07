import React, { useState } from 'react';
import { 
  Mail, Phone, Clock, Send, ShieldAlert, CheckCircle2, 
  AlertTriangle, PhoneCall, FileText, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { managementCompany } from '../data/boardData';

interface ContactTabProps {
  prefilledEmail: string;
}

export default function ContactTab({ prefilledEmail }: ContactTabProps) {
  // General Form
  const [formData, setFormData] = useState({
    recipient: prefilledEmail || managementCompany.email,
    subject: 'General Inquiry',
    name: '',
    unit: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Violation Form
  const [violationData, setViolationData] = useState({
    violatorUnit: '',
    ruleCategory: 'Parking Infraction',
    dateObserved: '',
    description: '',
    informantName: '', // optional for anonymity
  });
  const [isSubmittingVio, setIsSubmittingVio] = useState(false);
  const [vioSuccess, setVioSuccess] = useState(false);

  // Handle general send
  const handleGeneralSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      // Reset after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
        setFormData({
          recipient: managementCompany.email,
          subject: 'General Inquiry',
          name: '',
          unit: '',
          email: '',
          message: '',
        });
      }, 5000);
    }, 1500);
  };

  // Handle violation report
  const handleVioSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!violationData.description || !violationData.dateObserved) {
      alert('Please fill out date and description of violation.');
      return;
    }
    setIsSubmittingVio(true);

    setTimeout(() => {
      setIsSubmittingVio(false);
      setVioSuccess(true);
      setTimeout(() => {
        setVioSuccess(false);
        setViolationData({
          violatorUnit: '',
          ruleCategory: 'Parking Infraction',
          dateObserved: '',
          description: '',
          informantName: '',
        });
      }, 5000);
    }, 1500);
  };

  const emergencyContacts = [
    { label: 'Water Leak / Structural Burst', agency: 'Elite PM Urgent Dispatch', phone: '(555) 345-9111' },
    { label: 'Sewer Back-up / Main Fault', agency: 'Metro Sanitation District', phone: '(555) 890-4400' },
    { label: 'Power Lines / Electrical Sparking', agency: 'County Power & Light Co.', phone: '(555) 234-9000' },
    { label: 'Animal Control / Stray Dogs', agency: 'County Animal Services', phone: '(555) 902-1200' },
    { label: 'Unauthorized Car Parked / Towing', agency: 'Rapid Recovery Towing Inc.', phone: '(555) 456-9122' },
  ];

  return (
    <div className="space-y-12" id="contact-view-container">
      {/* Page header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contact Us & Support
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Need to reach the Board of Directors, file an inquiry with Elite Property Management, or report a neighborhood rule violation? Select a form below or reference our emergency listings.
        </p>
      </section>

      {/* Split Grid: Forms vs Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Forms (8 grid widths) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Form 1: General Inquiry Contact */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                <Mail className="h-5.5 w-5.5 text-blue-900" />
                Send a Message to Association
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your message will be routed directly to the property manager or designated board member.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl bg-emerald-50 text-emerald-800 p-6 border border-emerald-200 text-center space-y-3"
                  id="general-contact-success"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for your submission. Your message has been logged and routed. The Property Manager typically responds within 1-2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleGeneralSend} className="space-y-4" id="general-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Recipient Desk</label>
                      <select
                        value={formData.recipient}
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                      >
                        <option value={managementCompany.email}>Elite PM - Jennifer Sterling (CAM)</option>
                        <option value="president@waterfordplacehoa.org">HOA Board - Sarah Jenkins (President)</option>
                        <option value="treasurer@waterfordplacehoa.org">HOA Board - Elena Rostova (Treasurer)</option>
                        <option value="secretary@waterfordplacehoa.org">HOA Board - David Kojo (Secretary)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Topic/Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                      >
                        <option>General Inquiry</option>
                        <option>Dues & Balance Query</option>
                        <option>Clubhouse Reservation Booking</option>
                        <option>Bylaw or Covenant Clarification</option>
                        <option>Submit Tenant Lease Package</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">My Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Arthur Pendelton"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Unit Number (if owner)</label>
                      <input
                        type="text"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="e.g. B-204"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="arthur@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Message Content *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your comments or questions here..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-900 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 text-amber-400" />
                        <span>Submit Secure Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Form 2: Confidential Rule Violation Reporter */}
          <div className="rounded-2xl border border-slate-200 bg-rose-50/5 p-6 shadow-sm border-l-4 border-l-rose-500 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-rose-950 text-lg flex items-center gap-2">
                <ShieldAlert className="h-5.5 w-5.5 text-rose-600" />
                Confidential Covenant Violation Reporter
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Report property violations (e.g. pet off-leash, blocked carport, trash dumping) directly to Elite Management. All informant records are kept strictly anonymous.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {vioSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl bg-rose-50 text-rose-800 p-6 border border-rose-200 text-center space-y-3"
                  id="violation-success-box"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">Violation Logged Confidentially!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your observation has been logged securely. Elite Management will schedule an on-site property walkthrough to verify and issue appropriate warnings or citations under Section 12.1.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleVioSend} className="space-y-4" id="violation-reporter-form">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Violation Type</label>
                      <select
                        value={violationData.ruleCategory}
                        onChange={(e) => setViolationData({ ...violationData, ruleCategory: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                      >
                        <option>Parking Infraction</option>
                        <option>Pet Leash / Waste Violation</option>
                        <option>Unapproved Exterior Construction</option>
                        <option>Trash/Bulk Dumping Out of Hours</option>
                        <option>Noise / Nuisance violation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Violator Unit # (if known)</label>
                      <input
                        type="text"
                        value={violationData.violatorUnit}
                        onChange={(e) => setViolationData({ ...violationData, violatorUnit: e.target.value })}
                        placeholder="e.g. Building B, unit 104"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 font-semibold">Date Observed *</label>
                      <input
                        type="date"
                        required
                        value={violationData.dateObserved}
                        onChange={(e) => setViolationData({ ...violationData, dateObserved: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Reporter Name (Leave empty for complete anonymity)</label>
                    <input
                      type="text"
                      value={violationData.informantName}
                      onChange={(e) => setViolationData({ ...violationData, informantName: e.target.value })}
                      placeholder="Your name is fully redacted from standard management records"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Violation Observation Details *</label>
                    <textarea
                      required
                      rows={3}
                      value={violationData.description}
                      onChange={(e) => setViolationData({ ...violationData, description: e.target.value })}
                      placeholder="Please state exactly what you observed (time, locations, vehicle plates, repeating patterns)..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingVio}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-3 text-xs font-bold shadow transition-colors"
                  >
                    {isSubmittingVio ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Filing Anonymous Report...</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4 text-white" />
                        <span>File Confidential Complaint Report</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Emergency & Contacts Directory (4 widths) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Elite Management details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              Management Office
            </h4>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="space-y-1">
                <span className="font-mono uppercase font-bold text-slate-400 tracking-wider">Mailing Address:</span>
                <p className="font-semibold text-slate-800 leading-normal">{managementCompany.address}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono uppercase font-bold text-slate-400 tracking-wider">Office Hours:</span>
                <p className="font-semibold text-slate-800 flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-slate-400 shrink-0" />
                  {managementCompany.officeHours}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono uppercase font-bold text-slate-400 tracking-wider">Direct Phone & Email:</span>
                <p className="font-semibold text-slate-800 flex items-center mt-1">
                  <Phone className="h-4 w-4 mr-1.5 text-slate-400 shrink-0" />
                  {managementCompany.phone}
                </p>
                <p className="font-semibold text-slate-800 flex items-center break-all mt-1">
                  <Mail className="h-4 w-4 mr-1.5 text-slate-400 shrink-0" />
                  {managementCompany.email}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency dispatch list */}
          <div className="rounded-2xl border border-slate-250 bg-rose-50/10 p-5 shadow-sm space-y-4 border-l-4 border-l-rose-600" id="emergency-directory-panel">
            <h4 className="font-serif font-bold text-rose-950 text-base flex items-center gap-1.5 border-b border-rose-100 pb-2">
              <PhoneCall className="h-4.5 w-4.5 text-rose-600" />
              Emergency Directory
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              For common-area structural hazards (severe building water leaks, electrical fires) after-hours, use these emergency dispatch lines. For fire or medical, immediately call <span className="font-bold text-slate-900 font-mono">911</span> first.
            </p>

            <div className="space-y-4 pt-1">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="space-y-0.5 text-xs">
                  <span className="font-mono font-bold uppercase tracking-wide text-slate-400 text-[10px]">
                    {contact.label}
                  </span>
                  <div className="flex items-center justify-between font-semibold mt-0.5">
                    <span className="text-slate-600 font-medium text-[11px]">{contact.agency}</span>
                    <span className="text-rose-600 font-bold font-mono">{contact.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
