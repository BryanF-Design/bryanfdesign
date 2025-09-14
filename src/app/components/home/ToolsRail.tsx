"use client";

import { useEffect, useRef, useState } from "react";

const ICONS = [
  { name: "Next.js",     path: "/toolkit/next.svg" },
  { name: "Node.js",     path: "/toolkit/node-js-svgrepo-com.svg" },
  { name: "TypeScript",  path: "/toolkit/typescript-16-svgrepo-com.svg" },
  { name: "Tailwind",    path: "/toolkit/tailwind-svgrepo-com.svg" },
  { name: "VS Code",     path: "/toolkit/vs-code-svgrepo-com.svg" },
  { name: "WordPress",   path: "/toolkit/wordpress-svgrepo-com.svg" },
];

// ícono monocromo en blanco con máscara (currentColor)
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

  const baseRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const [x, setX] = useState(0);
  const [baseWidth, setBaseWidth] = useState(0);
  const speedRef = useRef(NORMAL);
  const targetSpeedRef = useRef(NORMAL);

  useEffect(() => {
    const measure = () => {
      if (baseRef.current) setBaseWidth(baseRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.12;

      const w = baseWidth || 1;
      posRef.current += speedRef.current * dt;

      if (posRef.current >= w) posRef.current -= w;
      if (posRef.current < 0) posRef.current += w;

      setX(-posRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [baseWidth]);

  const goSlow = () => (targetSpeedRef.current = SLOW);
  const goNormal = () => (targetSpeedRef.current = NORMAL);

  return (
    <section className="relative border-y border-white/10 bg-white/5 py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-4 text-xs uppercase tracking-widest text-white/50">
          Stack & herramientas
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

          {/* track con estilo distinto al de clientes */}
          <div
            className="flex will-change-transform"
            style={{ transform: `translate3d(${x}px, 0, 0)` }}
          >
            {/* base */}
            <div ref={baseRef} className="flex min-w-max items-center gap-4 pr-4">
              {ICONS.map((it) => (
                <div
                  key={`a-${it.name}`}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/25/50 backdrop-blur px-4 py-2 text-white/80 transition-all hover:text-white"
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
            {/* duplicado */}
            <div className="flex min-w-max items-center gap-4 pr-4">
              {ICONS.map((it) => (
                <div
                  key={`b-${it.name}`}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/25/50 backdrop-blur px-4 py-2 text-white/80 transition-all hover:text-white"
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
