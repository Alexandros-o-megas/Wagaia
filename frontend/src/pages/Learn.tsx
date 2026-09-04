import { useMemo, useState } from "react";
import { Seo } from "@/lib/seo";
import { usePublicList } from "@/hooks/usePublic";
import { PageHero, PendingBlock, LoadingState, ErrorState } from "@/components/Ui";
import type { Course, Resource } from "@/lib/api";

const THEMES = ["todos", "direitos", "vbg", "saude", "arte", "outro"];
const FORMATS = ["todos", "pdf", "artigo", "podcast", "video", "dica"];

export function Learn() {
  const resources = usePublicList<Resource>("resources");
  const courses = usePublicList<Course>("courses");
  const [theme, setTheme] = useState("todos");
  const [format, setFormat] = useState("todos");

  const filtered = useMemo(() => {
    return (resources.data || []).filter((r) => {
      const t = theme === "todos" || r.theme === theme;
      const f = format === "todos" || r.format === format;
      return t && f;
    });
  }, [resources.data, theme, format]);

  const dicas = filtered.filter((r) => r.format === "dica");
  const biblioteca = filtered.filter((r) => r.format !== "dica");

  return (
    <>
      <Seo
        title="Aprender"
        description="Biblioteca Feminista, dicas úteis, cursos e formações da WAGAIA."
        path="/aprender"
      />
      <PageHero title="Aprender">
        <p>Materiais filtráveis por tema e formato. PDFs, artigos, podcasts e vídeos externos.</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtros">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${theme === t ? "bg-ink text-blush" : ""}`}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
          {FORMATS.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${format === f ? "bg-rose" : ""}`}
              onClick={() => setFormat(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <h2 className="font-display text-3xl mb-4">Biblioteca Feminista</h2>
        {resources.loading ? <LoadingState /> : null}
        {resources.error ? <ErrorState message={resources.error} /> : null}
        {!resources.loading && biblioteca.length === 0 ? (
          <PendingBlock title="Biblioteca em preparação" />
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {biblioteca.map((r) => (
              <li key={r.id} className="ink-border p-4 bg-paper">
                <p className="chip mb-2">
                  {r.format} · {r.theme}
                </p>
                <h3 className="font-display text-xl">{r.title}</h3>
                <p className="font-editorial">{r.summary}</p>
                {r.url ? (
                  <a className="btn-paper mt-3" href={r.url} target="_blank" rel="noreferrer">
                    Abrir recurso
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        <h2 className="font-display text-3xl mt-12 mb-4">Dicas úteis</h2>
        {!resources.loading && dicas.length === 0 ? (
          <PendingBlock title="Dicas em preparação" />
        ) : (
          <ul className="grid gap-3">
            {dicas.map((r) => (
              <li key={r.id} className="ink-border p-4 bg-blush">
                <h3 className="font-display text-xl">{r.title}</h3>
                <p className="font-editorial">{r.summary}</p>
              </li>
            ))}
          </ul>
        )}

        <h2 className="font-display text-3xl mt-12 mb-4">Cursos e formações</h2>
        {courses.loading ? <LoadingState /> : null}
        {!courses.loading && (!courses.data || courses.data.length === 0) ? (
          <PendingBlock title="Formações em preparação" />
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {courses.data?.map((c) => (
              <li key={c.id} className="ink-border p-4 bg-paper">
                <h3 className="font-display text-xl">{c.title}</h3>
                <p className="text-sm font-extrabold">{c.format}</p>
                <p className="font-editorial">{c.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
