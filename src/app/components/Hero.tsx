"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // split helper (stagger por letra)
  // Hero.tsx
const splitText = (text: string) => {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <span key={`w-${wi}`} className="word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {word.split("").map((ch, ci) => (
        <span key={`c-${wi}-${ci}`} className="char" style={{ display: "inline-block", willChange: "transform" }}>
          {ch}
        </span>
      ))}
      {wi < words.length - 1 ? <span className="space" aria-hidden="true"> </span> : null}
    </span>
  ));
};


  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll(".split > span");

    gsap.set([titleRef.current, subRef.current, ctasRef.current, badgeRef.current], {
      opacity: 0,
      y: 16,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.1")
      .fromTo(
        letters || [],
        { opacity: 0, y: 40, rotateX: 30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025 },
        "-=0.3"
      )
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");

    // brillo respirando
    gsap.to(titleRef.current, {
      textShadow: "0 0 24px #b4e332, 0 0 44px #b4e332",
      filter: "drop-shadow(0 0 8px #b4e332)",
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Fondo hero (gradiente + ruido + halo) */}
      <div className="hero-bg" aria-hidden />
      <div className="hero-noise" aria-hidden />
      <div className="hero-halo" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 pt-32 md:pt-40 pb-20 md:pb-28 text-center relative z-10">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-white/80"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#b4e332]" />
          <span>¡BIENVENIDOS!</span>
        </div>

        {/* Title */}
        <h1
  ref={titleRef}
  className="mt-5 text-[clamp(38px,8vw,100px)] font-black leading-[0.95] text-[#b4e332]" // sin tracking-tight
>

          <span className="split">{splitText("Potencia brutal, rendimiento real.")}</span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="mt-5 text-[clamp(16px,2.2vw,22px)] text-white/85 max-w-2xl mx-auto"
        >
          Next.js + animación con GSAP. Estrategia, performance y SEO real para que vendas, no
          solo se vea bonito.
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="mt-8 md:mt-10 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
        >
          <MagneticButton href="/proyectos" variant="solid">Ver proyectos</MagneticButton>
          <MagneticButton href="/contacto" variant="outline">Cotizar</MagneticButton>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-14 flex justify-center">
          <div className="scroll-cue">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
