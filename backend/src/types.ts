export type Status = "draft" | "review" | "published" | "archived";

export interface RecordBase {
  id: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  id: string;
  name: string;
  tagline: string;
  instagram: string;
  description: string;
  aboutShort: string;
  aboutLong: string;
  email: string;
  phone: string;
  address: string;
  privacyNote: string;
}

export interface PageDoc extends RecordBase {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
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

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
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

export interface Database {
  settings: Settings;
  pages: PageDoc[];
  team: TeamMember[];
  partners: Partner[];
  impact_metrics: ImpactMetric[];
  campaigns: Campaign[];
  artworks: Artwork[];
  stories: Story[];
  articles: Article[];
  inspiring_women: InspiringWoman[];
  resources: Resource[];
  courses: Course[];
  products: Product[];
  support_services: SupportService[];
  donation_methods: DonationMethod[];
  submissions: Submission[];
  admins: AdminUser[];
}
