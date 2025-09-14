"use client";

import { useEffect, useMemo, useRef } from "react";

type ParticlesProps = {
  /** Color base de las partículas (rgba recomendado) */
  color?: string;
  /** Cantidad de partículas en desktop (en mobile se reduce automáticamente) */
  count?: number;
  /** Radio de influencia del mouse (px) */
  mouseRadius?: number;
  /** Fuerza de repulsión (0–1 aprox.) */
  mouseStrength?: number;
  /** Opacidad máxima (0–1) */
  maxOpacity?: number;
  /** Tamaño de partícula (px) */
  size?: number;
  /** Si quieres que pinte un glow sutil (shadowBlur) */
  glow?: boolean;
};

export default function Particles({
  color = "rgba(180,227,50,0.35)",
  count = 90,
  mouseRadius = 120,
  mouseStrength = 0.08,
  maxOpacity = 0.6,
  size = 2,
  glow = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return count;
    const w = window.innerWidth;
    if (w < 480) return Math.round(count * 0.45);
    if (w < 768) return Math.round(count * 0.65);
    if (w < 1024) return Math.round(count * 0.85);
    return count;
  }, [count]);

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
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    type P = { x: number; y: number; vx: number; vy: number; o: number };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: P[] = new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      // velocidad base muy sutil
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      o: rand(maxOpacity * 0.3, maxOpacity),
    }));

    // interacción mouse (repulsión suave)
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

      if (glow) {
        ctx.shadowBlur = 16;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = color;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // repulsión del mouse
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const f = (1 - dist / mouseRadius) * mouseStrength;
            p.vx += (dx / (dist || 1)) * f;
            p.vy += (dy / (dist || 1)) * f;
          }
        }

        // drift sutil
        p.x += p.vx;
        p.y += p.vy;

        // fricción leve para que no se “disparen”
        p.vx *= 0.985;
        p.vy *= 0.985;

        // wrap edges (aparecen por el otro lado)
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [particleCount, color, maxOpacity, size, mouseRadius, mouseStrength, glow]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 -z-10 h-full w-full"
    />
  );
}
