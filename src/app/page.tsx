"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ComingSoon() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnetRefs = useRef<HTMLAnchorElement[]>([]);

  // util para registrar refs de botones
  const setMagnetRef = (el: HTMLAnchorElement | null) => {
    if (el && !magnetRefs.current.includes(el)) magnetRefs.current.push(el);
  };

  useEffect(() => {
    // ====== HERO TIMELINE ======
    const letters = titleRef.current?.querySelectorAll(".split > span");
    gsap.set([titleRef.current, subRef.current, ctasRef.current], { opacity: 0, y: 20 });
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        letters || [],
        { opacity: 0, y: 40, rotateX: 35 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03 },
        "-=0.3"
      )
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

    // Glow “respirar”
    gsap.to(titleRef.current, {
      textShadow: "0 0 26px #b4e332, 0 0 42px #b4e332",
      filter: "drop-shadow(0 0 10px #b4e332)",
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut",
    });

    // ====== PARALLAX CON MOUSE + GLOW FOLLOW ======
    const glow = document.querySelector<HTMLDivElement>(".glow");
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(titleRef.current, { x, y: y * 0.6, duration: 0.5, ease: "expo.out" });
      gsap.to(subRef.current, { x: x * 0.6, y: y * 0.4, duration: 0.5, ease: "expo.out" });
      gsap.to(ctasRef.current, { x: x * 0.4, y: y * 0.3, duration: 0.5, ease: "expo.out" });
      if (glow) {
        gsap.to(glow, {
          x: e.clientX - window.innerWidth / 2,
          y: e.clientY - window.innerHeight / 2,
          duration: 1,
          ease: "expo.out",
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    // ====== BOTONES MAGNÉTICOS ======
    const onMagnetMove = (e: MouseEvent, el: HTMLAnchorElement) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.25,
        y: (e.clientY - (r.top + r.height / 2)) * 0.25,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const onMagnetLeave = (el: HTMLAnchorElement) =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });

    magnetRefs.current.forEach((el) => {
      el.addEventListener("mousemove", (e) => onMagnetMove(e as MouseEvent, el));
      el.addEventListener("mouseleave", () => onMagnetLeave(el));
    });

    // ====== CANVAS: ESTELA DEL MOUSE ======
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.scale(DPR, DPR);

    const parts: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.scale(DPR, DPR);
    };
    window.addEventListener("resize", resize);

    let mx = w / 2,
      my = h / 2;
    const push = (x: number, y: number) => {
      for (let i = 0; i < 6; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 1.5 + 0.5;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          size: Math.random() * 3 + 1.5,
        });
      }
    };
    const moveTrail = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      push(mx, my);
    };
    window.addEventListener("mousemove", moveTrail);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      // composite para brillo
      ctx.globalCompositeOperation = "lighter";
      parts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.965;
        if (p.life < 0.02) parts.splice(i, 1);
        const alpha = p.life * 0.8;
        // mezcla de verdes + gris claro
        const color = Math.random() < 0.6 ? "#b4e332" : "#F2F2F2";
        ctx.fillStyle = `rgba(${color === "#b4e332" ? "180,227,50" : "242,242,242"},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      // volver a normal para próximos frames
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(loop);
    };
    loop();

    // limpieza
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", moveTrail);
      window.removeEventListener("resize", resize);
      magnetRefs.current.forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  // helper para dividir el título en spans (stagger)
  const splitText = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} style={{ display: "inline-block", willChange: "transform" }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f10]">
      {/* Aurora + grain */}
      <div className="aurora" />
      <div className="grain" />
      {/* Glow que sigue el mouse */}
      <div className="glow" />
      {/* Canvas estela */}
      <canvas ref={canvasRef} className="trail" />

      {/* Contenido */}
      <section ref={heroRef} className="relative z-10 min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="title text-[clamp(42px,8vw,104px)] font-extrabold leading-[0.95] tracking-tight"
            style={{ color: "#b4e332" }}
          >
            <span className="split">{splitText("BRYANF DESIGN")}</span>
          </h1>

          <p
            ref={subRef}
            className="mt-5 text-lg md:text-2xl text-white/85 max-w-2xl mx-auto"
          >
            Portafolio en construcción — animación, detalle y velocidad.
          </p>

          <div ref={ctasRef} className="mt-10 flex items-center justify-center gap-6">
            <a ref={setMagnetRef} href="/proyectos" className="btn btn-solid">
              Ver proyectos
            </a>
            <a ref={setMagnetRef} href="/contacto" className="btn btn-outline">
              Contáctame
            </a>
          </div>

          {/* Marquee skills */}
          <div className="marquee-wrap">
            <div className="marquee">
              <span>Next.js • GSAP • Framer • Three • SEO • Branding • UI • </span>
              <span>Next.js • GSAP • Framer • Three • SEO • Branding • UI • </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
