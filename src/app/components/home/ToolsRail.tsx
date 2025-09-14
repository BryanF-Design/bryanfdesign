"use client";

import { useEffect, useRef } from "react";

const ICONS = [
  { name: "Next.js",     path: "/toolkit/next.svg" },
  { name: "Node.js",     path: "/toolkit/node-js-svgrepo-com.svg" },
  { name: "TypeScript",  path: "/toolkit/typescript-16-svgrepo-com.svg" },
  { name: "Tailwind",    path: "/toolkit/tailwind-svgrepo-com.svg" },
  { name: "VS Code",     path: "/toolkit/vs-code-svgrepo-com.svg" },
  { name: "WordPress",   path: "/toolkit/wordpress-svgrepo-com.svg" },
  { name: "JavaScript",  path: "/toolkit/javascript-fill-svgrepo-com.svg" },
  { name: "HTML",        path: "/toolkit/html-svgrepo-com.svg" },
  { name: "CSS",         path: "/toolkit/css3-01-svgrepo-com.svg" },
  { name: "SEO",         path: "/toolkit/seo-3-svgrepo-com.svg" },
  { name: "PHP",         path: "/toolkit/php02-svgrepo-com.svg" },
  { name: "Adobe",       path: "/toolkit/adobe-svgrepo-com (1).svg" },
];

// Ícono monocromo en blanco con máscara (currentColor)
function MaskIcon({ path, className = "" }: { path: string; className?: string }) {
  const style: React.CSSProperties = {
    WebkitMask: `url("${path}") center / contain no-repeat`,
    mask: `url("${path}") center / contain no-repeat`,
    backgroundColor: "currentColor",
    display: "inline-block",
  };
  return <span aria-hidden className={className} style={style} />;
}

export default function ToolsRail() {
  const NORMAL = 120; // px/s
  const SLOW = 35;

  const baseRef = useRef<HTMLDivElement | null>(null);  // la “pista” base
  const trackRef = useRef<HTMLDivElement | null>(null); // el contenedor que se mueve

  const reqRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const widthRef = useRef(0);            // ancho de la pista base
  const posRef = useRef(0);              // posición en px sobre la pista base
  const speedRef = useRef(NORMAL);       // velocidad actual
  const targetSpeedRef = useRef(NORMAL); // velocidad objetivo (para easing)

  // mide el ancho real de la pista base
  const measure = () => {
    if (!baseRef.current) return;
    // getBoundingClientRect es más estable que offsetWidth para subpíxeles
    const w = baseRef.current.getBoundingClientRect().width;
    widthRef.current = w || 1;
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (baseRef.current) ro.observe(baseRef.current);
    window.addEventListener("resize", measure, { passive: true });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      // si el usuario prefiere menos animación, pausamos
      if (prefersReduced) {
        if (reqRef.current) cancelAnimationFrame(reqRef.current);
        return;
      }

      // easing hacia targetSpeed
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.12;

      const w = widthRef.current || 1;

      // avanzamos y envolvemos con módulo (evita salto)
      posRef.current = (posRef.current + speedRef.current * dt) % w;
      if (posRef.current < 0) posRef.current += w; // por si la velocidad fuese negativa

      // aplicamos transform directo (sin setState)
      const x = -posRef.current;
      if (trackRef.current) {
        // evitar jitter en pantallas raras (alinear a 0.5px ayuda a veces)
        const dpr = window.devicePixelRatio || 1;
        const snapped = Math.round(x * dpr) / dpr;
        trackRef.current.style.transform = `translate3d(${snapped}px,0,0)`;
      }

      reqRef.current = requestAnimationFrame(tick);
    };

    reqRef.current = requestAnimationFrame(tick);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      lastTsRef.current = null;
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const goSlow = () => (targetSpeedRef.current = SLOW);
  const goNormal = () => (targetSpeedRef.current = NORMAL);

  return (
    <section className="relative border-y border-white/10 bg-white/5 py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-4 text-xs uppercase tracking-widest text-white/50">
          Stack &amp; herramientas
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={goSlow}
          onMouseLeave={goNormal}
          onTouchStart={goSlow}
          onTouchEnd={goNormal}
        >
          {/* fades laterales */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0f0f10] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0f0f10] to-transparent" />

          {/* TRACK: (base + clon) dentro de un wrapper que se mueve */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {/* BASE */}
            <div ref={baseRef} className="flex min-w-max items-center gap-4 pr-4">
              {ICONS.map((it) => (
                <div
                  key={`a-${it.name}`}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/25/50 backdrop-blur px-4 py-2 text-white/80 transition-colors hover:text-white"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)" }}
                >
                  <MaskIcon path={it.path} className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  <span className="text-sm">{it.name}</span>
                  <span
                    aria-hidden
                    className="ml-1 hidden h-1 w-1 rounded-full bg-[#B4E332] opacity-0 transition-opacity group-hover:inline-block group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            {/* CLON 1 (misma estructura y mismo padding final para seam perfecto) */}
            <div className="flex min-w-max items-center gap-4 pr-4" aria-hidden>
              {ICONS.map((it) => (
                <div
                  key={`b-${it.name}`}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/25/50 backdrop-blur px-4 py-2 text-white/80 transition-colors hover:text-white"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)" }}
                >
                  <MaskIcon path={it.path} className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  <span className="text-sm">{it.name}</span>
                  <span
                    aria-hidden
                    className="ml-1 hidden h-1 w-1 rounded-full bg-[#B4E332] opacity-0 transition-opacity group-hover:inline-block group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
