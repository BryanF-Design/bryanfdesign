"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const pathname = usePathname();
  const search = useSearchParams();
  const fullPath = `${pathname}${search?.toString() ? `?${search!.toString()}` : ""}`;

  return (
    <main className="min-h-[100svh] bg-[#0f0f10] text-white grid place-items-center px-4">
      {/* Fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60rem 60rem at 10% 10%, rgba(255,255,255,.06), transparent 60%), radial-gradient(40rem 30rem at 80% 20%, rgba(0,171,255,.12), transparent 60%), radial-gradient(50rem 40rem at 50% 90%, rgba(120,0,255,.12), transparent 60%)",
        }}
      />

      <section className="relative z-10 w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block text-xs tracking-widest uppercase text-white/60 mb-3">
            Error 404
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Página no encontrada
          </h1>
          <p className="text-white/70 mt-4">
            Aún no existe esta ruta, o cambió de lugar.{" "}
            <span className="text-white/50">({fullPath})</span>
          </p>
        </motion.div>

        {/* “Card” con sugerencias */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6"
        >
          <ul className="text-left text-white/80 space-y-3 max-w-prose mx-auto">
            <li>• Revisa que el enlace esté bien escrito.</li>
            <li>• Puede que el proyecto aún esté en construcción.</li>
            <li>• Vuelve al inicio o explora los proyectos publicados.</li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl h-11 px-5 border border-white/15 bg-white/10 hover:bg-white/15 transition"
            >
              Ir al inicio
            </Link>
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center rounded-xl h-11 px-5 border border-white/15 hover:border-white/25"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl h-11 px-5 border border-white/15 hover:border-white/25"
            >
              Contacto
            </Link>
          </div>
        </motion.div>

        {/* Micro detalle animado */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 text-xs text-white/50"
        >
          Tip: presiona <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">H</kbd> para volver al inicio.
        </motion.div>
      </section>

      {/* Atajo teclado */}
      <ScriptlessHomeHotkey />
    </main>
  );
}

function ScriptlessHomeHotkey() {
  // pequeño handler sin dependencias externas
  if (typeof window !== "undefined") {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") window.location.href = "/";
    };
  }
  return null;
}
