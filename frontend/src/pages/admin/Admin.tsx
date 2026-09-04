import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  adminArchive,
  adminChangePassword,
  adminCreate,
  adminGet,
  adminInbox,
  adminMarkRead,
  adminMe,
  adminSaveSettings,
  adminSettings,
  adminUpdate,
  clearToken,
  getToken,
  login,
  setToken,
  type CollectionName,
  type Settings,
  type Status,
  type Submission,
} from "@/lib/api";
import { Seo } from "@/lib/seo";

const COLLECTIONS: { key: CollectionName; label: string }[] = [
  { key: "campaigns", label: "Campanhas" },
  { key: "artworks", label: "Obras" },
  { key: "stories", label: "Histórias" },
  { key: "articles", label: "Artigos" },
  { key: "inspiring_women", label: "Mulheres que inspiram" },
  { key: "resources", label: "Biblioteca" },
  { key: "courses", label: "Cursos" },
  { key: "products", label: "Bazar" },
  { key: "support_services", label: "Apoio" },
  { key: "donation_methods", label: "Donativos" },
  { key: "team", label: "Equipa" },
  { key: "partners", label: "Parceiros" },
  { key: "impact_metrics", label: "Impacto" },
  { key: "pages", label: "Páginas" },
];

const FIELDS: Record<CollectionName, string[]> = {
  campaigns: ["title", "summary", "body", "image", "featured", "status"],
  artworks: ["title", "medium", "author", "caption", "image", "status"],
  stories: ["title", "kind", "author", "body", "status"],
  articles: ["title", "excerpt", "body", "status"],
  inspiring_women: ["name", "attribution", "body", "status"],
  resources: ["title", "theme", "format", "summary", "url", "status"],
  courses: ["title", "summary", "format", "status"],
  products: ["title", "summary", "priceNote", "status"],
  support_services: [
    "name",
    "province",
    "supportType",
    "phone",
    "whatsapp",
    "hours",
    "cost",
    "lastVerified",
    "status",
  ],
  donation_methods: ["kind", "label", "details", "status"],
  team: ["name", "role", "bio", "order", "status"],
  partners: ["name", "kind", "note", "status"],
  impact_metrics: ["label", "value", "note", "status"],
  pages: ["slug", "title", "excerpt", "body", "status"],
};

const STATUSES: Status[] = ["draft", "review", "published", "archived"];

function Guard({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (!getToken()) {
      setOk(false);
      return;
    }
    adminMe()
      .then(() => setOk(true))
      .catch(() => {
        clearToken();
        setOk(false);
      });
  }, []);
  if (ok === null) return <p className="p-6 font-extrabold">A verificar sessão…</p>;
  if (!ok) return <Navigate to="/admin/entrar" replace />;
  return <>{children}</>;
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@wagaia.org");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      setToken(res.token);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no acesso.");
    }
  }

  return (
    <div className="min-h-screen bg-blush flex items-center justify-center px-4">
      <Seo title="Área da equipa" description="Acesso reservado à equipa WAGAIA." path="/admin/entrar" noindex />
      <form onSubmit={onSubmit} className="ink-border bg-paper p-6 w-full max-w-md stamp grid gap-4">
        <h1 className="font-display text-3xl">Área da equipa</h1>
        <label className="grid gap-1">
          <span className="font-extrabold">E-mail</span>
          <input className="ink-border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="grid gap-1">
          <span className="font-extrabold">Palavra-passe</span>
          <input
            type="password"
            className="ink-border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error ? <p role="alert">{error}</p> : null}
        <button className="btn-ink" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blush">
      <header className="border-b-[3px] border-ink bg-paper px-4 py-3 flex flex-wrap gap-3 items-center">
        <p className="font-display text-xl">Painel WAGAIA</p>
        <nav className="flex flex-wrap gap-2 text-sm font-extrabold">
          <Link to="/admin">Início</Link>
          <Link to="/admin/caixa">Caixa de relatos</Link>
          <Link to="/admin/definicoes">Definições</Link>
          <Link to="/admin/senha">Senha</Link>
          <Link to="/">Ver site</Link>
        </nav>
        <button
          className="ml-auto btn-paper !py-1"
          type="button"
          onClick={() => {
            clearToken();
            navigate("/admin/entrar");
          }}
        >
          Sair
        </button>
      </header>
      {children}
    </div>
  );
}

function Dashboard() {
  return (
    <Shell>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl mb-6">Gestão de conteúdo</h1>
        <p className="font-editorial mb-6">
          Estados: rascunho, revisão, publicado, arquivado. Só o estado publicado aparece no site.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {COLLECTIONS.map((c) => (
            <Link key={c.key} to={`/admin/coleccao/${c.key}`} className="ink-border bg-paper p-4 stamp-sm">
              <p className="font-display text-xl">{c.label}</p>
              <p className="text-sm">{c.key}</p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function CollectionPage() {
  const { name } = useParams<{ name: string }>();
  const key = (name || "campaigns") as CollectionName;
  const fields = FIELDS[key] || ["title", "status"];
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  function load() {
    adminGet<Record<string, unknown>>(key)
      .then(setRows)
      .catch((err: Error) => setError(err.message));
  }

  useEffect(() => {
    load();
  }, [key]);

  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;
    if (editing.id) {
      await adminUpdate(key, String(editing.id), payload);
    } else {
      await adminCreate(key, payload);
    }
    setEditing(null);
    load();
  }

  return (
    <Shell>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="chip mb-2">{key}</p>
        <h1 className="font-display text-4xl mb-4">{COLLECTIONS.find((c) => c.key === key)?.label}</h1>
        {error ? <p role="alert">{error}</p> : null}
        <button
          className="btn-ink mb-4"
          type="button"
          onClick={() => setEditing({ status: "draft" })}
        >
          Novo registo
        </button>
        <div className="grid gap-3">
          {rows.map((row) => (
            <article key={String(row.id)} className="ink-border bg-paper p-4 flex flex-wrap gap-3 items-start">
              <div className="flex-1">
                <p className="font-display text-xl">
                  {String(row.title || row.name || row.label || row.id)}
                </p>
                <p className="chip mt-1">{String(row.status)}</p>
              </div>
              <button className="btn-paper !py-1" type="button" onClick={() => setEditing(row)}>
                Editar
              </button>
              <button
                className="btn-paper !py-1"
                type="button"
                onClick={async () => {
                  await adminArchive(key, String(row.id));
                  load();
                }}
              >
                Arquivar
              </button>
            </article>
          ))}
        </div>
        {editing ? (
          <div className="fixed inset-0 bg-ink/40 flex items-end md:items-center justify-center p-4">
            <div className="bg-paper ink-border p-5 w-full max-w-lg max-h-[90vh] overflow-auto grid gap-3">
              <h2 className="font-display text-2xl">Editar</h2>
              {fields.map((field) => (
                <label key={field} className="grid gap-1">
                  <span className="font-extrabold text-sm">{field}</span>
                  {field === "status" ? (
                    <select
                      className="ink-border p-2"
                      value={String(editing[field] || "draft")}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : field === "featured" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(editing[field])}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.checked })}
                    />
                  ) : field === "body" || field === "details" || field === "summary" || field === "bio" || field === "note" ? (
                    <textarea
                      className="ink-border p-2"
                      rows={5}
                      value={String(editing[field] || "")}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    />
                  ) : (
                    <input
                      className="ink-border p-2"
                      value={String(editing[field] ?? "")}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [field]: field === "order" ? Number(e.target.value) : e.target.value,
                        })
                      }
                    />
                  )}
                </label>
              ))}
              <div className="flex gap-2">
                <button className="btn-ink" type="button" onClick={save}>
                  Guardar
                </button>
                <button className="btn-paper" type="button" onClick={() => setEditing(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </Shell>
  );
}

function InboxPage() {
  const [rows, setRows] = useState<Submission[]>([]);
  useEffect(() => {
    adminInbox().then(setRows).catch(() => setRows([]));
  }, []);
  const unread = useMemo(() => rows.filter((r) => !r.read).length, [rows]);
  return (
    <Shell>
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl mb-2">Caixa privada</h1>
        <p className="font-editorial mb-6">{unread} relatos por ler. Visível só para administradoras.</p>
        <ul className="grid gap-4">
          {rows.map((row) => (
            <li key={row.id} className="ink-border bg-paper p-4">
              <p className="text-sm font-extrabold">
                {new Date(row.createdAt).toLocaleString("pt-MZ")} · {row.read ? "lido" : "novo"}
              </p>
              <p className="font-editorial whitespace-pre-line mt-2">{row.story}</p>
              <p className="mt-2 text-sm">Finalidade: {row.purpose}</p>
              <p className="text-sm">Publicação: {row.publishConsent ? "sim" : "não"}</p>
              <p className="text-sm">
                Contacto: {row.contactConsent ? row.contactHint || "autorizado, sem detalhe" : "não pedido"}
              </p>
              {!row.read ? (
                <button
                  className="btn-paper mt-3"
                  type="button"
                  onClick={async () => {
                    await adminMarkRead(row.id);
                    setRows((list) => list.map((item) => (item.id === row.id ? { ...item, read: true } : item)));
                  }}
                >
                  Marcar como lido
                </button>
              ) : null}
            </li>
          ))}
        </ul>
        {rows.length === 0 ? <p>Ainda não há relatos.</p> : null}
      </section>
    </Shell>
  );
}

function SettingsPage() {
  const [form, setForm] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    adminSettings().then(setForm);
  }, []);
  if (!form) return <Shell><p className="p-6">A carregar…</p></Shell>;
  return (
    <Shell>
      <form
        className="max-w-3xl mx-auto px-4 py-8 grid gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await adminSaveSettings(form);
          setSaved(true);
        }}
      >
        <h1 className="font-display text-4xl mb-2">Definições</h1>
        {Object.entries(form).map(([key, value]) =>
          key === "id" ? null : (
            <label key={key} className="grid gap-1">
              <span className="font-extrabold">{key}</span>
              <textarea
                className="ink-border p-2"
                rows={key.includes("about") || key === "description" ? 4 : 2}
                value={String(value || "")}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ),
        )}
        <button className="btn-ink" type="submit">
          Guardar
        </button>
        {saved ? <p role="status">Guardado.</p> : null}
      </form>
    </Shell>
  );
}

function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");
    if (nextPassword !== confirmPassword) {
      setError("A confirmação não coincide com a nova palavra-passe.");
      return;
    }
    setSaving(true);
    try {
      const res = await adminChangePassword({ currentPassword, nextPassword, confirmPassword });
      setMessage(res.message);
      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível alterar a senha.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Shell>
      <form onSubmit={onSubmit} className="max-w-lg mx-auto px-4 py-8 grid gap-4">
        <h1 className="font-display text-4xl">Alterar senha</h1>
        <p className="font-editorial">
          A nova palavra-passe precisa de pelo menos 10 caracteres e tem de ser diferente da actual.
        </p>
        <label className="grid gap-1">
          <span className="font-extrabold">Palavra-passe actual</span>
          <input
            type="password"
            className="ink-border p-2"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1">
          <span className="font-extrabold">Nova palavra-passe</span>
          <input
            type="password"
            className="ink-border p-2"
            autoComplete="new-password"
            minLength={10}
            value={nextPassword}
            onChange={(e) => setNextPassword(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1">
          <span className="font-extrabold">Confirmar nova palavra-passe</span>
          <input
            type="password"
            className="ink-border p-2"
            autoComplete="new-password"
            minLength={10}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p role="alert">{error}</p> : null}
        {message ? <p role="status">{message}</p> : null}
        <button className="btn-ink" type="submit" disabled={saving}>
          {saving ? "A guardar…" : "Actualizar senha"}
        </button>
      </form>
    </Shell>
  );
}

export function AdminApp() {
  return (
    <>
      <Seo title="Painel" description="Painel privado WAGAIA." path="/admin" noindex />
      <Routes>
        <Route path="entrar" element={<LoginPage />} />
        <Route
          path=""
          element={
            <Guard>
              <Dashboard />
            </Guard>
          }
        />
        <Route
          path="caixa"
          element={
            <Guard>
              <InboxPage />
            </Guard>
          }
        />
        <Route
          path="definicoes"
          element={
            <Guard>
              <SettingsPage />
            </Guard>
          }
        />
        <Route
          path="senha"
          element={
            <Guard>
              <PasswordPage />
            </Guard>
          }
        />
        <Route
          path="coleccao/:name"
          element={
            <Guard>
              <CollectionPage />
            </Guard>
          }
        />
      </Routes>
    </>
  );
}
