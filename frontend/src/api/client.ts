const API_BASE = import.meta.env.VITE_API_URL || '';

const AUTH_TOKEN_KEY = 'truestory_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

export const api = {
  events: {
    list: () => request<Event[]>(`/api/events`),
    proposed: () => request<Event[]>(`/api/events/proposed`),
    get: (id: string) => request<Event>(`/api/events/${id}`),
    getBySlug: (slug: string) => request<Event>(`/api/events/by-slug/${encodeURIComponent(slug)}`),
    create: (body: { title: string; slug: string; description?: string }) =>
      request<Event>('/api/events', { method: 'POST', body: JSON.stringify(body) }),
    confirm: (id: string) =>
      request<{ event: Event; count: number }>(`/api/events/${id}/confirm`, { method: 'POST' }),
    confirmationCount: (id: string) => request<{ count: number }>(`/api/events/${id}/confirmations`),
    hasConfirmed: (id: string) => request<{ confirmed: boolean }>(`/api/events/${id}/confirmations/me`),
  },
  claims: {
    list: () => request<Claim[]>(`/api/claims`),
    get: (id: string) => request<Claim>(`/api/claims/${id}`),
    byEvent: (eventId: string) => request<Claim[]>(`/api/claims/by-event/${eventId}`),
    create: (body: { eventId: string; authorId: string; content: string; status?: string }) =>
      request<Claim>('/api/claims', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: { status?: string }) =>
      request<Claim>(`/api/claims/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  evidence: {
    byClaim: (claimId: string) => request<Evidence[]>(`/api/evidence/by-claim/${claimId}`),
    create: (body: { claimId: string; addedById: string; type: string; urlOrContent: string; description?: string }) =>
      request<Evidence>('/api/evidence', { method: 'POST', body: JSON.stringify(body) }),
  },
  factChecking: {
    byClaim: (claimId: string) => request<FactCheck[]>(`/api/fact-checking/by-claim/${claimId}`),
    create: (body: { claimId: string; userId: string; type: string; content: string }) =>
      request<FactCheck>('/api/fact-checking', { method: 'POST', body: JSON.stringify(body) }),
  },
  predictions: {
    byClaim: (claimId: string) => request<Prediction[]>(`/api/predictions/by-claim/${claimId}`),
    aggregate: (claimId: string) => request<{ avg: number; count: number }>(`/api/predictions/by-claim/${claimId}/aggregate`),
    create: (body: { claimId: string; userId: string; probability: number }) =>
      request<Prediction>('/api/predictions', { method: 'POST', body: JSON.stringify(body) }),
  },
  users: {
    list: () => request<User[]>(`/api/users`),
    get: (id: string) => request<User>(`/api/users/${id}`),
    create: (body: { displayName: string; email?: string }) =>
      request<User>('/api/users', { method: 'POST', body: JSON.stringify(body) }),
  },
  auth: {
    me: () => request<User>('/api/auth/me'),
    providers: () => request<{ google: boolean; facebook: boolean }>('/api/auth/providers'),
    /** Dev only: get JWT for an existing user (only works when backend is in development). */
    devLogin: (userId: string) =>
      request<{ access_token: string; user: User }>('/api/auth/dev-login', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      }),
  },
};

export type EventStatus = 'unverified' | 'confirmed';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: EventStatus;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  reputationScore: number;
  verifiedReporter?: boolean;
  createdAt: string;
}

export type ClaimStatus = 'unverified' | 'evidence_provided' | 'multiple_confirmations' | 'confirmed';

export interface Claim {
  id: string;
  eventId: string;
  authorId: string;
  content: string;
  status: ClaimStatus;
  createdAt: string;
  author?: User;
  event?: Event;
  evidence?: Evidence[];
  factChecks?: FactCheck[];
  predictions?: Prediction[];
}

export type EvidenceType = 'document' | 'video' | 'link' | 'statement' | 'photo';

export interface Evidence {
  id: string;
  claimId: string;
  addedById: string;
  type: EvidenceType;
  urlOrContent: string;
  description: string | null;
  createdAt: string;
}

export type FactCheckType = 'challenge' | 'confirm' | 'counter_evidence' | 'context';

export interface FactCheck {
  id: string;
  claimId: string;
  userId: string;
  type: FactCheckType;
  content: string;
  createdAt: string;
  user?: User;
}

export interface Prediction {
  id: string;
  claimId: string;
  userId: string;
  probability: number;
  createdAt: string;
  user?: User;
}
