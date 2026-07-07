import { BoardMember, Committee } from '../types';

export const boardMembers: BoardMember[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'President',
    description: 'Resident since 2015. Sarah is dedicated to maintaining the aesthetic beauty of Waterford Place and fostering community alignment.',
    email: 'president@waterfordplacehoa.org',
    termEnds: 'November 2027',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Vice President',
    description: 'Resident since 2018. Marcus serves as the coordinator of structural capital improvement projects and liaison to contractors.',
    email: 'vp@waterfordplacehoa.org',
    termEnds: 'November 2026',
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Treasurer',
    description: 'An accountant with 15 years of experience. Elena oversees the reserve fund, monthly financial statements, and annual audits.',
    email: 'treasurer@waterfordplacehoa.org',
    termEnds: 'November 2027',
  },
  {
    id: '4',
    name: 'David Kojo',
    role: 'Secretary & Communication',
    description: 'David handles the meeting minutes, website content, and drafts the quarterly newsletters distributed to co-owners.',
    email: 'secretary@waterfordplacehoa.org',
    termEnds: 'November 2026',
  },
  {
    id: '5',
    name: 'Chloe Tremblay',
    role: 'Member at Large',
    description: 'Chloe leads the Social & Welcoming Committee and coordinates community-wide landscaping improvement walks.',
    email: 'chloe@waterfordplacehoa.org',
    termEnds: 'November 2028',
  },
];

export const committees: Committee[] = [
  {
    id: 'arc',
    name: 'Architectural Review Committee (ARC)',
    chair: 'Marcus Vance',
    members: ['Linda Park', 'Tom Bradley'],
    description: 'Reviews and approves all alteration and renovation plans submitted by residents (patios, window updates, satellite dishes) to ensure adherence to community design standards.',
  },
  {
    id: 'landscape',
    name: 'Landscaping & Grounds Committee',
    chair: 'Chloe Tremblay',
    members: ['Robert Chen', 'Sarah Jenkins', 'Molly Watson'],
    description: 'Monitors community lawns, gardens, walkways, sprinkler systems, and directs our landscape contractor for annual mulch, seasonal flowers, and tree trimming.',
  },
  {
    id: 'rules',
    name: 'Rules & Community Relations Committee',
    chair: 'David Kojo',
    members: ['Elena Rostova', 'Gary Thompson'],
    description: 'Periodically reviews community guidelines regarding parking, trash disposal, pet rules, and noise, and works to resolve disputes friendly between residents.',
  },
];

export const managementCompany = {
  name: 'Elite Property Management Services, LLC',
  address: '450 Professional Parkway, Suite 120, Metro City',
  representative: 'Jennifer Sterling, CAM',
  phone: '(555) 345-6700',
  fax: '(555) 345-6701',
  email: 'jsterling@elitepm.com',
  officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
  emergencyPhone: '(555) 345-9111 (For structural emergencies after-hours)',
};
