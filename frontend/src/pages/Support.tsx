import { useMemo, useState } from "react";
import { Seo } from "@/lib/seo";
import { usePublicList } from "@/hooks/usePublic";
import { PageHero, PendingBlock, LoadingState, ErrorState } from "@/components/Ui";
import type { SupportService } from "@/lib/api";

function telHref(value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function waHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function Support() {
  const { data, loading, error } = usePublicList<SupportService>("support_services");
  const [province, setProvince] = useState("todas");
  const [kind, setKind] = useState("todos");

  const provinces = useMemo(() => {
    const set = new Set((data || []).map((s) => s.province).filter(Boolean));
    return ["todas", ...Array.from(set)];
  }, [data]);

  const kinds = useMemo(() => {
    const set = new Set((data || []).map((s) => s.supportType).filter(Boolean));
    return ["todos", ...Array.from(set)];
  }, [data]);

  const rows = (data || []).filter((s) => {
    const p = province === "todas" || s.province === province;
    const k = kind === "todos" || s.supportType === kind;
    return p && k;
  });

  return (
    <>
      <Seo
        title="Apoio"
        description="Contactos verificados por província, tipo de apoio, telefone e WhatsApp. Canal de emergência separado da partilha de história."
        path="/apoio"
      />
      <PageHero title="Preciso de Ajuda">
        <p>
          Lista leve, pensada para dados móveis. Só entram contactos verificados pela equipa WAGAIA.
          Se precisares de ajuda imediata, usa os números publicados quando estiverem disponíveis.
        </p>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-8">
        {loading ? <LoadingState label="A carregar contactos…" /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && rows.length === 0 ? (
          <PendingBlock title="Contactos de apoio em preparação" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {provinces.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`chip ${province === p ? "bg-ink text-blush" : ""}`}
                  onClick={() => setProvince(p)}
                >
                  {p}
                </button>
              ))}
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`chip ${kind === k ? "bg-rose" : ""}`}
                  onClick={() => setKind(k)}
                >
                  {k}
                </button>
              ))}
            </div>
            <ul className="grid gap-3">
              {rows.map((s) => (
                <li key={s.id} className="ink-border bg-paper p-4">
                  <p className="font-display text-xl">{s.name}</p>
                  <p className="text-sm font-extrabold">
                    {s.province} · {s.supportType}
                  </p>
                  <p className="font-editorial mt-1">Horário: {s.hours || "a confirmar"}</p>
                  <p className="font-editorial">Custo: {s.cost || "a confirmar"}</p>
                  <p className="text-sm">Última verificação: {s.lastVerified || "—"}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {s.phone ? (
                      <a className="btn-ink !py-2 !px-3 text-sm" href={telHref(s.phone)}>
                        Ligar {s.phone}
                      </a>
                    ) : null}
                    {s.whatsapp ? (
                      <a
                        className="btn-rose !py-2 !px-3 text-sm"
                        href={waHref(s.whatsapp)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="font-editorial text-sm mt-8">
          Este directório não substitui serviços de emergência. A partilha de história é um canal
          separado e não é denúncia formal.
        </p>
      </section>
    </>
  );
}
