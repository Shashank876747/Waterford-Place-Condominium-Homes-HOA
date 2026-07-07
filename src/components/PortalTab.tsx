import React, { useState } from 'react';
import { 
  KeyRound, DollarSign, Wrench, Hammer, CheckCircle2, 
  UserCheck, LogOut, ArrowRight, Loader2, CreditCard, 
  FileText, History, Info, AlertTriangle, PenTool, Check, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MaintenanceRequest, ArcRequest } from '../types';

interface PortalTabProps {
  initialView?: 'dues' | 'maintenance' | 'arc';
  autoLogin?: boolean;
}

export default function PortalTab({ initialView, autoLogin }: PortalTabProps = {}) {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unitNo, setUnitNo] = useState('');
  const [residentName, setResidentName] = useState('');
  const [authError, setAuthError] = useState('');

  // Portal tabs inside resident portal
  const [portalView, setPortalView] = useState<'dues' | 'maintenance' | 'arc'>('dues');

  // Sync props to state
  React.useEffect(() => {
    if (initialView) {
      setPortalView(initialView);
    }
    if (autoLogin) {
      setUnitNo('B-204');
      setResidentName('Arthur Pendelton');
      setIsLoggedIn(true);
    }
  }, [initialView, autoLogin]);

  // Dues state
  const [duesBalance, setDuesBalance] = useState(385.00);
  const [paymentAmount, setPaymentAmount] = useState('385.00');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState<any | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([
    { id: 'TX-8041', date: '2026-06-01', amount: 385.00, status: 'Completed', method: 'eCheck (Auto-Draft)' },
    { id: 'TX-7592', date: '2026-05-02', amount: 385.00, status: 'Completed', method: 'eCheck (Auto-Draft)' },
    { id: 'TX-6910', date: '2026-04-01', amount: 385.00, status: 'Completed', method: 'eCheck (Auto-Draft)' },
  ]);

  // Maintenance tickets state
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceRequest[]>([
    {
      id: 'MNT-4921',
      category: 'Landscaping & Tree Trimming',
      description: 'The automated irrigation sprinkler system at Building B is cracked and shooting water directly onto the second-floor siding walkway.',
      urgency: 'medium',
      location: 'Walkway between Building B and C',
      submittedAt: '2026-07-01',
      status: 'In Progress',
      updates: [
        { date: '2026-07-01', message: 'Ticket received by Elite Property Management Dispatcher.' },
        { date: '2026-07-03', message: 'ProScape irrigation technician dispatched; parts on order.' }
      ]
    },
    {
      id: 'MNT-4810',
      category: 'Common Lighting',
      description: 'Soffit lighting fixture at entrance lobby Building C has burned out. Area is completely dark at night.',
      urgency: 'low',
      location: 'Building C Main Entrance Vestibule',
      submittedAt: '2026-06-15',
      status: 'Resolved',
      updates: [
        { date: '2026-06-15', message: 'Ticket received.' },
        { date: '2026-06-17', message: 'Bulb replaced and glass fixture cleaned. Inspection passed.' }
      ]
    }
  ]);
  const [mntCategory, setMntCategory] = useState('Common Plumbing & Exterior Leak');
  const [mntDesc, setMntDesc] = useState('');
  const [mntUrgency, setMntUrgency] = useState<'low' | 'medium' | 'high' | 'emergency'>('medium');
  const [mntLocation, setMntLocation] = useState('');
  const [isSubmittingMnt, setIsSubmittingMnt] = useState(false);

  // ARC requests state
  const [arcRequests, setArcRequests] = useState<ArcRequest[]>([
    {
      id: 'ARC-201',
      projectTitle: 'Storm Entry Door Replacement',
      category: 'Doors & Windows',
      description: 'Replace original wood storm door with matching bronze-finished aluminum-framed full glass storm door (LARSON model #102947).',
      materials: 'Aluminum, Bronze glass, structural screws',
      contractor: 'Self-Installed',
      dimensions: '36" x 80" Standard Entry',
      status: 'Under Board Review',
      submittedAt: '2026-06-20',
      estimatedCost: '$450.00'
    }
  ]);
  const [arcTitle, setArcTitle] = useState('');
  const [arcCategory, setArcCategory] = useState('Doors & Windows');
  const [arcDesc, setArcDesc] = useState('');
  const [arcMaterials, setArcMaterials] = useState('');
  const [arcContractor, setArcContractor] = useState('');
  const [arcCost, setArcCost] = useState('');
  const [isSubmittingArc, setIsSubmittingArc] = useState(false);

  // Handle mock resident login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNo.trim()) {
      setAuthError('Please enter a valid unit number.');
      return;
    }
    setResidentName('Arthur Pendelton');
    setIsLoggedIn(true);
    setAuthError('');
  };

  // Handle mock dues payment
  const handlePayDues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert('Please fill out all simulated billing card details.');
      return;
    }
    setIsPaying(true);

    setTimeout(() => {
      const amountPaid = parseFloat(paymentAmount);
      const newBalance = Math.max(0, duesBalance - amountPaid);
      const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toISOString().split('T')[0];

      setDuesBalance(newBalance);
      setPaymentHistory((prev) => [
        { id: txId, date: today, amount: amountPaid, status: 'Completed', method: 'Credit Card (Simulated)' },
        ...prev
      ]);
      setPaymentReceipt({
        txId,
        date: today,
        amount: amountPaid,
        balanceRemaining: newBalance,
        unit: unitNo
      });
      setIsPaying(false);
      // Clear forms
      setCardName('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
    }, 1500);
  };

  // Handle maintenance submit
  const handleMntSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mntDesc.trim() || !mntLocation.trim()) {
      alert('Please fill out description and location details.');
      return;
    }
    setIsSubmittingMnt(true);

    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const newTicketId = `MNT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket: MaintenanceRequest = {
        id: newTicketId,
        category: mntCategory,
        description: mntDesc,
        urgency: mntUrgency,
        location: mntLocation,
        submittedAt: today,
        status: 'Received',
        updates: [
          { date: today, message: 'Ticket registered successfully. Assigned to Elite PM Operations desk.' }
        ]
      };

      setMaintenanceTickets((prev) => [newTicket, ...prev]);
      setIsSubmittingMnt(false);
      setMntDesc('');
      setMntLocation('');
      alert(`Success! Maintenance Ticket ${newTicketId} has been successfully dispatched to landscaping & facilities.`);
    }, 1200);
  };

  // Handle ARC submit
  const handleArcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arcTitle.trim() || !arcDesc.trim()) {
      alert('Please provide project title and description.');
      return;
    }
    setIsSubmittingArc(true);

    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const newArcId = `ARC-${Math.floor(200 + Math.random() * 800)}`;
      const newArc: ArcRequest = {
        id: newArcId,
        projectTitle: arcTitle,
        category: arcCategory,
        description: arcDesc,
        materials: arcMaterials || 'Not Specified',
        contractor: arcContractor || 'Self-Installed',
        dimensions: 'Per Specifications',
        status: 'Pending Review',
        submittedAt: today,
        estimatedCost: arcCost ? `$${arcCost}` : 'Not Specified'
      };

      setArcRequests((prev) => [newArc, ...prev]);
      setIsSubmittingArc(false);
      setArcTitle('');
      setArcDesc('');
      setArcMaterials('');
      setArcContractor('');
      setArcCost('');
      alert(`Success! Architectural Alteration Plan ${newArcId} has been registered and scheduled for committee review.`);
    }, 1500);
  };

  return (
    <div className="space-y-12" id="portal-view-container">
      {/* Upper info */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Co-Owner Resident Portal
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          The secure HOA command center. Log in to pay monthly assessments, file formal Architectural Review (ARC) projects, report landscaping/grounds issues, or review past statement logs.
        </p>
      </section>

      {/* Guest View: Sign-In Box */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-md space-y-6"
            id="portal-login-form"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 shadow">
                <KeyRound className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-xl">
                Sign In to Resident Account
              </h3>
              <p className="text-xs text-slate-500">
                Enter your assigned unit and secret password
              </p>
            </div>

            {authError && (
              <div className="rounded-xl bg-rose-50 text-rose-700 text-xs p-3 border border-rose-200 font-medium">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Condominium Unit No.
                </label>
                <input
                  type="text"
                  required
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                  placeholder="e.g. B-204"
                  className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  id="login-unit-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Portal Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  defaultValue="demo123"
                  className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  id="login-pass-input"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-900" />
                  <span>Remember Unit</span>
                </label>
                <a href="#" className="text-blue-900 font-bold hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white shadow hover:bg-slate-900 transition-colors"
                id="login-submit-btn"
              >
                <span>Authorize & Connect</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </button>
            </form>

            <div className="rounded-xl bg-blue-50/60 border border-blue-150 p-4 text-xs text-slate-600 leading-normal">
              <p className="font-semibold text-blue-950">Demo Credentials:</p>
              <p className="mt-1">
                Use any unit number (e.g., <span className="font-bold font-mono">B-204</span>) and any password to test. Security controls are pre-authenticated in Sandbox Mode.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Authorized Resident Control View */
          <motion.div
            key="authorized-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
            id="resident-authorized-portal"
          >
            {/* Account Welcome Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg leading-tight">
                    {residentName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Waterford Place Residence • Unit <span className="font-bold font-mono text-slate-800 bg-slate-100 rounded px-1.5 py-0.5">{unitNo}</span>
                  </p>
                </div>
              </div>

              {/* Portal navigation tabs */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Dues & Billing', id: 'dues', icon: DollarSign },
                  { name: 'Maintenance Issues', id: 'maintenance', icon: Wrench },
                  { name: 'ARC Project Form', id: 'arc', icon: PenTool },
                ].map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setPortalView(sec.id as any)}
                      id={`portal-nav-btn-${sec.id}`}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        portalView === sec.id
                          ? 'bg-blue-900 text-white shadow'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{sec.name}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl px-3 py-2 text-xs font-bold border border-rose-250/30 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Sub views */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left 2 Columns: Sub-form or dashboard */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {portalView === 'dues' && (
                    <motion.div
                      key="dues-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Dues and simulated billing */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-amber-500" />
                            Assessments & Payment Gateway
                          </h4>
                          <span className="text-xs font-mono font-bold text-amber-500">
                            Sandbox Secure
                          </span>
                        </div>

                        {/* Balance display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                          <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex flex-col justify-between h-28">
                            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Account Balance</span>
                            <span className={`text-3xl font-extrabold ${duesBalance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                              ${duesBalance.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {duesBalance > 0 ? 'July assessment outstanding' : 'Account fully paid. Thanks!'}
                            </span>
                          </div>

                          <div className="md:col-span-2 space-y-3 text-xs text-slate-600 leading-normal">
                            <p className="font-semibold text-slate-800">Payment Due Dates:</p>
                            <p>
                              Monthly assessments of <span className="font-bold text-slate-900">$385.00</span> are charged automatically on the 1st. Standard grace period is provided until 11:59 PM on the 10th. Payments received after the 10th will instantly apply a $25.00 late charge.
                            </p>
                          </div>
                        </div>

                        {duesBalance > 0 ? (
                          /* Dues Payment Form */
                          <form onSubmit={handlePayDues} className="border-t border-slate-100 pt-6 space-y-4">
                            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                              Payment Credentials (Simulated)
                            </h5>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs text-slate-500 font-semibold">Name on Card</label>
                                <input
                                  type="text"
                                  required
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value)}
                                  placeholder="Arthur Pendelton"
                                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-xs text-slate-500 font-semibold">Simulated Card Number</label>
                                <input
                                  type="text"
                                  required
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  placeholder="4111 2222 3333 4444"
                                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 font-mono"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-xs text-slate-500 font-semibold">Expiration</label>
                                  <input
                                    type="text"
                                    required
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    placeholder="MM/YY"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 font-mono"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs text-slate-500 font-semibold">CVV</label>
                                  <input
                                    type="password"
                                    required
                                    maxLength={3}
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value)}
                                    placeholder="•••"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 font-mono"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-xs text-slate-500 font-semibold">Payment Amount ($)</label>
                                <input
                                  type="text"
                                  required
                                  value={paymentAmount}
                                  onChange={(e) => setPaymentAmount(e.target.value)}
                                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 font-mono"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isPaying}
                              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-3 text-xs font-bold shadow transition-colors"
                            >
                              {isPaying ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                                  <span>Authorizing Sandbox Charge...</span>
                                </>
                              ) : (
                                <>
                                  <DollarSign className="h-4 w-4 text-amber-400" />
                                  <span>Submit Simulated Payment of ${parseFloat(paymentAmount || '0').toFixed(2)}</span>
                                </>
                              )}
                            </button>
                          </form>
                        ) : (
                          /* Paid confirmation screen */
                          <div className="border-t border-slate-100 pt-6 text-center space-y-4 py-4" id="dues-paid-screen">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                              <Check className="h-6 w-6 stroke-[2.5]" />
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="font-serif font-bold text-slate-900 text-lg">
                                Your Account is Fully Paid!
                              </h4>
                              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                                Thank you! Your account balance is currently $0.00. No further assessment payments are scheduled until August 1st.
                              </p>
                            </div>
                          </div>
                        )}

                        {paymentReceipt && (
                          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/20 p-5 space-y-3 text-xs" id="payment-receipt-box">
                            <div className="flex items-center justify-between border-b border-emerald-100 pb-2 text-emerald-800 font-bold">
                              <span>Simulated Transaction Success Receipt</span>
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-slate-600">
                              <span>Receipt Number:</span>
                              <span className="font-bold text-slate-800 font-mono text-right">{paymentReceipt.txId}</span>
                              <span>Date/Time:</span>
                              <span className="font-mono text-right">{paymentReceipt.date}</span>
                              <span>Amount Processed:</span>
                              <span className="font-bold text-slate-800 text-right">${paymentReceipt.amount.toFixed(2)}</span>
                              <span>Outstanding Balance:</span>
                              <span className="font-bold text-emerald-600 text-right">$0.00</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {portalView === 'maintenance' && (
                    <motion.div
                      key="mnt-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Submit Ticket Form */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                        <div className="border-b border-slate-150 pb-3">
                          <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-indigo-600" />
                            Submit New Maintenance Request
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Report issues with common buildings, hallways, pool, pond walks, or security locks.
                          </p>
                        </div>

                        <form onSubmit={handleMntSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Incident Category</label>
                              <select
                                value={mntCategory}
                                onChange={(e) => setMntCategory(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                              >
                                <option>Common Plumbing & Exterior Leak</option>
                                <option>Landscaping & Tree Trimming</option>
                                <option>Common Lighting & Electrical</option>
                                <option>Pool & Clubroom Defect</option>
                                <option>Soffit, Gutter or Shingle Fault</option>
                                <option>Sidewalk Crack or Paving Defect</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Urgency Level</label>
                              <select
                                value={mntUrgency}
                                onChange={(e) => setMntUrgency(e.target.value as any)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                              >
                                <option value="low">Low (General Request)</option>
                                <option value="medium">Medium (Routine Service)</option>
                                <option value="high">High (Needs board attention)</option>
                                <option value="emergency">Emergency (Immediate hazard)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-semibold">Exact Location on Property</label>
                            <input
                              type="text"
                              required
                              value={mntLocation}
                              onChange={(e) => setMntLocation(e.target.value)}
                              placeholder="e.g. Next to dumpster B or balcony of unit C-202"
                              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-semibold">Problem Description</label>
                            <textarea
                              required
                              rows={3}
                              value={mntDesc}
                              onChange={(e) => setMntDesc(e.target.value)}
                              placeholder="Describe the issue in detail to assist our vendor contractors..."
                              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingMnt}
                            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-900 transition-all"
                          >
                            {isSubmittingMnt ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                                <span>Logging ticket...</span>
                              </>
                            ) : (
                              <>
                                <Wrench className="h-4 w-4 text-amber-400" />
                                <span>Submit Maintenance Ticket</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}

                  {portalView === 'arc' && (
                    <motion.div
                      key="arc-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Submit ARC Form */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                        <div className="border-b border-slate-150 pb-3">
                          <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                            <Hammer className="h-5 w-5 text-purple-600" />
                            Submit Architectural Control (ARC) Application
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Submit plans for windows, exterior doors, patio tiling, or balcony shades for Board of Directors review.
                          </p>
                        </div>

                        <form onSubmit={handleArcSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Project Title</label>
                              <input
                                type="text"
                                required
                                value={arcTitle}
                                onChange={(e) => setArcTitle(e.target.value)}
                                placeholder="e.g. Back Patio Tile Replacement"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Alteration Category</label>
                              <select
                                value={arcCategory}
                                onChange={(e) => setArcCategory(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-blue-900"
                              >
                                <option>Doors & Windows</option>
                                <option>Balcony & Patio Alterations</option>
                                <option>HVAC Condenser Unit</option>
                                <option>Satellite Dish Placement</option>
                                <option>Other Exterior Structural Alteration</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-semibold">Materials & Color Palette</label>
                            <input
                              type="text"
                              value={arcMaterials}
                              onChange={(e) => setArcMaterials(e.target.value)}
                              placeholder="e.g. Bronze aluminum, off-white exterior paint to match building"
                              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Licensed Contractor Details</label>
                              <input
                                type="text"
                                value={arcContractor}
                                onChange={(e) => setArcContractor(e.target.value)}
                                placeholder="e.g. Metro Windows Inc. (Lic# 804921)"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-500 font-semibold">Estimated Cost of Project ($)</label>
                              <input
                                type="text"
                                value={arcCost}
                                onChange={(e) => setArcCost(e.target.value)}
                                placeholder="e.g. 1200"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-semibold">Full Project Details & Specifications</label>
                            <textarea
                              required
                              rows={3}
                              value={arcDesc}
                              onChange={(e) => setArcDesc(e.target.value)}
                              placeholder="State exactly what alterations are planned, structural attachments, and timeline..."
                              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingArc}
                            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-900 transition-all"
                          >
                            {isSubmittingArc ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                                <span>Recording plans...</span>
                              </>
                            ) : (
                              <>
                                <Hammer className="h-4 w-4 text-amber-400" />
                                <span>File Formal ARC Application</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Portal activity logs & history trackers */}
              <div className="space-y-6">
                
                {/* Condition-based Side tracker */}
                {portalView === 'dues' && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <History className="h-4.5 w-4.5 text-blue-900" />
                      Transaction History
                    </h4>
                    <div className="space-y-3.5">
                      {paymentHistory.map((pm, idx) => (
                        <div key={pm.id} className="flex justify-between items-start text-xs border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="font-semibold text-slate-800">{pm.method}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{pm.date} • {pm.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">${pm.amount.toFixed(2)}</p>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/45">
                              {pm.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {portalView === 'maintenance' && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Wrench className="h-4.5 w-4.5 text-indigo-600" />
                      My Active Tickets ({maintenanceTickets.length})
                    </h4>
                    <div className="space-y-4">
                      {maintenanceTickets.map((ticket) => (
                        <div key={ticket.id} className="rounded-xl border border-slate-150 p-3 bg-slate-50/60 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[10px] text-slate-400">{ticket.id}</span>
                            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              ticket.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ticket.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-850'
                                : 'bg-slate-200 text-slate-600'
                            }`}>
                              {ticket.status}
                            </span>
                          </div>
                          <h5 className="font-semibold text-slate-800 leading-tight">{ticket.category}</h5>
                          <p className="text-slate-500 leading-normal line-clamp-2">{ticket.description}</p>
                          <div className="pt-1.5 border-t border-slate-200/50">
                            <p className="text-[10px] font-mono text-slate-400">Latest Log:</p>
                            <p className="text-[10px] font-medium text-slate-600 italic mt-0.5">
                              "{ticket.updates[ticket.updates.length - 1]?.message}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {portalView === 'arc' && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Hammer className="h-4.5 w-4.5 text-purple-600" />
                      My ARC Applications ({arcRequests.length})
                    </h4>
                    <div className="space-y-4">
                      {arcRequests.map((arc) => (
                        <div key={arc.id} className="rounded-xl border border-slate-150 p-3 bg-slate-50/60 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[10px] text-slate-400">{arc.id}</span>
                            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              arc.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : arc.status === 'Pending Review'
                                ? 'bg-slate-200 text-slate-600'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {arc.status}
                            </span>
                          </div>
                          <h5 className="font-semibold text-slate-800 leading-tight">{arc.projectTitle}</h5>
                          <p className="text-slate-500 line-clamp-2">{arc.description}</p>
                          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                            <span>Filed: {arc.submittedAt}</span>
                            <span>Est: {arc.estimatedCost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
