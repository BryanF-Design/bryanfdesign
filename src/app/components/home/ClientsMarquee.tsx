"use client";

import Image from "next/image";

type Brand = {
  name: string;
  path: string;
  href?: string; // opcional: abre en nueva pestaña
  raw?: boolean; // usar el archivo tal cual (ej: Cartoon Network)
};

const BRANDS: Brand[] = [
  { name: "Partum Design", path: "/clients/Partum Design.png", href: "https://partumdesign.com.mx", raw: true },
  { name: "Indusecc", path: "/clients/logo-indusecc.png", href: "https://indusecc.com.mx", raw: true },

  { name: "UFC", path: "/clients/brand-ufc-svgrepo-com.svg" },
  { name: "Cartoon Network", path: "/clients/Cartoon_Network_2010_logo.svg", raw: true }, // sin filtros
  { name: "Citibanamex", path: "/clients/Citibanamex_logo.svg" },
  { name: "Herman Miller", path: "/clients/herman-miller-1.svg" }, // ahora sí en blanco
  { name: "Hyundai", path: "/clients/hyundai-svgrepo-com.svg" },
  { name: "Mercado Libre", path: "/clients/mercado-libre-svgrepo-com.svg" },
  { name: "MillerKnoll", path: "/clients/MillerKnoll_Logo_2021.svg" },
  { name: "Warner Bros.", path: "/clients/Warner_Bros_logo.svg" },
];

// Para SVG → render como blanco
function SvgMask({ path, className = "" }: { path: string; className?: string }) {
  const style: React.CSSProperties = {
    WebkitMask: `url("${path}") center / contain no-repeat`,
    mask: `url("${path}") center / contain no-repeat`,
    backgroundColor: "currentColor",
    display: "inline-block",
  };
  return <span aria-hidden className={className} style={style} />;
}

function BrandLogo({ brand }: { brand: Brand }) {
  const isSvg = brand.path.toLowerCase().endsWith(".svg");

  // Caja uniforme
  const box = "h-12 w-40 md:h-14 md:w-48";

  if (brand.raw) {
    // Render tal cual (PNG o SVG original sin máscara)
    return (
      <div className={`relative ${box}`}>
        <Image
          src={brand.path}
          alt={brand.name}
          fill
          sizes="192px"
          className="object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  if (isSvg) {
    // SVG con máscara → blanco
    return (
      <div className={`flex items-center justify-center ${box}`}>
        <SvgMask path={brand.path} className="h-full w-full text-white" />
      </div>
    );
  }

  // PNG normal (ejemplo futuro si quieres más PNGs)
  return (
    <div className={`relative ${box}`}>
      <Image
        src={brand.path}
        alt={brand.name}
        fill
        sizes="192px"
        className="object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function ClientsGrid() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-6 text-xs uppercase tracking-widest text-white/50">
          Marcas que han confiado
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {BRANDS.map((b) => {
            const content = (
              <div
                className="group relative flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 md:p-6 text-white/80 transition hover:text-white hover:bg-white/[0.07] hover:border-white/20"
              >
                <BrandLogo brand={b} />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ boxShadow: "0 16px 40px rgba(180,227,50,0.10)" }}
                />
              </div>
            );

            return b.href ? (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                title={b.name}
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={b.name}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
