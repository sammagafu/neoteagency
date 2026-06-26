import { careerPositions, portfolioItems, teamMembers } from "@/lib/site-data";
import { getDb } from "@/lib/db";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function seed() {
  const db = getDb();

  const caseCount = (
    db.prepare("SELECT COUNT(*) as count FROM case_studies").get() as {
      count: number;
    }
  ).count;

  if (caseCount > 0) {
    console.log("Database already seeded. Skipping.");
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

  console.log(
    `Seeded ${portfolioItems.length} case studies, ${teamMembers.length} team members, ${careerPositions.length} careers.`,
  );
}

seed();
