import React, { useState } from 'react';
import { 
  KeyRound, DollarSign, Wrench, Hammer, CheckCircle2, 
  UserCheck, LogOut, ArrowRight, Loader2, CreditCard, 
  FileText, History, Info, AlertTriangle, PenTool, Check, Trash2, UserPlus,
  ExternalLink, Shield, Calendar, MessageSquare, Globe, Lock, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MaintenanceRequest, ArcRequest } from '../types';
import DocumentUploader from './DocumentUploader';
import { useSiteData } from '../context/SiteDataContext';

interface PortalTabProps {
  initialView?: 'dues' | 'maintenance' | 'arc';
  autoLogin?: boolean;
}

export default function PortalTab({ initialView, autoLogin }: PortalTabProps = {}) {
  const { registeredUsers, addRegisteredUser } = useSiteData();

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unitNo, setUnitNo] = useState('');
  const [password, setPassword] = useState('demo123');
  const [residentName, setResidentName] = useState('');
  const [authError, setAuthError] = useState('');

  // Form toggle
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Sign Up Form states
  const [signUpName, setSignUpName] = useState('');
  const [signUpUnit, setSignUpUnit] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPass, setSignUpPass] = useState('');
  const [signUpConfirmPass, setSignUpConfirmPass] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');

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
  const [mntAttachedFile, setMntAttachedFile] = useState<{ name: string; size: string } | null>(null);
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
  const [arcAttachedFile, setArcAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmittingArc, setIsSubmittingArc] = useState(false);

  // Handle resident login checking against registered users
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!unitNo.trim()) {
      setAuthError('Please enter a valid unit number.');
      return;
    }
    if (!password.trim()) {
      setAuthError('Please enter your password.');
      return;
    }

    const matchedUser = registeredUsers.find(
      (user) => user.unitNo.trim().toLowerCase() === unitNo.trim().toLowerCase()
    );

    if (matchedUser) {
      if (matchedUser.password === password) {
        setResidentName(matchedUser.name);
        setUnitNo(matchedUser.unitNo); // Use capitalized/normalized version
        setIsLoggedIn(true);
        setAuthError('');
      } else {
        setAuthError('Incorrect password for this unit. Please check and try again.');
      }
    } else {
      setAuthError(`Unit "${unitNo}" is not registered yet. Feel free to click "Create Account" below to register this unit!`);
    }
  };

  // Handle resident sign-up registration
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess('');

    if (!signUpName.trim()) {
      setSignUpError('Please enter your full name.');
      return;
    }
    if (!signUpUnit.trim()) {
      setSignUpError('Please specify your condominium unit.');
      return;
    }
    if (!signUpEmail.trim()) {
      setSignUpError('Please enter your email address.');
      return;
    }
    if (!signUpPass.trim()) {
      setSignUpError('Please create a portal password.');
      return;
    }
    if (signUpPass !== signUpConfirmPass) {
      setSignUpError('Passwords do not match.');
      return;
    }

    // Check if unit is already registered
    const unitExists = registeredUsers.find(
      (user) => user.unitNo.trim().toLowerCase() === signUpUnit.trim().toLowerCase()
    );
    if (unitExists) {
      setSignUpError(`Unit "${signUpUnit.toUpperCase()}" is already registered to ${unitExists.name}. If this is you, please log in.`);
      return;
    }

    // Save resident
    addRegisteredUser({
      name: signUpName.trim(),
      unitNo: signUpUnit.trim().toUpperCase(),
      email: signUpEmail.trim(),
      phone: signUpPhone.trim() || undefined,
      password: signUpPass,
    });

    setSignUpSuccess(`Resident account registered successfully for Unit ${signUpUnit.toUpperCase()}! Preparing login portal...`);
    
    // Auto populate login fields
    setUnitNo(signUpUnit.trim().toUpperCase());
    setPassword(signUpPass);

    setTimeout(() => {
      setAuthMode('signin');
      setSignUpName('');
      setSignUpUnit('');
      setSignUpEmail('');
      setSignUpPhone('');
      setSignUpPass('');
      setSignUpConfirmPass('');
      setSignUpSuccess('');
    }, 2000);
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
        ],
        attachedFile: mntAttachedFile ? { name: mntAttachedFile.name, size: mntAttachedFile.size } : undefined
      };

      setMaintenanceTickets((prev) => [newTicket, ...prev]);
      setIsSubmittingMnt(false);
      setMntDesc('');
      setMntLocation('');
      setMntAttachedFile(null);
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
        estimatedCost: arcCost ? `$${arcCost}` : 'Not Specified',
        attachedFile: arcAttachedFile ? { name: arcAttachedFile.name, size: arcAttachedFile.size } : undefined
      };

      setArcRequests((prev) => [newArc, ...prev]);
      setIsSubmittingArc(false);
      setArcTitle('');
      setArcDesc('');
      setArcMaterials('');
      setArcContractor('');
      setArcCost('');
      setArcAttachedFile(null);
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
          The secure HOA command center. Log in to pay monthly assessments, file formal exterior alteration requests, report landscaping/grounds issues, or review past statement logs.
        </p>
      </section>

      {/* Guest View: Sign-In / Sign-Up Box */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-md space-y-6"
            id="portal-auth-form"
          >
            {/* Header branding */}
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 shadow">
                {authMode === 'signin' ? (
                  <KeyRound className="h-6 w-6" />
                ) : (
                  <UserPlus className="h-6 w-6" />
                )}
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-xl">
                {authMode === 'signin' ? 'Resident Portal Access' : 'Create Resident Account'}
              </h3>
              <p className="text-xs text-slate-500">
                {authMode === 'signin' 
                  ? 'Access payments, maintenance dispatch, and committee reviews.' 
                  : 'Register your unit to activate dynamic self-service features.'}
              </p>
            </div>

            {/* Tab selector */}
            <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-xl">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="tab-signin-btn"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setSignUpError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="tab-signup-btn"
              >
                Register Unit
              </button>
            </div>

            {/* Auth forms */}
            {authMode === 'signin' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {authError && (
                  <div className="rounded-xl bg-rose-50 text-rose-700 text-xs p-3 border border-rose-200 font-medium">
                    {authError}
                  </div>
                )}

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                    id="login-pass-input"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-900" />
                    <span>Remember Unit</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert(`In demo mode, you can log in as unit B-204 with the password 'demo123', or create a brand new account with any custom password you like.`)}
                    className="text-blue-900 font-bold hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Need Help?
                  </button>
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
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                {signUpError && (
                  <div className="rounded-xl bg-rose-50 text-rose-700 text-xs p-3 border border-rose-200 font-medium">
                    {signUpError}
                  </div>
                )}
                {signUpSuccess && (
                  <div className="rounded-xl bg-emerald-50 text-emerald-800 text-xs p-3 border border-emerald-200 font-medium flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{signUpSuccess}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Full Resident Name
                  </label>
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Arthur Pendelton"
                    className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                    id="signup-name-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Unit No.
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpUnit}
                      onChange={(e) => setSignUpUnit(e.target.value)}
                      placeholder="e.g. A-102"
                      className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                      id="signup-unit-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="555-0100"
                      className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                      id="signup-phone-input"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="e.g. arthur@example.com"
                    className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                    id="signup-email-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={signUpPass}
                      onChange={(e) => setSignUpPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                      id="signup-pass-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Confirm Pass
                    </label>
                    <input
                      type="password"
                      required
                      value={signUpConfirmPass}
                      onChange={(e) => setSignUpConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-250 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                      id="signup-confirm-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 py-3 text-sm font-semibold text-white shadow transition-colors mt-2"
                  id="signup-submit-btn"
                >
                  <UserPlus className="h-4 w-4 text-amber-400" />
                  <span>Register Resident Account</span>
                </button>
              </form>
            )}

            <div className="rounded-xl bg-blue-50/60 border border-blue-150 p-4 text-xs text-slate-600 leading-normal">
              <p className="font-semibold text-blue-950">Pre-Registered Demonstration Accounts:</p>
              <div className="mt-1.5 space-y-1 text-[11px]">
                <p>• Unit <span className="font-bold font-mono">B-204</span> (Arthur Pendelton) — password: <span className="font-bold font-mono">demo123</span></p>
                <p>• Unit <span className="font-bold font-mono">A-102</span> (Clara Jenkins) — password: <span className="font-bold font-mono">password123</span></p>
              </div>
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
                  { name: 'Exterior Alterations', id: 'arc', icon: PenTool },
                ].map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        if (sec.id === 'maintenance') {
                          window.open('https://acs.cincwebaxis.com/account/loginmodernthemes', '_blank', 'noopener,noreferrer');
                        } else if (sec.id === 'dues') {
                          window.open('https://acs.cincwebaxis.com/account/quickpay', '_blank', 'noopener,noreferrer');
                        } else {
                          setPortalView(sec.id as any);
                        }
                      }}
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
              <div className={(portalView === 'maintenance' || portalView === 'dues') ? "lg:col-span-3" : "lg:col-span-2"}>
                <AnimatePresence mode="wait">
                  {portalView === 'dues' && (
                    <motion.div
                      key="dues-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* External Portal Link Box */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 shadow-sm">
                          <CreditCard className="h-8 w-8" />
                        </div>
                        <div className="space-y-2.5">
                          <h4 className="font-serif font-bold text-slate-900 text-xl">
                            Assessments & Payment Gateway
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                            To view your outstanding balance, set up automatic recurring payments, or securely pay your association dues, please visit our designated online billing gateway.
                          </p>
                        </div>
                        <div className="pt-2">
                          <a
                            href="https://acs.cincwebaxis.com/account/quickpay"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-sm font-semibold shadow-lg shadow-amber-600/10 transition-all hover:scale-[1.02] cursor-pointer"
                          >
                            <span>Access QuickPay Gateway</span>
                            <ExternalLink className="h-4.5 w-4.5" />
                          </a>
                        </div>
                        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                          You will be securely redirected to our third-party assessment and payment processing portal.
                        </div>
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
                      {/* External Portal Link Box */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                          <Wrench className="h-8 w-8" />
                        </div>
                        <div className="space-y-2.5">
                          <h4 className="font-serif font-bold text-slate-900 text-xl">
                            Report Maintenance Issue
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                            To log a new maintenance issue, track current work order progress, or review scheduled property upkeep, please visit our designated community management service portal.
                          </p>
                        </div>
                        <div className="pt-2">
                          <a
                            href="https://acs.cincwebaxis.com/account/loginmodernthemes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-sm font-semibold shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] cursor-pointer"
                          >
                            <span>Access CINC Maintenance Portal</span>
                            <ExternalLink className="h-4.5 w-4.5" />
                          </a>
                        </div>
                        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                          You will be securely redirected to our third-party property management gateway.
                        </div>
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
                            Submit Exterior Alteration Request
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

                          <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-semibold">Upload Blueprint / Drawing Specifications (Optional)</label>
                            <DocumentUploader
                              label="Drag & drop blueprint drawings, contractor quotes or specs, or click to browse"
                              acceptedTypes=".pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg"
                              onFileSelected={(file) => setArcAttachedFile({ name: file.name, size: file.size })}
                              onFileCleared={() => setArcAttachedFile(null)}
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
                                <span>File Exterior Alteration Request</span>
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
                




                {portalView === 'arc' && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Hammer className="h-4.5 w-4.5 text-purple-600" />
                      My Alteration Requests ({arcRequests.length})
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
                          {arc.attachedFile && (
                            <div className="flex items-center gap-1.5 bg-white border border-slate-150 rounded-lg px-2 py-1 text-[10px] text-slate-600 font-medium mt-1">
                              <FileText className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                              <span className="truncate max-w-[150px] font-bold text-slate-800">{arc.attachedFile.name}</span>
                              <span className="text-slate-400 font-mono text-[9px]">({arc.attachedFile.size})</span>
                            </div>
                          )}
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
