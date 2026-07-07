export interface BoardMember {
  id: string;
  name: string;
  role: string;
  description: string;
  email: string;
  phone?: string;
  termEnds: string;
}

export interface Committee {
  id: string;
  name: string;
  chair: string;
  members: string[];
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Important' | 'Social' | 'Maintenance' | 'General';
  content: string;
  author: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'governing' | 'rules' | 'minutes' | 'forms';
  code: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  description: string;
  lastUpdated: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: 'meeting' | 'social' | 'trash' | 'maintenance' | 'holiday';
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'dues' | 'parking' | 'pets' | 'trash' | 'amenities' | 'rules';
}

export interface MaintenanceRequest {
  id: string;
  category: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  location: string;
  submittedAt: string;
  status: 'Received' | 'In Progress' | 'Scheduled' | 'Resolved';
  updates: { date: string; message: string }[];
}

export interface ArcRequest {
  id: string;
  projectTitle: string;
  category: string;
  description: string;
  materials: string;
  contractor: string;
  dimensions: string;
  status: 'Pending Review' | 'Under Board Review' | 'Approved' | 'Approved with Conditions' | 'Denied';
  submittedAt: string;
  estimatedCost: string;
}
