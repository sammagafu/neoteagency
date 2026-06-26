import { getDb, parseJsonArray } from "@/lib/db";
import { seedClientsIfEmpty, seedIfEmpty } from "@/lib/db/seed";
import type {
  CareerInput,
  CareerRecord,
  CaseStudy,
  CaseStudyInput,
  ClientLogoInput,
  ClientLogoRecord,
  ProjectOutcome,
  TeamMemberInput,
  TeamMemberRecord,
} from "@/lib/db/types";

function mapCaseStudy(row: Record<string, unknown>): CaseStudy {
  return {
    id: row.id as number,
    slug: row.slug as string,
    client: row.client as string,
    description: row.description as string,
    category: row.category as string,
    image: row.image as string,
    gradient: row.gradient as string,
    year: row.year as string,
    challenge: row.challenge as string,
    approach: row.approach as string,
    results: parseJsonArray<string>(row.results as string),
    outcomes: parseJsonArray<ProjectOutcome>(row.outcomes as string),
    services: parseJsonArray<string>(row.services as string),
    gallery: parseJsonArray<string>(row.gallery as string),
    featured: Boolean(row.featured),
    sortOrder: row.sort_order as number,
  };
}

function mapTeamMember(row: Record<string, unknown>): TeamMemberRecord {
  return {
    id: row.id as number,
    slug: row.slug as string,
    name: row.name as string,
    role: row.role as string,
    department: row.department as string,
    bio: row.bio as string,
    image: (row.image as string | null) ?? null,
    sortOrder: row.sort_order as number,
  };
}

function mapCareer(row: Record<string, unknown>): CareerRecord {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    department: row.department as string,
    type: row.type as string,
    location: row.location as string,
    summary: row.summary as string,
    responsibilities: parseJsonArray<string>(row.responsibilities as string),
    requirements: parseJsonArray<string>(row.requirements as string),
    published: Boolean(row.published),
    sortOrder: row.sort_order as number,
  };
}

function mapClientLogo(row: Record<string, unknown>): ClientLogoRecord {
  return {
    id: row.id as number,
    name: row.name as string,
    logo: row.logo as string,
    published: Boolean(row.published),
    sortOrder: row.sort_order as number,
  };
}

// Case studies
export function getAllCaseStudies(): CaseStudy[] {
  seedIfEmpty();
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM case_studies ORDER BY sort_order ASC, id ASC")
    .all() as Record<string, unknown>[];
  return rows.map(mapCaseStudy);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM case_studies WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;
  return row ? mapCaseStudy(row) : undefined;
}

export function getCaseStudyById(id: number): CaseStudy | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM case_studies WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? mapCaseStudy(row) : undefined;
}

export function getFeaturedCaseStudy(): CaseStudy | undefined {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT * FROM case_studies WHERE featured = 1 ORDER BY sort_order ASC LIMIT 1",
    )
    .get() as Record<string, unknown> | undefined;
  if (row) return mapCaseStudy(row);
  return getAllCaseStudies()[0];
}

export function getAdjacentCaseStudies(slug: string) {
  const items = getAllCaseStudies();
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}

export function createCaseStudy(input: CaseStudyInput): CaseStudy {
  const db = getDb();
  if (input.featured) {
    db.prepare("UPDATE case_studies SET featured = 0").run();
  }
  const result = db
    .prepare(
      `INSERT INTO case_studies (
        slug, client, description, category, image, gradient, year,
        challenge, approach, results, outcomes, services, gallery,
        featured, sort_order, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    )
    .run(
      input.slug,
      input.client,
      input.description,
      input.category,
      input.image,
      input.gradient,
      input.year,
      input.challenge,
      input.approach,
      JSON.stringify(input.results),
      JSON.stringify(input.outcomes),
      JSON.stringify(input.services),
      JSON.stringify(input.gallery),
      input.featured ? 1 : 0,
      input.sortOrder,
    );
  return getCaseStudyById(Number(result.lastInsertRowid))!;
}

export function updateCaseStudy(
  id: number,
  input: Partial<CaseStudyInput>,
): CaseStudy | undefined {
  const existing = getCaseStudyById(id);
  if (!existing) return undefined;

  const db = getDb();
  if (input.featured) {
    db.prepare("UPDATE case_studies SET featured = 0").run();
  }

  const merged: CaseStudyInput = { ...existing, ...input };
  db.prepare(
    `UPDATE case_studies SET
      slug = ?, client = ?, description = ?, category = ?, image = ?,
      gradient = ?, year = ?, challenge = ?, approach = ?,
      results = ?, outcomes = ?, services = ?, gallery = ?,
      featured = ?, sort_order = ?, updated_at = datetime('now')
    WHERE id = ?`,
  ).run(
    merged.slug,
    merged.client,
    merged.description,
    merged.category,
    merged.image,
    merged.gradient,
    merged.year,
    merged.challenge,
    merged.approach,
    JSON.stringify(merged.results),
    JSON.stringify(merged.outcomes),
    JSON.stringify(merged.services),
    JSON.stringify(merged.gallery),
    merged.featured ? 1 : 0,
    merged.sortOrder,
    id,
  );

  return getCaseStudyById(id);
}

export function deleteCaseStudy(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM case_studies WHERE id = ?").run(id);
  return result.changes > 0;
}

// Team
export function getAllTeamMembers(): TeamMemberRecord[] {
  seedIfEmpty();
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM team_members ORDER BY sort_order ASC, id ASC")
    .all() as Record<string, unknown>[];
  return rows.map(mapTeamMember);
}

export function getTeamMemberById(id: number): TeamMemberRecord | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM team_members WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? mapTeamMember(row) : undefined;
}

export function createTeamMember(input: TeamMemberInput): TeamMemberRecord {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO team_members (slug, name, role, department, bio, image, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    )
    .run(
      input.slug,
      input.name,
      input.role,
      input.department,
      input.bio,
      input.image,
      input.sortOrder,
    );
  return getTeamMemberById(Number(result.lastInsertRowid))!;
}

export function updateTeamMember(
  id: number,
  input: Partial<TeamMemberInput>,
): TeamMemberRecord | undefined {
  const existing = getTeamMemberById(id);
  if (!existing) return undefined;

  const merged: TeamMemberInput = { ...existing, ...input };
  const db = getDb();
  db.prepare(
    `UPDATE team_members SET
      slug = ?, name = ?, role = ?, department = ?, bio = ?, image = ?,
      sort_order = ?, updated_at = datetime('now')
    WHERE id = ?`,
  ).run(
    merged.slug,
    merged.name,
    merged.role,
    merged.department,
    merged.bio,
    merged.image,
    merged.sortOrder,
    id,
  );
  return getTeamMemberById(id);
}

export function deleteTeamMember(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM team_members WHERE id = ?").run(id);
  return result.changes > 0;
}

// Careers
export function getAllCareers(publishedOnly = false): CareerRecord[] {
  seedIfEmpty();
  const db = getDb();
  const query = publishedOnly
    ? "SELECT * FROM career_positions WHERE published = 1 ORDER BY sort_order ASC, id ASC"
    : "SELECT * FROM career_positions ORDER BY sort_order ASC, id ASC";
  const rows = db.prepare(query).all() as Record<string, unknown>[];
  return rows.map(mapCareer);
}

export function getCareerById(id: number): CareerRecord | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM career_positions WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? mapCareer(row) : undefined;
}

export function createCareer(input: CareerInput): CareerRecord {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO career_positions (
        slug, title, department, type, location, summary,
        responsibilities, requirements, published, sort_order, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    )
    .run(
      input.slug,
      input.title,
      input.department,
      input.type,
      input.location,
      input.summary,
      JSON.stringify(input.responsibilities),
      JSON.stringify(input.requirements),
      input.published ? 1 : 0,
      input.sortOrder,
    );
  return getCareerById(Number(result.lastInsertRowid))!;
}

export function updateCareer(
  id: number,
  input: Partial<CareerInput>,
): CareerRecord | undefined {
  const existing = getCareerById(id);
  if (!existing) return undefined;

  const merged: CareerInput = { ...existing, ...input };
  const db = getDb();
  db.prepare(
    `UPDATE career_positions SET
      slug = ?, title = ?, department = ?, type = ?, location = ?, summary = ?,
      responsibilities = ?, requirements = ?, published = ?, sort_order = ?,
      updated_at = datetime('now')
    WHERE id = ?`,
  ).run(
    merged.slug,
    merged.title,
    merged.department,
    merged.type,
    merged.location,
    merged.summary,
    JSON.stringify(merged.responsibilities),
    JSON.stringify(merged.requirements),
    merged.published ? 1 : 0,
    merged.sortOrder,
    id,
  );
  return getCareerById(id);
}

export function deleteCareer(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM career_positions WHERE id = ?").run(id);
  return result.changes > 0;
}

// Client logos
export function getAllClientLogos(publishedOnly = false): ClientLogoRecord[] {
  seedIfEmpty();
  seedClientsIfEmpty();
  const db = getDb();
  const query = publishedOnly
    ? "SELECT * FROM client_logos WHERE published = 1 ORDER BY sort_order ASC, id ASC"
    : "SELECT * FROM client_logos ORDER BY sort_order ASC, id ASC";
  const rows = db.prepare(query).all() as Record<string, unknown>[];
  return rows.map(mapClientLogo);
}

export function getClientLogoById(id: number): ClientLogoRecord | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM client_logos WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? mapClientLogo(row) : undefined;
}

export function createClientLogo(input: ClientLogoInput): ClientLogoRecord {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO client_logos (name, logo, published, sort_order, updated_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
    )
    .run(input.name, input.logo, input.published ? 1 : 0, input.sortOrder);
  return getClientLogoById(Number(result.lastInsertRowid))!;
}

export function updateClientLogo(
  id: number,
  input: Partial<ClientLogoInput>,
): ClientLogoRecord | undefined {
  const existing = getClientLogoById(id);
  if (!existing) return undefined;

  const merged: ClientLogoInput = { ...existing, ...input };
  const db = getDb();
  db.prepare(
    `UPDATE client_logos SET
      name = ?, logo = ?, published = ?, sort_order = ?, updated_at = datetime('now')
    WHERE id = ?`,
  ).run(
    merged.name,
    merged.logo,
    merged.published ? 1 : 0,
    merged.sortOrder,
    id,
  );
  return getClientLogoById(id);
}

export function deleteClientLogo(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM client_logos WHERE id = ?").run(id);
  return result.changes > 0;
}

export function getContentCounts() {
  seedIfEmpty();
  const db = getDb();
  const caseStudies = (
    db.prepare("SELECT COUNT(*) as count FROM case_studies").get() as {
      count: number;
    }
  ).count;
  const team = (
    db.prepare("SELECT COUNT(*) as count FROM team_members").get() as {
      count: number;
    }
  ).count;
  const careers = (
    db.prepare("SELECT COUNT(*) as count FROM career_positions").get() as {
      count: number;
    }
  ).count;
  const clients = (
    db.prepare("SELECT COUNT(*) as count FROM client_logos").get() as {
      count: number;
    }
  ).count;
  return { caseStudies, team, careers, clients };
}
