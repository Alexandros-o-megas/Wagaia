import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { usePublicList, useSettings } from "@/hooks/usePublic";
import { PendingBlock, LoadingState, ErrorState, SectionTitle } from "@/components/Ui";
import { CrownIcon, ExclaimIcon, FistIcon, HeartIcon, MegaphoneIcon, StarIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import type { Campaign } from "@/lib/api";

export function Home() {
  const { data: settings, loading: sLoad, error: sErr } = useSettings();
  const { data: campaigns, loading: cLoad, error: cErr } = usePublicList<Campaign>("campaigns");
  const featured = campaigns?.find((c) => c.featured) || campaigns?.[0];

  return (
    <>
      <Seo
        title="WAGAIA — Casa. Lugar seguro."
        description={
          settings?.description ||
          "Associação moçambicana de artivismo, liderada por mulheres."
        }
        path="/"
      />

      <section className="halo border-b-[3px] border-ink overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="chip mb-4">
              <MegaphoneIcon className="h-4 w-4" /> Artivismo · Moçambique
            </p>
            <h1 className="font-display text-5xl md:text-[4.6rem] leading-[0.88]">
              Casa.
              <br />
              Lugar seguro.
            </h1>
            <p className="font-editorial text-xl md:text-2xl mt-5 max-w-xl italic">
              {settings?.tagline || "O nosso sonho é nunca mais ter histórias para contar…"}
            </p>
            <p className="font-editorial text-lg mt-5 max-w-xl">
              {settings?.aboutShort}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/apoio" className="btn-rose">
                Preciso de Ajuda
              </Link>
              <Link to="/doar" className="btn-ink">
                Doar
              </Link>
              <Link to="/partilhar" className="btn-paper">
                Partilhar a minha história
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6">
              <StarIcon className="h-10 w-10" />
            </div>
            <div className="absolute top-8 -right-2">
              <CrownIcon className="h-12 w-12" />
            </div>
            <div className="ink-border bg-paper stamp p-3 -rotate-2">
              <Logo className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-5 left-8 tape px-3 py-1 font-display text-sm rotate-3">
              @wa_gaia
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle kicker="Missão" title="Dar voz a quem muitas vezes é silenciado.">
          <p>{settings?.description}</p>
        </SectionTitle>
        {sLoad ? <LoadingState /> : null}
        {sErr ? <ErrorState message={sErr} /> : null}
        <div className="grid md:grid-cols-3 gap-5">
          <article className="ink-border bg-paper p-5 stamp-sm -rotate-1">
            <MegaphoneIcon className="h-12 w-12 mb-3" />
            <h3 className="font-display text-2xl">Voz</h3>
            <p className="font-editorial mt-2">
              Transformamos histórias reais em quadrinhos, ilustração e audiovisual.
            </p>
          </article>
          <article className="ink-border bg-rose p-5 stamp-sm rotate-1">
            <FistIcon className="h-12 w-12 mb-3" />
            <h3 className="font-display text-2xl">Força</h3>
            <p className="font-editorial mt-2">
              Luta pelos direitos das mulheres e raparigas em Moçambique.
            </p>
          </article>
          <article className="ink-border bg-paper p-5 stamp-sm">
            <HeartIcon className="h-12 w-12 mb-3" />
            <h3 className="font-display text-2xl">Empatia</h3>
            <p className="font-editorial mt-2">
              Criatividade para curar, educar e mobilizar comunidades mais seguras.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y-[3px] border-ink bg-paper newsprint">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-8 items-start">
          <SectionTitle kicker="Campanha" title="Em destaque">
            <p>Peças visuais oficiais da WAGAIA. Publicação no site só após confirmação no painel.</p>
          </SectionTitle>
          <div>
            {cLoad ? <LoadingState /> : null}
            {cErr ? <ErrorState message={cErr} /> : null}
            {!cLoad && !featured ? (
              <PendingBlock title="Campanha em preparação" />
            ) : featured ? (
              <article className="ink-border bg-blush stamp overflow-hidden">
                {featured.image ? (
                  <img src={featured.image} alt={featured.title} className="w-full object-cover" />
                ) : null}
                <div className="p-5">
                  <h3 className="font-display text-3xl">{featured.title}</h3>
                  <p className="font-editorial mt-2">{featured.summary}</p>
                  <Link to="/arte-e-historias" className="btn-ink mt-4">
                    Ver Arte e Histórias
                  </Link>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle kicker="Impacto" title="O que já foi confirmado.">
          <p>Números e prémios só entram no site público depois de verificação da equipa.</p>
        </SectionTitle>
        <PendingBlock title="Indicadores de impacto em preparação" />
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Link to="/aprender" className="ink-border bg-paper p-5 stamp-sm hover:-translate-y-0.5">
            <ExclaimIcon className="h-8 w-8 mb-2" />
            <p className="font-display text-xl">Aprender</p>
            <p className="font-editorial">Biblioteca feminista, dicas e formações.</p>
          </Link>
          <Link to="/participar" className="ink-border bg-rose p-5 stamp-sm hover:-translate-y-0.5">
            <StarIcon className="h-8 w-8 mb-2" />
            <p className="font-display text-xl">Participar</p>
            <p className="font-editorial">Voluntariado, parcerias, bazar e relatos.</p>
          </Link>
          <Link to="/doar" className="ink-border bg-paper p-5 stamp-sm hover:-translate-y-0.5">
            <HeartIcon className="h-8 w-8 mb-2" />
            <p className="font-display text-xl">Sustentar</p>
            <p className="font-editorial">M-Pesa, e-Mola, mKesh e dados bancários.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
