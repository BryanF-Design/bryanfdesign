import Link from "next/link";
import Image from "next/image";

const BRAND = "#B4E332";

const SOCIAL = [
  { href: "https://www.facebook.com/profile.php?id=61580675727850", label: "Facebook", iconPath: "/facebook-boxed-svgrepo-com.svg" },
  { href: "https://www.instagram.com/bryanf_design/", label: "Instagram", iconPath: "/instagram-svgrepo-com (2).svg" },
  { href: "https://wa.me/5210000000000", label: "WhatsApp", iconPath: "/whatsapp-svgrepo-com (1).svg" },
  { href: "https://github.com/BryanF-Design", label: "GitHub", iconPath: "/github-svgrepo-com.svg" },
  { href: "https://www.linkedin.com/in/bryanfdesigner/", label: "LinkedIn", iconPath: "/linkedin-svgrepo-com (1).svg" },
];

function SocialGlyph({ path, className = "" }: { path: string; className?: string }) {
  const style: React.CSSProperties = {
    WebkitMask: `url("${path}") center / contain no-repeat`,
    mask: `url("${path}") center / contain no-repeat`,
    backgroundColor: "currentColor",
    display: "inline-block",
  };
  return <span aria-hidden className={className} style={style} />;
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-[rgba(10,10,11,.95)] backdrop-blur-xl border-t border-white/10">
      {/* Glow superior */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
          filter: "drop-shadow(0 0 8px rgba(180,227,50,.65))",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Columna Marca */}
          <div className="space-y-6">
            <div className="relative h-10 w-[210px] md:h-12 md:w-[250px]">
              <Image
                src="/LOGOTIPO_BLANCO.png"
                alt="BRYANF DESIGN"
                fill
                className="object-contain"
                sizes="(min-width:1024px) 250px, 210px"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Next.js + animación, performance y SEO real. <br />
              <span className="text-white">Diseño que vende</span>, no sólo que luce.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ href, label, iconPath }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition
                             hover:bg-white/10 hover:border-white/20"
                >
                  <SocialGlyph path={iconPath} className="h-[20px] w-[20px] transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna Navegación */}
          <nav className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-white/50">Navegación</p>
            <ul className="grid gap-3 text-sm">
              <li>
                <Link href="/" className="group inline-flex items-center gap-2 text-white/85 hover:text-white">
                  <span className="inline-block h-[2px] w-0 bg-white/50 transition-all group-hover:w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="group inline-flex items-center gap-2 text-white/85 hover:text-white">
                  <span className="inline-block h-[2px] w-0 bg-white/50 transition-all group-hover:w-4" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                >
                  Let’s talk
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: BRAND, boxShadow: `0 0 10px ${BRAND}AA` }}
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Columna Contacto */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-white/50">Contacto</p>
            <a
              href="mailto:bryanf@bryanfdesign.com.mx"
              className="block rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10"
            >
              bryanf@bryanfdesign.com.mx
            </a>
            <a
              href="https://wa.me/5210000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10"
            >
              WhatsApp disponible
            </a>
            <div className="rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-white/70">
                ¿Proyecto en mente? <span className="text-white">Cotiza</span> sin compromiso.
              </p>
              <Link
                href="/contacto"
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#b4e332] px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
              >
                Iniciar proyecto
              </Link>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BryanF Design. All rights reserved.</p>
          <p className="text-white/40">
            Hecho con Next.js • Animación y performance reales •{" "}
            <span className="text-white/60">MX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
