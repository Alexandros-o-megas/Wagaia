export type Status = "draft" | "review" | "published" | "archived";

export interface Settings {
  name: string;
  tagline: string;
  instagram: string;
  description: string;
  aboutShort: string;
  aboutLong: string;
  email: string;
  phone: string;
  address: string;
}

export interface RecordBase {
  id: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign extends RecordBase {
  title: string;
  summary: string;
  body: string;
  image: string;
  featured: boolean;
}

export interface Artwork extends RecordBase {
  title: string;
  medium: string;
  author: string;
  caption: string;
  image: string;
}

export interface Story extends RecordBase {
  title: string;
  kind: "historia" | "wagaias";
  author: string;
  body: string;
}

export interface Article extends RecordBase {
  title: string;
  excerpt: string;
  body: string;
}

export interface InspiringWoman extends RecordBase {
  name: string;
  attribution: string;
  body: string;
}

export interface Resource extends RecordBase {
  title: string;
  theme: string;
  format: "pdf" | "artigo" | "podcast" | "video" | "dica";
  summary: string;
  url: string;
}

export interface Course extends RecordBase {
  title: string;
  summary: string;
  format: string;
}

export interface Product extends RecordBase {
  title: string;
  summary: string;
  priceNote: string;
}

export interface SupportService extends RecordBase {
  name: string;
  province: string;
  supportType: string;
  phone: string;
  whatsapp: string;
  hours: string;
  cost: string;
  lastVerified: string;
}

export interface DonationMethod extends RecordBase {
  kind: "mpesa" | "emola" | "mkesh" | "bank";
  label: string;
  details: string;
}

export interface TeamMember extends RecordBase {
  name: string;
  role: string;
  bio: string;
  order: number;
}

export interface Partner extends RecordBase {
  name: string;
  kind: string;
  note: string;
}

export interface ImpactMetric extends RecordBase {
  label: string;
  value: string;
  note: string;
}

export interface Submission {
  id: string;
  createdAt: string;
  story: string;
  purpose: string;
  contactConsent: boolean;
  publishConsent: boolean;
  contactHint: string;
  read: boolean;
}

export type CollectionName =
  | "pages"
  | "team"
  | "partners"
  | "impact_metrics"
  | "campaigns"
  | "artworks"
  | "stories"
  | "articles"
  | "inspiring_women"
  | "resources"
  | "courses"
  | "products"
  | "support_services"
  | "donation_methods";

const TOKEN_KEY = "wagaia_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Pedido falhou.");
  }
  return data as T;
}

export function publicGet<T>(collection: CollectionName) {
  return request<T[]>(`/api/public/${collection}`);
}

export function publicSettings() {
  return request<Settings>("/api/public/settings");
}

export function submitStory(payload: {
  story: string;
  purpose: string;
  contactConsent: boolean;
  publishConsent: boolean;
  contactHint: string;
}) {
  return request<{ ok: boolean; id: string; message: string }>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(email: string, password: string) {
  return request<{ token: string; name: string; email: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

export function adminGet<T>(collection: CollectionName) {
  return request<T[]>(`/api/admin/${collection}`, { headers: authHeaders() });
}

export function adminCreate<T>(collection: CollectionName, payload: unknown) {
  return request<T>(`/api/admin/${collection}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminUpdate<T>(collection: CollectionName, id: string, payload: unknown) {
  return request<T>(`/api/admin/${collection}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminArchive(collection: CollectionName, id: string) {
  return request(`/api/admin/${collection}/${id}/archive`, {
    method: "POST",
    headers: authHeaders(),
  });
}

export function adminSettings() {
  return request<Settings>("/api/admin/settings", { headers: authHeaders() });
}

export function adminSaveSettings(payload: Partial<Settings>) {
  return request<Settings>("/api/admin/settings", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export function adminInbox() {
  return request<Submission[]>("/api/admin/inbox", { headers: authHeaders() });
}

export function adminMarkRead(id: string) {
  return request<Submission>(`/api/admin/inbox/${id}/read`, {
    method: "POST",
    headers: authHeaders(),
  });
}

export function adminMe() {
  return request<{ email: string; name: string }>("/api/admin/me", {
    headers: authHeaders(),
  });
}

export function adminChangePassword(payload: {
  currentPassword: string;
  nextPassword: string;
  confirmPassword: string;
}) {
  return request<{ ok: boolean; message: string }>("/api/admin/password", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}
