import { DocumentItem } from '../types';

export const documentsList: DocumentItem[] = [
  // Governing Documents
  {
    id: 'gov-1',
    title: 'Declaration of Condominium & Covenants',
    category: 'governing',
    code: 'COV-DEC-001',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    description: 'The master declaration containing the full covenants, conditions, and restrictions governing Waterford Place Condominiums.',
    lastUpdated: 'Amended Dec 2023',
  },
  {
    id: 'gov-2',
    title: 'HOA Association Bylaws',
    category: 'governing',
    code: 'BYL-HOA-002',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    description: 'The structural bylaws governing the operation of the HOA, board elections, voting percentages, and meeting requirements.',
    lastUpdated: 'Adopted June 2012',
  },
  {
    id: 'gov-3',
    title: 'Articles of Incorporation',
    category: 'governing',
    code: 'ART-INC-003',
    fileType: 'PDF',
    fileSize: '850 KB',
    description: 'The original state filing establishing Waterford Place Condominium Association, Inc. as a non-profit corporation.',
    lastUpdated: 'May 2012',
  },

  // Rules and Guidelines
  {
    id: 'rul-1',
    title: 'Rules and Regulations Handbook',
    category: 'rules',
    code: 'RUL-HNBK-010',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    description: 'A readable summary handbook detailing common area rules, pool restrictions, pet guidelines, and parking enforcement policies.',
    lastUpdated: 'Revised Feb 2025',
  },
  {
    id: 'rul-2',
    title: 'Architectural Review & Design Standards',
    category: 'rules',
    code: 'RUL-ARC-011',
    fileType: 'PDF',
    fileSize: '980 KB',
    description: 'Standards for doors, windows, patios, balcony decor, and satellite dish installations.',
    lastUpdated: 'Approved Aug 2024',
  },
  {
    id: 'rul-3',
    title: 'Fining Schedule and Enforcement Policy',
    category: 'rules',
    code: 'RUL-FINE-012',
    fileType: 'PDF',
    fileSize: '430 KB',
    description: 'Details on violation warnings, response grace periods, fining structures ($50 to $1,000 maximum), and hearing processes.',
    lastUpdated: 'Adopted Jan 2024',
  },

  // Minutes and Financials
  {
    id: 'fin-1',
    title: '2026 Approved Annual Budget',
    category: 'minutes',
    code: 'FIN-BDG-2026',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    description: 'Line-by-line operating budget and reserve fund contribution targets for the current fiscal year.',
    lastUpdated: 'Approved Nov 2025',
  },
  {
    id: 'fin-2',
    title: '2025 Annual Reserves Study',
    category: 'minutes',
    code: 'FIN-RES-2025',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    description: 'Engineering assessment of the long-term reserves (roofing, paving, pool, painting) scheduled over the next 30 years.',
    lastUpdated: 'Completed Oct 2025',
  },
  {
    id: 'min-1',
    title: 'Board Meeting Minutes - May 2026',
    category: 'minutes',
    code: 'MIN-MTG-0526',
    fileType: 'PDF',
    fileSize: '540 KB',
    description: 'Official approved minutes detailing resolutions, landscaping contract votes, and owner comment logs from the May 2026 session.',
    lastUpdated: 'Approved June 2026',
  },

  // Forms and Applications
  {
    id: 'frm-1',
    title: 'Architectural Control (ARC) Request Form',
    category: 'forms',
    code: 'FRM-ARC-101',
    fileType: 'PDF',
    fileSize: '310 KB',
    description: 'Paper submission form for planning alterations or replacements of doors, storm windows, patio extensions, or HVAC exterior units.',
    lastUpdated: 'Updated May 2024',
  },
  {
    id: 'frm-2',
    title: 'Clubhouse Reservation Agreement',
    category: 'forms',
    code: 'FRM-CLB-102',
    fileType: 'PDF',
    fileSize: '420 KB',
    description: 'Form and policy for booking the private clubhouse space for private social functions, including deposits and cleaning policies.',
    lastUpdated: 'Updated Jan 2025',
  },
  {
    id: 'frm-3',
    title: 'ACH Auto-Draft Authorization Form',
    category: 'forms',
    code: 'FRM-ACH-103',
    fileType: 'PDF',
    fileSize: '280 KB',
    description: 'Authorizes elite management to auto-withdraw monthly association assessments directly from your bank account without transaction fees.',
    lastUpdated: 'Active',
  },
];

export const covenantsQuickReference = [
  {
    topic: 'Parking & Vehicles',
    rules: [
      'Each home has one assigned carport space. Secondary vehicles must use unmarked guest spaces.',
      'Commercial vehicles, boats, trailers, and RVs are strictly prohibited from parking overnight unless in the designated storage zone.',
      'All vehicles parked on the property must have a current registration decal and be in operating condition (no flat tires, leaks, or blocks).',
    ],
  },
  {
    topic: 'Pets & Animals',
    rules: [
      'A maximum of two household pets (cats or dogs) are permitted per residence.',
      'Dogs must not exceed 40 pounds at full maturity, in accordance with Section 8.4 of the Declarations.',
      'All pets must be on a physical leash whenever outside the interior of a condo.',
      'Owners must clean up pet waste immediately. Waste bag stations are positioned around the outer pond walk.',
    ],
  },
  {
    topic: 'Trash, Recycling & Bulk Waste',
    rules: [
      'Trash collection is scheduled on Mondays and Thursdays. Trash must be in sealed bags inside the community dumpsters.',
      'Recycling bins are located by the main entrance gate. Cardboard boxes must be completely flattened before disposal.',
      'Bulk pickup is scheduled for the first Wednesday of every month. Items must be set out next to dumpster enclosure C only after 6:00 PM the previous evening.',
    ],
  },
  {
    topic: 'Quiet Hours & Patios/Balconies',
    rules: [
      'Quiet hours are enforced daily between 10:00 PM and 8:00 AM.',
      'Patios and balconies must be kept neat and orderly. Only patio-style outdoor furniture, healthy potted plants, and approved folding drying racks are permitted.',
      'Storage of bikes, storage bins, trash cans, auto parts, or clutter on balconies is prohibited.',
      'Charcoal grills and standard propane tanks are prohibited on balconies by county fire code. Electric grills are permitted.',
    ],
  },
  {
    topic: 'Leasing & Occupancy',
    rules: [
      'No lease may be for a duration of less than six (6) consecutive months. Short-term Airbnb/VRBO-style leasing is strictly forbidden.',
      'All leases must be registered with Elite Management within 10 days of execution, along with a resident registration package and a background check clearance.',
    ],
  },
];
