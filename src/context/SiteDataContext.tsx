import React, { createContext, useContext, useState, useEffect } from 'react';
import { BoardMember, Committee, Announcement, DocumentItem, CalendarEvent, FaqItem } from '../types';
import { boardMembers as defaultBoardMembers, committees as defaultCommittees, managementCompany as defaultManagement } from '../data/boardData';
import { documentsList as defaultDocuments } from '../data/documentsData';
import { eventsList as defaultEvents } from '../data/eventsData';
import { faqList as defaultFaqs } from '../data/faqData';

export interface SiteMetadata {
  name: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeTitle: string;
  welcomeText: string;
  address: string;
  facebookUrl: string;
  facebookText: string;
  emailListTitle: string;
  emailListText: string;
  managementName: string;
  managementAddress: string;
  managementPhone: string;
  managementFax: string;
  managementEmail: string;
  managementHours: string;
  managementEmergency: string;
}

interface PhotoItem {
  id: string;
  url: string;
  title: string;
}

interface SiteDataContextType {
  siteMetadata: SiteMetadata;
  updateSiteMetadata: (metadata: Partial<SiteMetadata>) => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  boardMembers: BoardMember[];
  addBoardMember: (member: Omit<BoardMember, 'id'>) => void;
  updateBoardMember: (id: string, member: Partial<BoardMember>) => void;
  deleteBoardMember: (id: string) => void;
  committees: Committee[];
  addCommittee: (committee: Omit<Committee, 'id'>) => void;
  updateCommittee: (id: string, committee: Partial<Committee>) => void;
  deleteCommittee: (id: string) => void;
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id'>) => void;
  updateDocument: (id: string, doc: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  events: CalendarEvent[];
  addEvent: (evt: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, evt: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  communityPhotos: PhotoItem[];
  updateCommunityPhoto: (id: string, url: string, title: string) => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  resetAllToDefault: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const defaultMetadata: SiteMetadata = {
  name: 'Waterford Place',
  subtitle: 'Condominium Homes',
  heroTitle: 'Welcome Home.',
  heroSubtitle: 'The official website for Waterford Place Condominium Homes HOA.',
  welcomeTitle: 'Welcome To our community portal',
  welcomeText: "Welcome to the official website for Waterford Place Condominium Homes HOA. Here you'll find information about your community, board members, governing documents, upcoming events, and ways to get involved. We believe in fostering a warm, connected neighborhood where residents look out for one another.",
  address: 'Killarney SE Smyrna, GA 30080',
  facebookUrl: 'https://facebook.com/groups/waterfordplace',
  facebookText: 'Join our private group',
  emailListTitle: 'Email List',
  emailListText: 'Sign up for announcements',
  managementName: defaultManagement.name,
  managementAddress: defaultManagement.address,
  managementPhone: defaultManagement.phone,
  managementFax: defaultManagement.fax,
  managementEmail: defaultManagement.email,
  managementHours: defaultManagement.officeHours,
  managementEmergency: defaultManagement.emergencyPhone,
};

const defaultPhotos: PhotoItem[] = [
  { id: 'p-1', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', title: 'Community Entrance' },
  { id: 'p-2', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', title: 'Clubhouse Patio' },
  { id: 'p-3', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80', title: 'Swimming Pool' },
  { id: 'p-4', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80', title: 'Lush Green Courtyards' },
  { id: 'p-5', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', title: 'Main Retention Pond & Fountain' },
  { id: 'p-6', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', title: 'Resident Carport Garages' },
];

const defaultAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Spring Landscaping Schedule',
    date: '2026-04-15',
    category: 'Maintenance',
    content: 'Our landscaping crews will be on site starting next week to begin the spring mulching and planting. Please ensure all personal items are removed from common planting beds.',
    author: 'Board & Committees',
  },
  {
    id: 'ann-2',
    title: 'Pool Opening Date Announced',
    date: '2026-04-02',
    category: 'Social',
    content: 'The community pool will officially open on Memorial Day weekend. Pool passes will be mailed to all residents in good standing by mid-May.',
    author: 'Board & Committees',
  },
  {
    id: 'ann-3',
    title: 'Quarterly Board Meeting Minutes',
    date: '2026-03-28',
    category: 'Important',
    content: 'The minutes from our Q1 board meeting have been posted to the Documents page. Key topics included the 2024 budget review and exterior maintenance plans.',
    author: 'Board & Committees',
  },
];

const defaultEventsCopy: CalendarEvent[] = [
  {
    id: 'evt-c-1',
    title: 'Community Cleanup Day',
    date: '2026-04-20',
    time: '9:00 AM',
    location: 'Common Area Entrance',
    category: 'social',
    description: 'Let\'s work together to beautify our community entrance and flower beds!',
  },
  {
    id: 'evt-c-2',
    title: 'HOA Monthly Meeting',
    date: '2026-05-15',
    time: '7:00 PM',
    location: 'Community Clubhouse & Zoom',
    category: 'meeting',
    description: 'Monthly board meeting. All co-owners welcome.',
  },
  {
    id: 'evt-c-3',
    title: 'Pool Opening Party',
    date: '2026-05-25',
    time: '12:00 PM',
    location: 'Community Pool',
    category: 'social',
    description: 'Come celebrate the official opening of the pool with food and music!',
  },
  ...defaultEvents.filter(e => e.id !== 'evt-1' && e.id !== 'evt-2' && e.id !== 'evt-3'),
];

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteMetadata, setSiteMetadata] = useState<SiteMetadata>(defaultMetadata);
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(defaultBoardMembers);
  const [committees, setCommittees] = useState<Committee[]>(defaultCommittees);
  const [documents, setDocuments] = useState<DocumentItem[]>(defaultDocuments);
  const [events, setEvents] = useState<CalendarEvent[]>(defaultEventsCopy);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [communityPhotos, setCommunityPhotos] = useState<PhotoItem[]>(defaultPhotos);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedMeta = localStorage.getItem('wp_meta');
      if (savedMeta) setSiteMetadata(JSON.parse(savedMeta));

      const savedAnn = localStorage.getItem('wp_announcements');
      if (savedAnn) setAnnouncements(JSON.parse(savedAnn));

      const savedBoard = localStorage.getItem('wp_board_members');
      if (savedBoard) setBoardMembers(JSON.parse(savedBoard));

      const savedCommittees = localStorage.getItem('wp_committees');
      if (savedCommittees) setCommittees(JSON.parse(savedCommittees));

      const savedDocs = localStorage.getItem('wp_documents');
      if (savedDocs) setDocuments(JSON.parse(savedDocs));

      const savedEvents = localStorage.getItem('wp_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedFaqs = localStorage.getItem('wp_faqs');
      if (savedFaqs) setFaqs(JSON.parse(savedFaqs));

      const savedPhotos = localStorage.getItem('wp_photos');
      if (savedPhotos) setCommunityPhotos(JSON.parse(savedPhotos));

      const savedEditMode = localStorage.getItem('wp_edit_mode');
      if (savedEditMode) setIsEditMode(JSON.parse(savedEditMode));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  // Save to localStorage helper
  const saveItem = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  };

  const updateSiteMetadata = (metadata: Partial<SiteMetadata>) => {
    setSiteMetadata((prev) => {
      const updated = { ...prev, ...metadata };
      saveItem('wp_meta', updated);
      return updated;
    });
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id'>) => {
    setAnnouncements((prev) => {
      const newAnn: Announcement = {
        ...ann,
        id: `ann-${Date.now()}`,
      };
      const updated = [newAnn, ...prev];
      saveItem('wp_announcements', updated);
      return updated;
    });
  };

  const updateAnnouncement = (id: string, partial: Partial<Announcement>) => {
    setAnnouncements((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_announcements', updated);
      return updated;
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_announcements', updated);
      return updated;
    });
  };

  const addBoardMember = (member: Omit<BoardMember, 'id'>) => {
    setBoardMembers((prev) => {
      const newMember: BoardMember = {
        ...member,
        id: `bm-${Date.now()}`,
      };
      const updated = [...prev, newMember];
      saveItem('wp_board_members', updated);
      return updated;
    });
  };

  const updateBoardMember = (id: string, partial: Partial<BoardMember>) => {
    setBoardMembers((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_board_members', updated);
      return updated;
    });
  };

  const deleteBoardMember = (id: string) => {
    setBoardMembers((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_board_members', updated);
      return updated;
    });
  };

  const addCommittee = (committee: Omit<Committee, 'id'>) => {
    setCommittees((prev) => {
      const newCommittee: Committee = {
        ...committee,
        id: `cm-${Date.now()}`,
      };
      const updated = [...prev, newCommittee];
      saveItem('wp_committees', updated);
      return updated;
    });
  };

  const updateCommittee = (id: string, partial: Partial<Committee>) => {
    setCommittees((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_committees', updated);
      return updated;
    });
  };

  const deleteCommittee = (id: string) => {
    setCommittees((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_committees', updated);
      return updated;
    });
  };

  const addDocument = (doc: Omit<DocumentItem, 'id'>) => {
    setDocuments((prev) => {
      const newDoc: DocumentItem = {
        ...doc,
        id: `doc-${Date.now()}`,
      };
      const updated = [...prev, newDoc];
      saveItem('wp_documents', updated);
      return updated;
    });
  };

  const updateDocument = (id: string, partial: Partial<DocumentItem>) => {
    setDocuments((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_documents', updated);
      return updated;
    });
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_documents', updated);
      return updated;
    });
  };

  const addEvent = (evt: Omit<CalendarEvent, 'id'>) => {
    setEvents((prev) => {
      const newEvt: CalendarEvent = {
        ...evt,
        id: `evt-${Date.now()}`,
      };
      const updated = [...prev, newEvt];
      saveItem('wp_events', updated);
      return updated;
    });
  };

  const updateEvent = (id: string, partial: Partial<CalendarEvent>) => {
    setEvents((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_events', updated);
      return updated;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_events', updated);
      return updated;
    });
  };

  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    setFaqs((prev) => {
      const newFaq: FaqItem = {
        ...faq,
        id: `faq-${Date.now()}`,
      };
      const updated = [...prev, newFaq];
      saveItem('wp_faqs', updated);
      return updated;
    });
  };

  const updateFaq = (id: string, partial: Partial<FaqItem>) => {
    setFaqs((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_faqs', updated);
      return updated;
    });
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_faqs', updated);
      return updated;
    });
  };

  const updateCommunityPhoto = (id: string, url: string, title: string) => {
    setCommunityPhotos((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, url, title } : item));
      saveItem('wp_photos', updated);
      return updated;
    });
  };

  const handleSetIsEditMode = (val: boolean) => {
    setIsEditMode(val);
    saveItem('wp_edit_mode', val);
  };

  const resetAllToDefault = () => {
    if (confirm('Are you sure you want to reset all modifications back to default? This will clear all edits.')) {
      setSiteMetadata(defaultMetadata);
      setAnnouncements(defaultAnnouncements);
      setBoardMembers(defaultBoardMembers);
      setCommittees(defaultCommittees);
      setDocuments(defaultDocuments);
      setEvents(defaultEventsCopy);
      setFaqs(defaultFaqs);
      setCommunityPhotos(defaultPhotos);
      setIsEditMode(false);

      localStorage.removeItem('wp_meta');
      localStorage.removeItem('wp_announcements');
      localStorage.removeItem('wp_board_members');
      localStorage.removeItem('wp_committees');
      localStorage.removeItem('wp_documents');
      localStorage.removeItem('wp_events');
      localStorage.removeItem('wp_faqs');
      localStorage.removeItem('wp_photos');
      localStorage.removeItem('wp_edit_mode');
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteMetadata,
        updateSiteMetadata,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        boardMembers,
        addBoardMember,
        updateBoardMember,
        deleteBoardMember,
        committees,
        addCommittee,
        updateCommittee,
        deleteCommittee,
        documents,
        addDocument,
        updateDocument,
        deleteDocument,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        communityPhotos,
        updateCommunityPhoto,
        isEditMode,
        setIsEditMode: handleSetIsEditMode,
        resetAllToDefault,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
