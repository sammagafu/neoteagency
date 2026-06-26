import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "neotelabs.db");

type GlobalDb = typeof globalThis & {
  __neotelabsDb?: Database.Database;
};

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS case_studies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      client TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      gradient TEXT NOT NULL DEFAULT 'from-black to-zinc-900',
      year TEXT NOT NULL,
      challenge TEXT NOT NULL,
      approach TEXT NOT NULL,
      results TEXT NOT NULL DEFAULT '[]',
      outcomes TEXT NOT NULL DEFAULT '[]',
      services TEXT NOT NULL DEFAULT '[]',
      gallery TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS career_positions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      type TEXT NOT NULL,
      location TEXT NOT NULL,
      summary TEXT NOT NULL,
      responsibilities TEXT NOT NULL DEFAULT '[]',
      requirements TEXT NOT NULL DEFAULT '[]',
      published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS client_logos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export function getDb() {
  const globalDb = globalThis as GlobalDb;

  if (!globalDb.__neotelabsDb) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    initSchema(db);
    globalDb.__neotelabsDb = db;
  }

  return globalDb.__neotelabsDb;
}

export function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value) as T[];
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
