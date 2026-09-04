import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/Ui";

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacidade"
        description="Política de privacidade da plataforma WAGAIA."
        path="/privacidade"
      />
      <PageHero title="Política de privacidade">
        <p>Como tratamos informação nesta plataforma institucional.</p>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-10 font-editorial text-lg space-y-4">
        <p>
          A WAGAIA trata dados com o mínimo necessário para gerir o site e receber relatos. A página
          de partilha de história não usa trackers, analytics nem pixels.
        </p>
        <p>
          Relatos enviados no canal “Partilhar a minha história” ficam visíveis apenas para a
          responsável autenticada no painel. Visitantes não leem submissões.
        </p>
        <p>
          Não pedimos nome, telefone ou localização por defeito. Contacto só acontece se houver
          consentimento explícito.
        </p>
        <p>
          Conteúdo público é o que a equipa marca como publicado. Rascunhos e revisões não saem do
          painel.
        </p>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo
        title="Termos"
        description="Termos de utilização da plataforma WAGAIA."
        path="/termos"
      />
      <PageHero title="Termos de utilização">
        <p>Uso da plataforma editorial e institucional da WAGAIA.</p>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-10 font-editorial text-lg space-y-4">
        <p>
          Este site é gerido pela associação WAGAIA. O conteúdo publicado reflecte materiais
          confirmados pela equipa. Secções em preparação não devem ser lidas como factos
          publicados.
        </p>
        <p>
          O canal de partilha não é denúncia formal nem serviço de emergência. Para apoio imediato,
          usa a página Apoio quando os contactos verificados estiverem publicados.
        </p>
        <p>
          A área /admin é reservada à equipa. Credenciais são pessoais e não devem ser partilhadas.
        </p>
      </section>
    </>
  );
}
