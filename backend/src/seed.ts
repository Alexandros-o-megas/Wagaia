import { createHash } from "node:crypto";
import type { Database } from "./types.js";

const createdAt = "2026-03-01T00:00:00.000Z";

function hash(password: string) {
  return createHash("sha256").update(`wagaia:${password}`).digest("hex");
}

export function seedDatabase(): Database {
  return {
    settings: {
      id: "settings_root",
      name: "WAGAIA",
      tagline: "O nosso sonho é nunca mais ter histórias para contar…",
      instagram: "@wa_gaia",
      description:
        "Uma associação moçambicana de artivismo, liderada por mulheres, que usa arte, banda desenhada, ilustração e audiovisual para sensibilizar, mobilizar e promover os direitos das mulheres e raparigas.",
      aboutShort:
        "Wagaia significa “casa” ou “lugar seguro” em Bitonga. É esse o nosso propósito: criar espaços onde mulheres, raparigas e outras pessoas vulneráveis se sintam protegidas, respeitadas e livres para se expressar.",
      aboutLong:
        "Somos uma associação moçambicana de artivismo, liderada por mulheres, que usa a arte, banda desenhada, ilustração, audiovisual como ferramenta de sensibilização e mudança social. Transformamos histórias reais em quadrinhos, para dar voz a quem muitas vezes é silenciado, e para lutar pelos direitos das mulheres e raparigas em Moçambique.\n\nAcreditamos no poder da criatividade para curar, educar e mobilizar. Cada história que contamos é um passo para construir comunidades mais seguras e uma sociedade livre de violência.",
      email: "",
      phone: "",
      address: "",
      privacyNote:
        "A página de partilha de histórias não usa trackers, analytics nem pixels. As submissões ficam visíveis apenas para a responsável no painel.",
    },
    pages: [
      {
        id: "page_inicio",
        slug: "inicio",
        title: "Início",
        excerpt: "Casa. Lugar seguro.",
        body: "",
        status: "published",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    team: [
      {
        id: "team_pending",
        name: "",
        role: "",
        bio: "Perfis da equipa aguardam confirmação da associação.",
        order: 1,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    partners: [
      {
        id: "partner_pending",
        name: "",
        kind: "institucional",
        note: "Lista de parceiros aguarda confirmação.",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    impact_metrics: [
      {
        id: "impact_pending",
        label: "Impacto",
        value: "",
        note: "Indicadores de impacto aguardam verificação.",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    campaigns: [
      {
        id: "camp_licoes",
        title: "3 lições que tiramos deste caso",
        summary: "Peça oficial de sensibilização em ilustração Pop Art.",
        body: "",
        image: "/campanha-licoes.jpg",
        featured: true,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "camp_acreditar",
        title: "Acreditar e agir rapidamente faz diferença",
        summary: "Peça oficial sobre protecção de crianças.",
        body: "",
        image: "/campanha-acreditar.jpg",
        featured: false,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "camp_proteger",
        title: "Educamos as mulheres para se protegerem",
        summary: "Colagem oficial da campanha WAGAIA.",
        body: "",
        image: "/colagem-proteger.jpg",
        featured: false,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "camp_problema",
        title: "O problema tem nome. O problema tem rosto.",
        summary: "Colagem oficial da campanha WAGAIA.",
        body: "",
        image: "/colagem-problema.jpg",
        featured: false,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    artworks: [
      {
        id: "art_pending",
        title: "",
        medium: "banda desenhada",
        author: "",
        caption: "Obras e autoria aguardam publicação.",
        image: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    stories: [
      {
        id: "story_pending",
        title: "",
        kind: "historia",
        author: "",
        body: "Histórias da WAGAIA aguardam revisão editorial.",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    articles: [
      {
        id: "article_pending",
        title: "",
        excerpt: "",
        body: "Artigos da biblioteca aguardam revisão.",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    inspiring_women: [
      {
        id: "inspire_pending",
        name: "",
        attribution: "",
        body: "Perfis de Mulheres que Inspiram aguardam atribuição de autoria.",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    resources: [
      {
        id: "res_pending",
        title: "",
        theme: "direitos",
        format: "dica",
        summary: "Recursos da Biblioteca Feminista aguardam publicação.",
        url: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    courses: [
      {
        id: "course_pending",
        title: "",
        summary: "Cursos e formações aguardam datas e conteúdos confirmados.",
        format: "presencial",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    products: [
      {
        id: "product_pending",
        title: "",
        summary: "Peças do Bazar aguardam catálogo confirmado.",
        priceNote: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    support_services: [
      {
        id: "support_pending",
        name: "",
        province: "",
        supportType: "",
        phone: "",
        whatsapp: "",
        hours: "",
        cost: "",
        lastVerified: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    donation_methods: [
      {
        id: "don_mpesa",
        kind: "mpesa",
        label: "M-Pesa",
        details: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "don_emola",
        kind: "emola",
        label: "e-Mola",
        details: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "don_mkesh",
        kind: "mkesh",
        label: "mKesh",
        details: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "don_bank",
        kind: "bank",
        label: "Transferência bancária",
        details: "",
        status: "draft",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    submissions: [],
    admins: [
      {
        id: "admin_root",
        email: "admin@wagaia.org",
        passwordHash: hash("WagaiaAdmin2026!"),
        name: "Equipa WAGAIA",
      },
    ],
  };
}
