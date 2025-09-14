"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BRAND = "#B4E332";

const SOCIAL = [
  { href: "https://www.facebook.com/share/1R1rS2ToKf/", label: "Facebook", iconPath: "/facebook-boxed-svgrepo-com.svg" },
  { href: "https://www.instagram.com/bryanf_design/", label: "Instagram", iconPath: "/instagram-svgrepo-com (2).svg" },
  { href: "https://wa.me/5210000000000", label: "WhatsApp", iconPath: "/whatsapp-svgrepo-com (1).svg" },
  { href: "https://github.com/BryanF-Design", label: "GitHub", iconPath: "/github-svgrepo-com.svg" },
  { href: "https://www.linkedin.com/in/bryanfdesigner", label: "LinkedIn", iconPath: "/linkedin-svgrepo-com (1).svg" },
];

function SocialGlyph({ path, className = "" }: { path: string; className?: string }) {
  const style: React.CSSProperties = {
    WebkitMask: `url("${path}") center / contain no-repeat`,
    mask: `url("${path}") center / contain no-repeat`,
    backgroundColor: "currentColor",
    display: "inline-block",
  };
  return <span aria-hidden className={className} style={style} />;
}

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 12, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 10, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl rounded-3xl border border-white/12 bg-[rgba(16,17,18,.92)] p-8 shadow-2xl"
      >
        {/* Glow superior */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }}
        />

        {/* Contenido principal */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Foto */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <Image
              src="public/me/me.png"  
              alt="BryanF"
              fill
              className="object-cover"
              sizes="(min-width:768px) 320px, 100vw"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white">Sobre mí</h2>
            <p className="mt-3 text-white/80 leading-relaxed">
              Soy <span className="text-white font-semibold">BryanF</span>, desarrollador y diseñador front-end.
              Me especializo en crear sitios <strong>rápidos, animados y medibles</strong> con Core Web Vitals en verde,
              SEO técnico y una fuerte orientación a diseño UX/UI.
            </p>
            <p className="mt-3 text-white/80 leading-relaxed">
              Mi enfoque es claro: webs que no solo se vean bien, sino que <strong>generen resultados reales</strong>.
            </p>

            {/* Redes */}
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIAL.map(({ href, label, iconPath }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition hover:bg-white/10"
                >
                  <SocialGlyph path={iconPath} className="h-[22px] w-[22px] transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de cerrar */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
