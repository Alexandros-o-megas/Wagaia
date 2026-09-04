import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { usePublicList } from "@/hooks/usePublic";
import { PageHero, PendingBlock, LoadingState } from "@/components/Ui";
import type { Product } from "@/lib/api";

export function Participate() {
  const products = usePublicList<Product>("products");

  return (
    <>
      <Seo
        title="Participar"
        description="Voluntariado, parcerias, partilha de história e Bazar WAGAIA."
        path="/participar"
      />
      <PageHero title="Participar">
        <p>Há várias formas de caminhar connosco — sem agenda de Círculos nesta fase.</p>
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-6">
        <article className="ink-border bg-paper p-6 stamp-sm">
          <h2 className="font-display text-3xl">Voluntariado</h2>
          <p className="font-editorial mt-2">
            O canal de voluntariado está a ser preparado pela equipa. Não publicamos vagas nem
            contactos não confirmados.
          </p>
          <PendingBlock title="Voluntariado em preparação" />
        </article>
        <article className="ink-border bg-rose p-6 stamp-sm">
          <h2 className="font-display text-3xl">Parcerias</h2>
          <p className="font-editorial mt-2">
            Instituições e colectivos interessados podem acompanhar {`@wa_gaia`} no Instagram até o
            formulário de parceria estar activo.
          </p>
          <PendingBlock title="Parcerias em preparação" />
        </article>
        <article className="ink-border bg-paper p-6">
          <h2 className="font-display text-3xl">Partilhar a minha história</h2>
          <p className="font-editorial mt-2">
            Canal separado de denúncia formal. Sem pedir identificação por defeito.
          </p>
          <Link to="/partilhar" className="btn-ink mt-4">
            Abrir o canal
          </Link>
        </article>
        <article className="ink-border bg-blush p-6">
          <h2 className="font-display text-3xl">Bazar</h2>
          {products.loading ? <LoadingState /> : null}
          {!products.loading && (!products.data || products.data.length === 0) ? (
            <PendingBlock title="Bazar em preparação" />
          ) : (
            <ul className="grid gap-3 mt-3">
              {products.data?.map((p) => (
                <li key={p.id} className="ink-border bg-paper p-3">
                  <p className="font-display text-xl">{p.title}</p>
                  <p className="font-editorial">{p.summary}</p>
                  {p.priceNote ? <p className="font-extrabold">{p.priceNote}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </>
  );
}
