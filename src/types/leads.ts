// src/types/leads.ts
export type SubmitPayload = {
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  startDate?: string; // yyyy-mm-dd
  city?: string;
  goals?: string;
  consent?: boolean | string;
  website?: string; // honeypot (keep empty)
};

export type LeadRow = {
  timestamp?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  startDate?: string;
  city?: string;
  goals?: string;
  consent?: string;
  [k: string]: any;
};

export type LeadsResponse = {
  ok: boolean;
  rows?: LeadRow[];
  total?: number;
  page?: number;
  pageSize?: number;
  error?: string;
};
