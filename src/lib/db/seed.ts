import { careerPositions, clients, portfolioItems, teamMembers } from "@/lib/site-data";
import { getDb } from "@/lib/db";

let seeded = false;
let clientsSeeded = false;

const defaultClientLogos = [
  { name: clients[0] ?? "Client 1", logo: "/assets/clients/logo-1.png" },
  { name: clients[1] ?? "Client 2", logo: "/assets/clients/logo-2.png" },
  { name: clients[2] ?? "Client 3", logo: "/assets/clients/logo-3.png" },
  { name: clients[3] ?? "Client 4", logo: "/assets/clients/logo-4.png" },
  { name: clients[4] ?? "Client 5", logo: "/assets/clients/logo-5.png" },
  { name: clients[5] ?? "Client 6", logo: "/assets/clients/logo-6.png" },
  { name: "Client 7", logo: "/assets/clients/logo-7.png" },
  { name: "Client 8", logo: "/assets/clients/logo-8.png" },
];

export function seedClientsIfEmpty() {
  if (clientsSeeded) return;

  const db = getDb();
  const count = (
    db.prepare("SELECT COUNT(*) as count FROM client_logos").get() as {
      count: number;
    }
  ).count;

  if (count > 0) {
    clientsSeeded = true;
    return;
  }

  const insertClient = db.prepare(`
    INSERT INTO client_logos (name, logo, published, sort_order)
    VALUES (?, ?, 1, ?)
  `);

  defaultClientLogos.forEach((client, index) => {
    insertClient.run(client.name, client.logo, index);
  });

  clientsSeeded = true;
}

export function seedIfEmpty() {
  if (seeded) return;

  const db = getDb();
  const caseCount = (
    db.prepare("SELECT COUNT(*) as count FROM case_studies").get() as {
      count: number;
    }
  ).count;

  if (caseCount > 0) {
    seeded = true;
    return;
  }

  const insertCase = db.prepare(`
    INSERT INTO case_studies (
      slug, client, description, category, image, gradient, year,
      challenge, approach, results, outcomes, services, gallery,
      featured, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  portfolioItems.forEach((item, index) => {
    insertCase.run(
      item.slug,
      item.client,
      item.description,
      item.category,
      item.image,
      item.gradient,
      item.year,
      item.challenge,
      item.approach,
      JSON.stringify(item.results),
      JSON.stringify(item.outcomes),
      JSON.stringify(item.services),
      JSON.stringify(item.gallery),
      item.slug === "safaya-gin" ? 1 : 0,
      index,
    );
  });

  const insertTeam = db.prepare(`
    INSERT INTO team_members (slug, name, role, department, bio, image, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  teamMembers.forEach((member, index) => {
    insertTeam.run(
      member.id,
      member.name,
      member.role,
      member.department,
      member.bio,
      member.image ?? null,
      index,
    );
  });

  const insertCareer = db.prepare(`
    INSERT INTO career_positions (
      slug, title, department, type, location, summary,
      responsibilities, requirements, published, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  careerPositions.forEach((position, index) => {
    insertCareer.run(
      position.id,
      position.title,
      position.department,
      position.type,
      position.location,
      position.summary,
      JSON.stringify(position.responsibilities),
      JSON.stringify(position.requirements),
      1,
      index,
    );
  });

  const insertClient = db.prepare(`
    INSERT INTO client_logos (name, logo, published, sort_order)
    VALUES (?, ?, 1, ?)
  `);

  defaultClientLogos.forEach((client, index) => {
    insertClient.run(client.name, client.logo, index);
  });

  clientsSeeded = true;
  seeded = true;
}
