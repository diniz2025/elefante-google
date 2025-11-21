import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  action?: () => void;
}

export enum ViewState {
  HOME = 'HOME',
  RESOURCES = 'RESOURCES',
  LOGIN = 'LOGIN',
  HELP = 'HELP'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum IntegrationType {
  GMAIL = 'GMAIL',
  DRIVE = 'DRIVE',
  CALENDAR = 'CALENDAR',
  CONTACTS = 'CONTACTS'
}

export interface GoogleEmail {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  read: boolean;
}

export interface GoogleFile {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'doc' | 'pdf';
  owner: string;
  modified: string;
}

export interface GoogleContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface GoogleEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  attendees: string[];
}