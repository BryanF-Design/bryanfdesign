"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BRAND = "#B4E332";

/* -------------------- Partículas (fondo) -------------------- */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; o: number };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const count = w < 480 ? 35 : w < 768 ? 55 : 90;
    const parts: P[] = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      o: rand(0.25, 0.55),
    }));

    // Escuchamos el mouse sobre el CANVAS (debe tener pointer-events)
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => (mouse.current.active = false);

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(180,227,50,0.35)";
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(180,227,50,0.35)";

      for (const p of parts) {
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            const f = (1 - d / 120) * 0.08;
            p.vx += (dx / (d || 1)) * f;
            p.vy += (dy / (d || 1)) * f;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        // wrap suave
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full" // z-0: por ENCIMA del fondo base
    />
  );
}

/* -------------------- CTA -------------------- */
export default function CTA() {
  return (
    // Full width: la sección no tiene max-w; el fondo ocupa todo.
    <section className="relative w-full overflow-hidden">
      {/* Fondo base (queda por DETRÁS de las partículas) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0d0f0e] via-[#0a0a0a] to-[#111]" />

      {/* Partículas encima del fondo */}
      <Particles />

      {/* Glow suave */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-[140px] opacity-20"
        style={{ background: BRAND }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Contenido con su propio contenedor */}
      <div className="relative mx-auto w-full max-w-5xl px-6  sm:py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
        >
          Impulsa tu proyecto con diseño y performance reales
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-white/70"
        >
          Webs veloces, animadas y con SEO que convierte. Hablemos de objetivos
          y lo construimos.
        </motion.p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contacto"
            className="relative inline-flex items-center justify-center rounded-xl px-7 py-4 text-base sm:text-lg font-semibold text-black transition"
            style={{
              background: BRAND,
              boxShadow: `0 0 24px ${BRAND}66, inset 0 0 0 1px #00000022`,
            }}
          >
            Iniciar proyecto
          </Link>

          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-base sm:text-lg font-medium text-white/85 hover:bg-white/15 hover:text-white transition"
          >
            Ver proyectos
          </Link>
        </div>

        {/* Línea de luz inferior */}
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPositionX: ["0%", "200%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}
