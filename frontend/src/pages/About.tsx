import { Seo } from "@/lib/seo";
import { usePublicList, useSettings } from "@/hooks/usePublic";
import { PageHero, PendingBlock, SectionTitle, LoadingState, ErrorState } from "@/components/Ui";
import { FistIcon, HeartIcon, MegaphoneIcon } from "@/components/Icons";
import type { Partner, TeamMember, ImpactMetric } from "@/lib/api";

export function About() {
  const { data: settings, loading, error } = useSettings();
  const team = usePublicList<TeamMember>("team");
  const partners = usePublicList<Partner>("partners");
  const impact = usePublicList<ImpactMetric>("impact_metrics");

  return (
    <>
      <Seo
        title="Quem Somos"
        description="Wagaia significa casa ou lugar seguro em Bitonga. Associação moçambicana de artivismo liderada por mulheres."
        path="/quem-somos"
      />
      <PageHero title="Quem Somos">
        <p>{settings?.aboutShort}</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8">
        <article className="ink-border bg-paper p-6 stamp">
          <h2 className="font-display text-3xl mb-3">História e propósito</h2>
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          <div className="font-editorial text-lg whitespace-pre-line leading-relaxed">
            {settings?.aboutLong}
          </div>
        </article>
        <div className="grid gap-4">
          <article className="ink-border bg-rose p-5 -rotate-1">
            <h3 className="font-display text-2xl">Missão</h3>
            <p className="font-editorial mt-2">{settings?.description}</p>
          </article>
          <article className="ink-border bg-paper p-5 rotate-1">
            <h3 className="font-display text-2xl">Visão</h3>
            <p className="font-editorial mt-2">
              Comunidades mais seguras e uma sociedade livre de violência, onde cada história
              contada deixe de ser necessária.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <SectionTitle kicker="Valores" title="Voz, força, empatia." />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="ink-border bg-paper p-5">
            <MegaphoneIcon className="h-10 w-10" />
            <p className="font-display text-xl mt-2">Voz</p>
          </div>
          <div className="ink-border bg-paper p-5">
            <FistIcon className="h-10 w-10" />
            <p className="font-display text-xl mt-2">Força</p>
          </div>
          <div className="ink-border bg-paper p-5">
            <HeartIcon className="h-10 w-10" />
            <p className="font-display text-xl mt-2">Empatia</p>
          </div>
        </div>
      </section>

      <section className="border-t-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-display text-3xl mb-4">Equipa</h2>
            {team.loading ? <LoadingState /> : null}
            {!team.loading && (!team.data || team.data.length === 0) ? (
              <PendingBlock title="Equipa em preparação" />
            ) : (
              <ul className="grid gap-3">
                {team.data?.map((m) => (
                  <li key={m.id} className="ink-border p-4">
                    <p className="font-display text-xl">{m.name}</p>
                    <p className="font-extrabold">{m.role}</p>
                    <p className="font-editorial">{m.bio}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl mb-4">Reconhecimento e parceiros</h2>
            <PendingBlock title="Embassy Tulip Award em preparação" />
            <div className="mt-4">
              {!partners.loading && (!partners.data || partners.data.length === 0) ? (
                <PendingBlock title="Parceiros em preparação" />
              ) : (
                <ul className="grid gap-2">
                  {partners.data?.map((p) => (
                    <li key={p.id} className="ink-border p-3 bg-blush">
                      <strong>{p.name}</strong>
                      <span className="block font-editorial">{p.note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-4">
              {!impact.loading && (!impact.data || impact.data.length === 0) ? (
                <PendingBlock title="Impacto em preparação" />
              ) : (
                <ul className="grid gap-2">
                  {impact.data?.map((i) => (
                    <li key={i.id} className="ink-border p-3">
                      <p className="font-display text-2xl">{i.value}</p>
                      <p>{i.label}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
