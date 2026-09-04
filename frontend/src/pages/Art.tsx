import { Seo } from "@/lib/seo";
import { usePublicList } from "@/hooks/usePublic";
import { PageHero, PendingBlock, LoadingState, ErrorState } from "@/components/Ui";
import type { Artwork, Campaign, InspiringWoman, Story } from "@/lib/api";

export function Art() {
  const campaigns = usePublicList<Campaign>("campaigns");
  const artworks = usePublicList<Artwork>("artworks");
  const stories = usePublicList<Story>("stories");
  const women = usePublicList<InspiringWoman>("inspiring_women");
  const historias = stories.data?.filter((s) => s.kind === "historia") || [];
  const wagaias = stories.data?.filter((s) => s.kind === "wagaias") || [];

  return (
    <>
      <Seo
        title="Arte e Histórias"
        description="Campanhas, banda desenhada, ilustrações e histórias da WAGAIA, com atribuição clara de autoria."
        path="/arte-e-historias"
      />
      <PageHero title="Arte e Histórias">
        <p>
          Pop Art, colagem editorial e traço manual. Cada peça publicada leva autoria e contexto —
          nada inventado.
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
        <div>
          <h2 className="font-display text-3xl mb-4">Campanhas</h2>
          {campaigns.loading ? <LoadingState /> : null}
          {campaigns.error ? <ErrorState message={campaigns.error} /> : null}
          {!campaigns.loading && (!campaigns.data || campaigns.data.length === 0) ? (
            <PendingBlock title="Campanhas em preparação" />
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {campaigns.data?.map((c, i) => (
                <article key={c.id} className={`ink-border bg-paper overflow-hidden stamp-sm ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                  {c.image ? <img src={c.image} alt={c.title} className="w-full" /> : null}
                  <div className="p-4">
                    <h3 className="font-display text-2xl">{c.title}</h3>
                    <p className="font-editorial mt-1">{c.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-3xl mb-4">Banda desenhada e ilustrações</h2>
          {artworks.loading ? <LoadingState /> : null}
          {!artworks.loading && (!artworks.data || artworks.data.length === 0) ? (
            <PendingBlock title="Obras em preparação" />
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {artworks.data?.map((a) => (
                <article key={a.id} className="ink-border p-4 bg-paper">
                  {a.image ? <img src={a.image} alt={a.title} className="mb-3 ink-border" /> : null}
                  <h3 className="font-display text-xl">{a.title}</h3>
                  <p className="text-sm font-extrabold">{a.medium}</p>
                  {a.author ? <p className="font-editorial">Autoria: {a.author}</p> : null}
                  <p className="font-editorial mt-1">{a.caption}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-display text-3xl mb-4">Histórias da WAGAIA</h2>
            {!stories.loading && historias.length === 0 ? (
              <PendingBlock title="Histórias em preparação" />
            ) : (
              historias.map((s) => (
                <article key={s.id} className="ink-border p-4 mb-3 bg-blush">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  {s.author ? <p className="text-sm">Autoria: {s.author}</p> : null}
                  <p className="font-editorial whitespace-pre-line">{s.body}</p>
                </article>
              ))
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl mb-4">As Nossas Wagaias</h2>
            {!stories.loading && wagaias.length === 0 ? (
              <PendingBlock title="Wagaias em preparação" />
            ) : (
              wagaias.map((s) => (
                <article key={s.id} className="ink-border p-4 mb-3 bg-paper">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  {s.author ? <p className="text-sm">Autoria: {s.author}</p> : null}
                  <p className="font-editorial whitespace-pre-line">{s.body}</p>
                </article>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl mb-4">Mulheres que Inspiram</h2>
          {women.loading ? <LoadingState /> : null}
          {!women.loading && (!women.data || women.data.length === 0) ? (
            <PendingBlock title="Perfis em preparação" />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {women.data?.map((w) => (
                <article key={w.id} className="ink-border p-5 bg-paper">
                  <h3 className="font-display text-2xl">{w.name}</h3>
                  <p className="font-extrabold text-sm">Atribuição: {w.attribution}</p>
                  <p className="font-editorial mt-2">{w.body}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
