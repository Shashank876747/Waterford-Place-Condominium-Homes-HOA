import React, { createContext, useContext, useState, useEffect } from 'react';
import { BoardMember, Committee, Announcement, DocumentItem, CalendarEvent, FaqItem, CommunityLink, ResidentUser } from '../types';

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
  clearAllAnnouncements: () => void;
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
  clearAllDocuments: () => void;
  events: CalendarEvent[];
  addEvent: (evt: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, evt: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  communityPhotos: PhotoItem[];
  addCommunityPhoto: (photo: Omit<PhotoItem, 'id'>) => void;
  updateCommunityPhoto: (id: string, url: string, title: string) => void;
  deleteCommunityPhoto: (id: string) => void;
  communityLinks: CommunityLink[];
  addCommunityLink: (link: Omit<CommunityLink, 'id'>) => void;
  updateCommunityLink: (id: string, partial: Partial<CommunityLink>) => void;
  deleteCommunityLink: (id: string) => void;
  registeredUsers: ResidentUser[];
  addRegisteredUser: (user: Omit<ResidentUser, 'id' | 'registeredAt'>) => void;
  deleteRegisteredUser: (id: string) => void;
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
  welcomeTitle: 'Welcome to our Community Portal',
  welcomeText: 'Welcome to our official resident portal. Register below or access administrative settings in the Edit Site dashboard.',
  address: 'Smyrna, GA 30080',
  facebookUrl: '',
  facebookText: '',
  emailListTitle: '',
  emailListText: '',
  managementName: '',
  managementAddress: '',
  managementPhone: '',
  managementFax: '',
  managementEmail: '',
  managementHours: '',
  managementEmergency: '',
};

const defaultPhotos: PhotoItem[] = [];

const defaultLinks: CommunityLink[] = [];

const defaultAnnouncements: Announcement[] = [];

const defaultEventsCopy: CalendarEvent[] = [];

const defaultBoardMembers: BoardMember[] = [];

const defaultCommittees: Committee[] = [];

const defaultFaqs: FaqItem[] = [];

const defaultDocuments: DocumentItem[] = [];

const defaultRegisteredUsers: ResidentUser[] = [
  {
    id: 'usr-default-1',
    name: 'Arthur Pendelton',
    unitNo: 'B-204',
    email: 'arthur.p@example.com',
    phone: '555-0192',
    password: 'demo123',
    registeredAt: '2026-01-15'
  },
  {
    id: 'usr-default-2',
    name: 'Clara Jenkins',
    unitNo: 'A-102',
    email: 'clara.j@example.com',
    phone: '555-0143',
    password: 'password123',
    registeredAt: '2026-03-22'
  }
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
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>(defaultLinks);
  const [registeredUsers, setRegisteredUsers] = useState<ResidentUser[]>(defaultRegisteredUsers);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const isCleaned = localStorage.getItem('wp_data_cleaned_v2');
      if (isCleaned !== 'true') {
        localStorage.removeItem('wp_meta');
        localStorage.removeItem('wp_announcements');
        localStorage.removeItem('wp_board_members');
        localStorage.removeItem('wp_committees');
        localStorage.removeItem('wp_documents');
        localStorage.removeItem('wp_events');
        localStorage.removeItem('wp_faqs');
        localStorage.removeItem('wp_photos');
        localStorage.removeItem('wp_links');
        localStorage.removeItem('wp_registered_users');
        localStorage.setItem('wp_data_cleaned_v2', 'true');
        return; // Leave as empty arrays
      }

      const savedMeta = localStorage.getItem('wp_meta');
      if (savedMeta) setSiteMetadata(JSON.parse(savedMeta));

      const savedUsers = localStorage.getItem('wp_registered_users');
      if (savedUsers) {
        setRegisteredUsers(JSON.parse(savedUsers));
      } else {
        localStorage.setItem('wp_registered_users', JSON.stringify(defaultRegisteredUsers));
      }

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

      const savedLinks = localStorage.getItem('wp_links');
      if (savedLinks) setCommunityLinks(JSON.parse(savedLinks));

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

  const clearAllAnnouncements = () => {
    setAnnouncements([]);
    saveItem('wp_announcements', []);
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

  const clearAllDocuments = () => {
    setDocuments([]);
    saveItem('wp_documents', []);
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

  const addCommunityPhoto = (photo: Omit<PhotoItem, 'id'>) => {
    setCommunityPhotos((prev) => {
      const newPhoto: PhotoItem = {
        ...photo,
        id: `p-${Date.now()}`,
      };
      const updated = [...prev, newPhoto];
      saveItem('wp_photos', updated);
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

  const deleteCommunityPhoto = (id: string) => {
    setCommunityPhotos((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_photos', updated);
      return updated;
    });
  };

  const addCommunityLink = (link: Omit<CommunityLink, 'id'>) => {
    setCommunityLinks((prev) => {
      const newLink: CommunityLink = {
        ...link,
        id: `link-${Date.now()}`,
      };
      const updated = [...prev, newLink];
      saveItem('wp_links', updated);
      return updated;
    });
  };

  const updateCommunityLink = (id: string, partial: Partial<CommunityLink>) => {
    setCommunityLinks((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveItem('wp_links', updated);
      return updated;
    });
  };

  const deleteCommunityLink = (id: string) => {
    setCommunityLinks((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItem('wp_links', updated);
      return updated;
    });
  };

  const addRegisteredUser = (user: Omit<ResidentUser, 'id' | 'registeredAt'>) => {
    setRegisteredUsers((prev) => {
      const newUser: ResidentUser = {
        ...user,
        id: `usr-${Date.now()}`,
        registeredAt: new Date().toISOString().split('T')[0],
      };
      const updated = [...prev, newUser];
      saveItem('wp_registered_users', updated);
      return updated;
    });
  };

  const deleteRegisteredUser = (id: string) => {
    setRegisteredUsers((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      saveItem('wp_registered_users', updated);
      return updated;
    });
  };

  const handleSetIsEditMode = (val: boolean) => {
    setIsEditMode(val);
    saveItem('wp_edit_mode', val);
  };

  const resetAllToDefault = () => {
    if (confirm('Are you sure you want to reset all site data to a clean template? This will wipe all custom site content.')) {
      setSiteMetadata(defaultMetadata);
      setAnnouncements(defaultAnnouncements);
      setBoardMembers(defaultBoardMembers);
      setCommittees(defaultCommittees);
      setDocuments(defaultDocuments);
      setEvents(defaultEventsCopy);
      setFaqs(defaultFaqs);
      setCommunityPhotos(defaultPhotos);
      setCommunityLinks(defaultLinks);
      setRegisteredUsers(defaultRegisteredUsers);
      setIsEditMode(false);

      localStorage.removeItem('wp_meta');
      localStorage.removeItem('wp_announcements');
      localStorage.removeItem('wp_board_members');
      localStorage.removeItem('wp_committees');
      localStorage.removeItem('wp_documents');
      localStorage.removeItem('wp_events');
      localStorage.removeItem('wp_faqs');
      localStorage.removeItem('wp_photos');
      localStorage.removeItem('wp_links');
      localStorage.removeItem('wp_registered_users');
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
        clearAllAnnouncements,
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
        clearAllDocuments,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        communityPhotos,
        addCommunityPhoto,
        updateCommunityPhoto,
        deleteCommunityPhoto,
        communityLinks,
        addCommunityLink,
        updateCommunityLink,
        deleteCommunityLink,
        registeredUsers,
        addRegisteredUser,
        deleteRegisteredUser,
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
