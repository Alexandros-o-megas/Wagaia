import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { CollectionName, Database, RecordBase, Status } from "./types.js";
import { seedDatabase } from "./seed.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");
const dbPath = join(dataDir, "db.json");

let db: Database;

function persist() {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
}

export function loadDb() {
  if (existsSync(dbPath)) {
    db = JSON.parse(readFileSync(dbPath, "utf8")) as Database;
    return;
  }
  db = seedDatabase();
  persist();
}

export function getDb() {
  return db;
}

export function hashPassword(password: string) {
  return createHash("sha256").update(`wagaia:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string) {
  const next = hashPassword(password);
  try {
    return timingSafeEqual(Buffer.from(next), Buffer.from(hash));
  } catch {
    return false;
  }
}

export function nid(prefix = "id") {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

export function now() {
  return new Date().toISOString();
}

export function published<T extends RecordBase>(rows: T[]) {
  return rows.filter((row) => row.status === "published");
}

export function getCollection<K extends CollectionName>(name: K): Database[K] {
  return db[name];
}

export function saveSettings(patch: Partial<Database["settings"]>) {
  db.settings = { ...db.settings, ...patch };
  persist();
  return db.settings;
}

export function createRecord<K extends CollectionName>(
  name: K,
  payload: Omit<Database[K][number], "id" | "createdAt" | "updatedAt">,
) {
  const row = {
    ...(payload as object),
    id: nid(name),
    createdAt: now(),
    updatedAt: now(),
  } as Database[K][number];
  (db[name] as unknown as RecordBase[]).unshift(row as unknown as RecordBase);
  persist();
  return row;
}

export function updateRecord<K extends CollectionName>(
  name: K,
  id: string,
  payload: Partial<Database[K][number]>,
) {
  const list = db[name] as unknown as Array<RecordBase & { id: string }>;
  const idx = list.findIndex((row) => row.id === id);
  if (idx < 0) return null;
  const next = {
    ...list[idx],
    ...payload,
    id,
    updatedAt: now(),
  };
  list[idx] = next;
  persist();
  return next;
}

export function archiveRecord<K extends CollectionName>(name: K, id: string) {
  return updateRecord(name, id, { status: "archived" as Status } as Partial<Database[K][number]>);
}

export function addSubmission(input: {
  story: string;
  purpose: string;
  contactConsent: boolean;
  publishConsent: boolean;
  contactHint: string;
}) {
  const row = {
    id: nid("sub"),
    createdAt: now(),
    story: input.story,
    purpose: input.purpose,
    contactConsent: input.contactConsent,
    publishConsent: input.publishConsent,
    contactHint: input.contactHint,
    read: false,
  };
  db.submissions.unshift(row);
  persist();
  return { id: row.id, createdAt: row.createdAt };
}

export function markSubmissionRead(id: string) {
  const row = db.submissions.find((item) => item.id === id);
  if (!row) return null;
  row.read = true;
  persist();
  return row;
}
