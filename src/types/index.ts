export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  group?: string;
  status: 'active' | 'blocked' | 'invalid';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  message: string;
  image?: string;
  contacts: Contact[];
  scheduledDate?: Date;
  intervalBetweenMessages: number; // em segundos
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused' | 'failed';
  createdAt: Date;
  sentCount: number;
  totalCount: number;
  failedCount: number;
}

export interface DispatchLog {
  id: string;
  campaignId: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  sentAt?: Date;
  errorMessage?: string;
}