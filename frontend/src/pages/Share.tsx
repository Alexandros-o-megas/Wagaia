import { FormEvent, useState } from "react";
import { Seo } from "@/lib/seo";
import { submitStory } from "@/lib/api";
import { PageHero } from "@/components/Ui";
import { LockIcon } from "@/components/Icons";

const PURPOSES = [
  "Quero que a equipa leia e guarde o relato",
  "Quero contribuir para o trabalho editorial, sem publicação agora",
  "Autorizo considerar o relato para publicação futura, se fizer sentido",
];

export function Share() {
  const [story, setStory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [publishConsent, setPublishConsent] = useState(false);
  const [contactHint, setContactHint] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "offline">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await submitStory({
        story,
        purpose,
        contactConsent,
        publishConsent,
        contactHint,
      });
      setStatus("success");
      setMessage(res.message);
      setStory("");
      setPurpose("");
      setContactConsent(false);
      setPublishConsent(false);
      setContactHint("");
    } catch (err) {
      const text = err instanceof Error ? err.message : "Pedido falhou.";
      if (text.includes("Failed") || text.includes("Network") || text.includes("fetch")) {
        setStatus("offline");
        setMessage("Canal em preparação");
        return;
      }
      setStatus("error");
      setMessage(text);
    }
  }

  return (
    <>
      <Seo
        title="Partilhar a minha história"
        description="Canal de partilha da WAGAIA, separado de denúncia formal, sem pedir identificação por defeito."
        path="/partilhar"
        noindex
      />
      <PageHero title="Partilhar a minha história">
        <p>Este canal não é um serviço de emergência nem uma denúncia formal.</p>
      </PageHero>
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="ink-border bg-rose p-4 mb-6 flex gap-3 items-start">
          <LockIcon className="h-10 w-10 shrink-0" />
          <div className="font-editorial">
            <p className="font-display text-lg">Sem pedir identificação</p>
            <p>
              Nome, telefone e localização não são pedidos por defeito. Sem anexos nesta fase. Sem
              trackers, analytics ou pixels nesta página. O relato fica visível apenas para a
              responsável no painel.
            </p>
          </div>
        </div>

        {status === "offline" ? (
          <div className="ink-border bg-paper p-6" role="status">
            <p className="font-display text-2xl">Canal em preparação</p>
            <p className="font-editorial mt-2">
              O envio não está activo neste momento. Não simulamos confirmações falsas.
            </p>
          </div>
        ) : (
          <form className="ink-border bg-paper p-6 grid gap-5" onSubmit={onSubmit}>
            <label className="grid gap-2">
              <span className="font-extrabold">Relato</span>
              <textarea
                required
                minLength={20}
                rows={8}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="ink-border p-3 font-editorial"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-extrabold">Finalidade</span>
              <select
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="ink-border p-3"
              >
                <option value="">Escolher…</option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                checked={publishConsent}
                onChange={(e) => setPublishConsent(e.target.checked)}
              />
              <span>Consentimento separado para eventual publicação, sem identificação.</span>
            </label>
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                checked={contactConsent}
                onChange={(e) => setContactConsent(e.target.checked)}
              />
              <span>Consentimento opcional para a equipa poder contactar-me.</span>
            </label>
            {contactConsent ? (
              <label className="grid gap-2">
                <span className="font-extrabold">Como podemos chegar até ti (opcional)</span>
                <input
                  value={contactHint}
                  onChange={(e) => setContactHint(e.target.value)}
                  className="ink-border p-3"
                />
              </label>
            ) : null}
            <button type="submit" className="btn-ink" disabled={status === "loading"}>
              {status === "loading" ? "A enviar…" : "Enviar relato"}
            </button>
            {status === "success" ? (
              <p className="font-editorial" role="status">
                {message}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="font-editorial" role="alert">
                {message}
              </p>
            ) : null}
          </form>
        )}
      </section>
    </>
  );
}
