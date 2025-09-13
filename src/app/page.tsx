"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function ComingSoon() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#212121] flex items-center justify-center overflow-hidden">
      {/* Partículas de fondo */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#212121" },
          particles: {
            color: { value: ["#b4e332", "#F2F2F2"] },
            move: { enable: true, speed: 1, direction: "none", outModes: "bounce" },
            number: { value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
            links: { enable: true, color: "#b4e332", opacity: 0.3 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold"
          style={{ color: "#b4e332", textShadow: "0 0 20px #b4e332" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          BRYANF DESIGN
        </motion.h1>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-[#F2F2F2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🚀 Portafolio en construcción — prepárate para algo épico.
        </motion.p>

        <motion.a
          href="/contacto"
          className="inline-block mt-8 px-6 py-3 rounded-xl font-bold bg-[#b4e332] text-[#212121] hover:scale-105 transition-transform"
          whileHover={{ boxShadow: "0 0 20px #b4e332" }}
        >
          Contáctame
        </motion.a>
      </motion.div>
    </main>
  );
}
