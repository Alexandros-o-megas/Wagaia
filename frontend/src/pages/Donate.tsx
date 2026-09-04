import { Seo } from "@/lib/seo";
import { usePublicList } from "@/hooks/usePublic";
import { PageHero, PendingBlock, LoadingState, ErrorState } from "@/components/Ui";
import { HeartIcon } from "@/components/Icons";
import type { DonationMethod } from "@/lib/api";

const ORDER = ["mpesa", "emola", "mkesh", "bank"] as const;

export function Donate() {
  const { data, loading, error } = usePublicList<DonationMethod>("donation_methods");
  const rows = ORDER.map((kind) => data?.find((d) => d.kind === kind)).filter(Boolean) as DonationMethod[];

  return (
    <>
      <Seo
        title="Doar"
        description="Apoia a WAGAIA via M-Pesa, e-Mola, mKesh ou transferência bancária. Dados editáveis pela equipa."
        path="/doar"
      />
      <PageHero title="Doar">
        <p>
          O trabalho de artivismo precisa de casa. Os dados de pagamento só aparecem aqui depois de
          a equipa os publicar no painel.
        </p>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <HeartIcon className="h-14 w-14 mb-4" />
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && rows.length === 0 ? (
          <PendingBlock title="Métodos de donativo em preparação" />
        ) : (
          <ul className="grid gap-4">
            {rows.map((d) => (
              <li key={d.id} className="ink-border bg-paper p-5 stamp-sm">
                <p className="chip mb-2">{d.kind}</p>
                <h2 className="font-display text-2xl">{d.label}</h2>
                {d.details ? (
                  <p className="font-editorial mt-2 whitespace-pre-line">{d.details}</p>
                ) : (
                  <p className="font-editorial mt-2">Dados em preparação.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
