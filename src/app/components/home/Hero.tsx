"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import AboutModal from "../shared/AboutModal";

const BRAND = "#B4E332";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* foco diagonal decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 10%, rgba(180,227,50,.12), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-14 lg:px-10 lg:pt-24">
        <h1 className="text-center text-4xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
          <span className="text-[#B4E332] drop-shadow-[0_0_40px_rgba(180,227,50,.45)]">
            Web que vende
          </span>
          , rendimiento real.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-white/70">
          Next.js + animación con GSAP/Framer. Estrategia, performance y SEO real para que se vea bonito… y convierta.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Acerca de BryanF
          </button>

          <Link
            href="#projects"
            className="rounded-xl bg-[#b4e332] px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
          >
            Ver proyectos
          </Link>

          <Link
            href="/contacto"
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Let’s talk <span className="ml-1 inline-block h-2 w-2 rounded-full" style={{ background: BRAND }} />
          </Link>
        </div>
      </div>

      <AnimatePresence>{open && <AboutModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
