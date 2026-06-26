export type ProjectOutcome = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: number;
  slug: string;
  client: string;
  description: string;
  category: string;
  image: string;
  gradient: string;
  year: string;
  challenge: string;
  approach: string;
  results: string[];
  outcomes: ProjectOutcome[];
  services: string[];
  gallery: string[];
  featured: boolean;
  sortOrder: number;
};

export type TeamMemberRecord = {
  id: number;
  slug: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string | null;
  sortOrder: number;
};

export type CareerRecord = {
  id: number;
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  published: boolean;
  sortOrder: number;
};

export type CaseStudyInput = Omit<CaseStudy, "id">;
export type TeamMemberInput = Omit<TeamMemberRecord, "id">;
export type CareerInput = Omit<CareerRecord, "id">;

export type ClientLogoRecord = {
  id: number;
  name: string;
  logo: string;
  published: boolean;
  sortOrder: number;
};

export type ClientLogoInput = Omit<ClientLogoRecord, "id">;
