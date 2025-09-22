export type ID = string;

export interface StatsSummaryDTO {
  visits: number;
  clicks: number;
  leads: number;
  revenue: { amount: number; currency: string } | null;
  periodStart: string;
  periodEnd: string;
  trend?: {
    visits: number[];
    clicks: number[];
    labels: string[]; // dates
  }
}

export interface SourceBreakdown {
  source: string;
  count: number;
  percent: number;
}

export interface LeadDTO {
  id: ID;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  createdAt: string;
}
