import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import {
  addSubmission,
  archiveRecord,
  createRecord,
  getCollection,
  getDb,
  loadDb,
  markSubmissionRead,
  saveSettings,
  updateRecord,
  verifyPassword,
} from "./store.js";
import type { CollectionName } from "./types.js";

const PORT = Number(process.env.PORT || 3001);
const JWT_SECRET = process.env.JWT_SECRET || "wagaia-dev-secret";

const COLLECTIONS: CollectionName[] = [
  "pages",
  "team",
  "partners",
  "impact_metrics",
  "campaigns",
  "artworks",
  "stories",
  "articles",
  "inspiring_women",
  "resources",
  "courses",
  "products",
  "support_services",
  "donation_methods",
];

loadDb();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

function isCollection(value: string): value is CollectionName {
  return COLLECTIONS.includes(value as CollectionName);
}

function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    (req as express.Request & { adminEmail?: string }).adminEmail = payload.email;
    next();
  } catch {
    res.status(401).json({ error: "Sessão inválida. Inicie sessão novamente." });
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, name: "WAGAIA" });
});

app.get("/api/public/settings", (_req, res) => {
  const { settings } = getDb();
  res.json({
    name: settings.name,
    tagline: settings.tagline,
    instagram: settings.instagram,
    description: settings.description,
    aboutShort: settings.aboutShort,
    aboutLong: settings.aboutLong,
    email: settings.email,
    phone: settings.phone,
    address: settings.address,
  });
});

app.get("/api/public/:collection", (req, res) => {
  const name = req.params.collection;
  if (!isCollection(name)) {
    res.status(404).json({ error: "Colecção inexistente." });
    return;
  }
  const rows = getCollection(name).filter((row) => row.status === "published");
  res.json(rows);
});

app.post("/api/submissions", (req, res) => {
  const story = String(req.body?.story || "").trim();
  const purpose = String(req.body?.purpose || "").trim();
  const contactConsent = Boolean(req.body?.contactConsent);
  const publishConsent = Boolean(req.body?.publishConsent);
  const contactHint = contactConsent ? String(req.body?.contactHint || "").trim() : "";

  if (story.length < 20) {
    res.status(400).json({ error: "O relato precisa de pelo menos 20 caracteres." });
    return;
  }
  if (!purpose) {
    res.status(400).json({ error: "Indique a finalidade do relato." });
    return;
  }

  const saved = addSubmission({
    story,
    purpose,
    contactConsent,
    publishConsent,
    contactHint,
  });
  res.status(201).json({
    ok: true,
    id: saved.id,
    message: "O relato chegou à responsável. Obrigado por confiar neste canal.",
  });
});

app.post("/api/auth/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const admin = getDb().admins.find((row) => row.email === email);
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    res.status(401).json({ error: "Credenciais incorrectas." });
    return;
  }
  const token = jwt.sign({ email: admin.email, name: admin.name }, JWT_SECRET, {
    expiresIn: "12h",
  });
  res.json({ token, name: admin.name, email: admin.email });
});

app.get("/api/admin/me", auth, (req, res) => {
  const email = (req as express.Request & { adminEmail?: string }).adminEmail;
  const admin = getDb().admins.find((row) => row.email === email);
  res.json({ email: admin?.email, name: admin?.name });
});

app.get("/api/admin/settings", auth, (_req, res) => {
  res.json(getDb().settings);
});

app.put("/api/admin/settings", auth, (req, res) => {
  res.json(saveSettings(req.body || {}));
});

app.get("/api/admin/inbox", auth, (_req, res) => {
  res.json(getDb().submissions);
});

app.post("/api/admin/inbox/:id/read", auth, (req, res) => {
  const row = markSubmissionRead(req.params.id);
  if (!row) {
    res.status(404).json({ error: "Relato não encontrado." });
    return;
  }
  res.json(row);
});

app.get("/api/admin/:collection", auth, (req, res) => {
  const name = req.params.collection;
  if (!isCollection(name)) {
    res.status(404).json({ error: "Colecção inexistente." });
    return;
  }
  res.json(getCollection(name));
});

app.post("/api/admin/:collection", auth, (req, res) => {
  const name = req.params.collection;
  if (!isCollection(name)) {
    res.status(404).json({ error: "Colecção inexistente." });
    return;
  }
  const body = { status: "draft", ...(req.body || {}) };
  res.status(201).json(createRecord(name, body));
});

app.put("/api/admin/:collection/:id", auth, (req, res) => {
  const name = req.params.collection;
  if (!isCollection(name)) {
    res.status(404).json({ error: "Colecção inexistente." });
    return;
  }
  const row = updateRecord(name, req.params.id, req.body || {});
  if (!row) {
    res.status(404).json({ error: "Registo não encontrado." });
    return;
  }
  res.json(row);
});

app.post("/api/admin/:collection/:id/archive", auth, (req, res) => {
  const name = req.params.collection;
  if (!isCollection(name)) {
    res.status(404).json({ error: "Colecção inexistente." });
    return;
  }
  const row = archiveRecord(name, req.params.id);
  if (!row) {
    res.status(404).json({ error: "Registo não encontrado." });
    return;
  }
  res.json(row);
});

app.get("/sitemap.xml", (_req, res) => {
  const urls = [
    "/",
    "/quem-somos",
    "/arte-e-historias",
    "/aprender",
    "/participar",
    "/apoio",
    "/doar",
    "/privacidade",
    "/termos",
    "/partilhar",
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>https://wagaia.org${loc}</loc></url>`).join("\n")}
</urlset>`;
  res.type("application/xml").send(body);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`WAGAIA API on ${PORT}`);
});
