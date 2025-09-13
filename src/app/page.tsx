"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#212121] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold tracking-tight"
          style={{ color: "#b4e332" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          BRYANF DESIGN
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl"
          style={{ color: "#F2F2F2" }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Portafolio en proceso 🚀  
          <br /> Innovación, diseño y velocidad.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#proyectos"
            className="px-6 py-3 rounded-xl font-semibold"
            style={{ backgroundColor: "#b4e332", color: "#212121" }}
          >
            Ver proyectos
          </a>
          <a
            href="/contacto"
            className="px-6 py-3 rounded-xl font-semibold border"
            style={{ borderColor: "#b4e332", color: "#b4e332" }}
          >
            Contáctame
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
