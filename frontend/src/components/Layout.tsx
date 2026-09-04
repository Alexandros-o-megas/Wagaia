import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { FistIcon, HeartIcon, MegaphoneIcon } from "./Icons";
import { useSettings } from "@/hooks/usePublic";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/arte-e-historias", label: "Arte e Histórias" },
  { to: "/aprender", label: "Aprender" },
  { to: "/participar", label: "Participar" },
  { to: "/apoio", label: "Apoio" },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const instagram = settings?.instagram || "@wa_gaia";
  const handle = instagram.replace("@", "");

  return (
    <div className="min-h-screen flex flex-col bg-blush text-ink">
      <a className="skip-link" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <header className="sticky top-0 z-40 bg-blush/95 border-b-[3px] border-ink backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl px-3 py-2 flex items-center gap-3">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo compact className="h-14 md:h-16 w-auto" />
          </Link>
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1" aria-label="Principal">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 font-ui font-extrabold text-sm rounded-full border-2 ${
                    isActive ? "bg-ink text-blush border-ink" : "border-transparent hover:border-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/apoio" className="btn-rose !py-2 !px-3 text-sm">
              Preciso de Ajuda
            </Link>
            <Link to="/doar" className="btn-ink !py-2 !px-3 text-sm hidden sm:inline-flex">
              Doar
            </Link>
            <button
              type="button"
              className="lg:hidden ink-border bg-paper px-3 py-2 font-extrabold"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
        {open ? (
          <nav id="menu-mobile" className="lg:hidden border-t-[3px] border-ink bg-paper px-4 py-3 grid gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className="font-extrabold py-2"
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/doar" className="btn-ink mt-2" onClick={() => setOpen(false)}>
              Doar
            </Link>
          </nav>
        ) : null}
      </header>

      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t-[3px] border-ink bg-ink text-blush mt-8">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <Logo className="h-24 w-auto brightness-0 invert" />
            <p className="font-editorial mt-4 max-w-sm">
              {settings?.tagline || "O nosso sonho é nunca mais ter histórias para contar…"}
            </p>
            <div className="flex gap-3 mt-4">
              <MegaphoneIcon className="h-8 w-8" />
              <FistIcon className="h-8 w-8" />
              <HeartIcon className="h-8 w-8" />
            </div>
          </div>
          <div>
            <p className="font-display text-xl mb-2">Contactos</p>
            {settings?.email ? <p>{settings.email}</p> : <p>Contacto institucional em preparação.</p>}
            <p className="mt-3">
              Instagram{" "}
              <a
                className="underline font-extrabold"
                href={`https://instagram.com/${handle}`}
                rel="noreferrer"
                target="_blank"
              >
                {instagram}
              </a>
            </p>
          </div>
          <div className="grid gap-2 font-extrabold">
            <Link to="/privacidade">Política de privacidade</Link>
            <Link to="/termos">Termos de utilização</Link>
            <Link to="/partilhar">Partilhar a minha história</Link>
            <Link to="/admin">Área da equipa</Link>
          </div>
        </div>
        <div className="border-t-[3px] border-blush/30 px-4 py-4 text-sm font-editorial">
          <div className="mx-auto max-w-6xl flex flex-wrap gap-2 justify-between">
            <span>WAGAIA — associação moçambicana de artivismo.</span>
            <span>Créditos visuais: identidade oficial WAGAIA / Paula Mondlane.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
