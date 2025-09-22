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
  };
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

const mockStatsSummary: StatsSummaryDTO = {
  visits: 1500,
  clicks: 420,
  leads: 75,
  revenue: { amount: 3500, currency: "USD" },
  periodStart: "2025-09-01",
  periodEnd: "2025-09-07",
  trend: {
    visits: [200, 250, 180, 220, 300, 200, 150],
    clicks: [50, 60, 55, 70, 80, 60, 45],
    labels: [
      "2025-09-01",
      "2025-09-02",
      "2025-09-03",
      "2025-09-04",
      "2025-09-05",
      "2025-09-06",
      "2025-09-07",
    ],
  },
};

const mockSources: SourceBreakdown[] = [
  { source: "Google", count: 700, percent: 46.6 },
  { source: "Facebook", count: 500, percent: 33.3 },
  { source: "LinkedIn", count: 300, percent: 20.0 },
];

const mockLeads: LeadDTO[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+123456789",
    message: "Interested in your service",
    source: "Google",
    createdAt: "2025-09-01T10:15:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    source: "Facebook",
    createdAt: "2025-09-02T14:30:00Z",
  },
  {
    id: "3",
    phone: "+987654321",
    message: "Call me back please",
    source: "LinkedIn",
    createdAt: "2025-09-03T09:45:00Z",
  },
];

// -------------------------
// Mock Analytics Service
// -------------------------
class AnalyticsService {
  private statsSummary: StatsSummaryDTO;
  private sources: SourceBreakdown[];
  private leads: LeadDTO[];

  constructor() {
    this.statsSummary = mockStatsSummary;
    this.sources = mockSources;
    this.leads = mockLeads;
  }

  getStatsSummary(profileId: string, start?: string, end?: string): StatsSummaryDTO {
    return this.statsSummary;
  }

  getStatsTrends(
    profileId: string,
    start?: string,
    end?: string,
    granularity = "day"
  ): StatsSummaryDTO["trend"] {
    return this.statsSummary.trend;
  }

  getSources(profileId: string, start?: string, end?: string): SourceBreakdown[] {
    return this.sources;
  }

  getLeads(profileId: string, start?: string, end?: string, limit = 20): LeadDTO[] {
    return this.leads.slice(0, limit);
  }
}

export const analyticsService = new AnalyticsService();
