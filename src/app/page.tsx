"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function ComingSoon() {
  useEffect(() => {
    // Scroll suave con Lenis
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP mouse glow effect
    const handleMove = (e: MouseEvent) => {
      gsap.to(".glow", {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 1.5,
        ease: "expo.out",
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#212121] overflow-hidden">
      {/* Fondo 3D */}
      <Canvas className="absolute inset-0 -z-10">
        {/* Cielo con estrellas */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>

      {/* Glow que sigue el mouse */}
      <div
        className="glow absolute w-[500px] h-[500px] rounded-full bg-[#b4e332]/20 blur-3xl -z-10"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />

      {/* Contenido principal */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold"
          style={{ color: "#b4e332", textShadow: "0 0 30px #b4e332" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          BRYANF DESIGN
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-2xl text-[#F2F2F2]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🚀 Portafolio en construcción  
          Innovación, diseño y velocidad.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
