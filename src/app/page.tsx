"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export default function ComingSoon() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll suave
    const lenis = new Lenis();
    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Timeline de entrada + “respirar”
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }
    )
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .fromTo(ctasRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

    // “Respirar” continuo del título + glow
    gsap.to(titleRef.current, {
      textShadow: "0 0 30px #b4e332, 0 0 60px #b4e332",
      filter: "drop-shadow(0 0 12px #b4e332)",
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut",
    });

    // Parallax con mouse (título/sub/ctas)
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;  // -10 a 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 a 10
      gsap.to(titleRef.current, { x: x, y: y * 0.6, duration: 0.6, ease: "expo.out" });
      gsap.to(subRef.current, { x: x * 0.6, y: y * 0.4, duration: 0.6, ease: "expo.out" });
      gsap.to(ctasRef.current, { x: x * 0.4, y: y * 0.3, duration: 0.6, ease: "expo.out" });
      gsap.to(".glow", {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 1.2,
        ease: "expo.out",
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#212121] overflow-hidden">
      {/* Fondo 3D con estrellas visibles */}
      <Canvas className="absolute inset-0 -z-10">
        <Stars
          radius={140}
          depth={80}
          count={8000}
          factor={5}
          saturation={0}
          fade
          speed={1.2}
        />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>

      {/* Glow que sigue al mouse (más fuerte) */}
      <div
        className="glow pointer-events-none absolute w-[650px] h-[650px] rounded-full bg-[#b4e332]/22 blur-[120px] -z-10"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />

      {/* Vignette sutil para look cinematográfico */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)"
      }}/>

      {/* Contenido */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-extrabold"
          style={{ color: "#b4e332" }}
          initial={false}
        >
          BRYANF DESIGN
        </motion.h1>

        <motion.p
          ref={subRef}
          className="mt-6 text-lg md:text-2xl text-[#F2F2F2]"
          initial={false}
        >
          🚀 Portafolio en construcción — Innovación, diseño y velocidad.
        </motion.p>

        <motion.div
          ref={ctasRef}
          className="mt-10 flex gap-6"
          initial={false}
        >
          <a
            href="/proyectos"
            className="px-6 py-3 rounded-xl font-bold bg-[#b4e332] text-[#212121] hover:scale-110 transition-transform"
          >
            Ver proyectos
          </a>
          <a
            href="/contacto"
            className="px-6 py-3 rounded-xl font-bold border border-[#b4e332] text-[#b4e332] hover:bg-[#b4e332] hover:text-[#212121] transition-colors"
          >
            Contáctame
          </a>
        </motion.div>
      </section>
    </main>
  );
}
