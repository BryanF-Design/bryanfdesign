"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BRAND = "#B4E332";

export default function Preloader() {
  const [show, setShow] = useState(false);

  // Solo la primera carga del sitio (no en navegación interna)
  useEffect(() => {
    // Usa sessionStorage para esta sesión del navegador
    const seen = sessionStorage.getItem("seen-preloader");
    if (!seen) {
      setShow(true);
      // Duración total antes de soltar al header
      const t = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("seen-preloader", "1");
      }, 1400); // ajusta si quieres más show
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,.2), rgba(0,0,0,.95) 60%)",
          }}
        >
          {/* Haz / glow de fondo */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(40% 30% at 50% 50%, ${BRAND}22, transparent 60%)`,
              filter: "blur(18px)",
            }}
          />

          {/* LOGO centrado con layoutId compartido */}
          <motion.div
            layoutId="brand-logo" // <- clave para volar al header
            className="relative h-16 w-[260px] md:h-20 md:w-[320px]"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.06, 1] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/LOGOTIPO_BLANCO.png"
              alt="BRYANF DESIGN"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Anillo de energía */}
          <motion.span
            aria-hidden
            className="absolute h-28 w-28 rounded-full"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.15, 1.35], opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              boxShadow: `0 0 12px ${BRAND}55, inset 0 0 0 2px ${BRAND}`,
              filter: "blur(0.8px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
