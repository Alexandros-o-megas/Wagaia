import type { ReactNode } from "react";

export function PendingBlock({ title = "Conteúdo em preparação" }: { title?: string }) {
  return (
    <div className="newsprint ink-border stamp-sm p-6 md:p-8 bg-paper">
      <p className="chip mb-3">Em preparação</p>
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="font-editorial text-[1.05rem] leading-relaxed">
        Esta secção só aparece no site público depois de a equipa WAGAIA confirmar e publicar o
        conteúdo no painel.
      </p>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="ink-border bg-paper p-6 stamp-sm">
      <p className="font-editorial">{children}</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="ink-border bg-rose p-6 stamp-sm" role="alert">
      <p className="font-display text-lg">Não foi possível carregar.</p>
      <p className="font-editorial mt-1">{message}</p>
    </div>
  );
}

export function LoadingState({ label = "A carregar…" }: { label?: string }) {
  return (
    <p className="font-ui font-bold" aria-live="polite">
      {label}
    </p>
  );
}

export function SectionTitle({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      {kicker ? <p className="chip mb-3">{kicker}</p> : null}
      <h2 className="font-display text-4xl md:text-5xl leading-[0.95] mb-3">{title}</h2>
      {children ? <div className="font-editorial text-lg">{children}</div> : null}
    </header>
  );
}

export function PageHero({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="halo border-b-[3px] border-ink py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="font-display text-5xl md:text-7xl leading-[0.9] max-w-4xl">{title}</h1>
        {children ? (
          <div className="mt-5 max-w-2xl font-editorial text-xl leading-relaxed">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
