"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "#B4E332";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/proyectos", label: "Projects" },
];

// Íconos locales en /public
const SOCIAL = [
  { href: "https://www.facebook.com/tuusuario", label: "Facebook", iconPath: "/facebook-boxed-svgrepo-com.svg" },
  { href: "https://www.instagram.com/tuusuario", label: "Instagram", iconPath: "/instagram-svgrepo-com (2).svg" },
  { href: "https://wa.me/5210000000000", label: "WhatsApp", iconPath: "/whatsapp-svgrepo-com (1).svg" },
  { href: "https://github.com/tuusuario", label: "GitHub", iconPath: "/github-svgrepo-com.svg" },
  { href: "https://www.linkedin.com/in/tuusuario", label: "LinkedIn", iconPath: "/linkedin-svgrepo-com (1).svg" },
];

// SVG como máscara para colorearlo con currentColor
function SocialGlyph({ path, className = "" }: { path: string; className?: string }) {
  const style: React.CSSProperties = {
    WebkitMask: `url("${path}") center / contain no-repeat`,
    mask: `url("${path}") center / contain no-repeat`,
    backgroundColor: "currentColor",
    display: "inline-block",
  };
  return <span aria-hidden className={className} style={style} />;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Headroom + estado scrolled
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > lastY && y > 140);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
  }, [open]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const activeIndex = useMemo(
    () => NAV.findIndex((n) => n.href === pathname),
    [pathname]
  );

  return (
    <header
      className={`sticky top-0 z-[70] transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      aria-label="Primary navigation"
    >
      {/* Wrapper con overflow-hidden para evitar ancho fantasma */}
      <div className="relative w-full overflow-hidden">
        {/* Blur para legibilidad */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ backdropFilter: "saturate(1.15) blur(8px)", WebkitBackdropFilter: "saturate(1.15) blur(8px)" }}
        />
        {/* Ribbon diagonal */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-7 h-[84px] -z-10 origin-top"
          style={{
            transform: "skewY(-2.4deg)",
            background: "linear-gradient(180deg, rgba(0,0,0,.88), rgba(0,0,0,.62))",
            boxShadow: "inset 0 -1px 0 rgba(255,255,255,.10), 0 8px 40px rgba(0,0,0,.35)",
            maskImage: "radial-gradient(120% 100% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        {/* Línea de luz */}
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-[2px] h-[2px] -z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
            backgroundSize: "200% 100%",
            backgroundPositionX: "0%",
          }}
          animate={{ backgroundPositionX: ["0%", "200%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />

        <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: scrolled ? 66 : 78, transition: "height .25s ease" }}>
            {/* LOGO (con layoutId para transición desde el preloader) */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                layoutId="brand-logo"
                initial={false}
                animate={{ scale: scrolled ? 0.92 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="relative h-10 w-[210px] md:h-12 md:w-[250px]"
              >
                <Image
                  src="/LOGOTIPO_BLANCO.png"
                  alt="BRYANF DESIGN"
                  fill
                  className="object-contain"
                  sizes="(min-width:1024px) 250px, 210px"
                  priority
                />
              </motion.div>
            </Link>

            {/* NAV Desktop */}
            <div className="relative hidden md:flex items-center gap-3">
              <div className="relative flex rounded-2xl border border-white/14 bg-white/[.06] p-1 backdrop-blur">
                {/* Píldora activa */}
                <AnimatePresence initial={false}>
                  {activeIndex >= 0 && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute z-0 h-10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 420, damping: 28 }}
                      style={{ background: "rgba(255,255,255,.08)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)" }}
                    />
                  )}
                </AnimatePresence>

                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative z-10 h-10 px-5 inline-flex items-center justify-center rounded-xl text-sm transition ${active ? "text-white" : "text-white/80 hover:text-white"}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <motion.span whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                        {item.label}
                      </motion.span>

                      {active && (
                        <motion.span
                          layoutId="laser-underline"
                          className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[2px] rounded-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, #fff, ${BRAND}, transparent)`,
                            boxShadow: `0 0 18px ${BRAND}AA`,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 32 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/contacto"
                className="group inline-flex h-10 items-center justify-center rounded-xl border border-white/18 bg-white/10 px-4 text-sm hover:bg-white/15 transition shadow-[0_0_0_1px_rgba(255,255,255,.08)]"
              >
                <span className="font-medium">Let’s talk</span>
                <span aria-hidden className="ml-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND, boxShadow: `0 0 12px ${BRAND}88` }} />
              </Link>
            </div>

            {/* HAMBURGER → X */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative h-11 w-12 grid place-items-center rounded-xl border border-white/18 bg-white/10 hover:bg-white/15 transition"
            >
              <span className={`absolute h-[2px] w-6 bg-white transition-transform origin-center ${open ? "rotate-45" : "-translate-y-[6px]"}`} />
              <span className={`absolute h-[2px] w-6 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute h-[2px] w-6 bg-white transition-transform origin-center ${open ? "-rotate-45" : "translate-y-[6px]"}`} />
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: `0 0 24px ${BRAND}33` }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Dock de redes (desktop) */}
      <aside className="fixed right-4 top-[calc(50svh)] hidden -translate-y-1/2 lg:flex flex-col gap-2 z-[65]" aria-label="Social links">
        {SOCIAL.map(({ href, label, iconPath }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative grid place-items-center h-11 w-11 rounded-xl border border-white/20 bg-[rgba(18,19,20,.92)] hover:bg-[rgba(26,27,29,.96)] transition"
            aria-label={label}
            title={label}
            style={{ boxShadow: "0 8px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.05)", color: "white" }}
          >
            <SocialGlyph path={iconPath} className="h-[20px] w-[20px] group-hover:scale-110 transition-transform" />
            <span className="pointer-events-none absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-[rgba(18,19,20,.98)] px-2 py-1 text-xs text-white/85 opacity-0 group-hover:opacity-100 transition">
              {label}
            </span>
          </a>
        ))}
      </aside>

      {/* Menú móvil full-page */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/90 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Botón X */}
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] h-12 w-12 grid place-items-center rounded-xl border border-white/18 bg-white/10"
            >
              <span className="block h-[2px] w-6 rotate-45 bg-white" />
              <span className="block h-[2px] w-6 -rotate-45 bg-white -translate-y-[2px]" />
            </button>

            {/* Panel central */}
            <motion.div
              key="sheet"
              initial={{ opacity: 0, scale: 0.97, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-[100svh] flex-col items-center justify-center px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[rgba(16,17,18,.85)] backdrop-blur-xl p-5 shadow-2xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ boxShadow: `0 20px 80px ${BRAND}22, inset 0 1px 0 rgba(255,255,255,.06)` }}
                />

                <motion.ul
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                    show: { transition: { staggerChildren: 0.07 } },
                  }}
                  className="w-full space-y-4"
                >
                  {NAV.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                          show: { opacity: 1, y: 0, filter: "blur(0px)" },
                        }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          className={`block w-full text-center text-2xl px-6 py-5 rounded-2xl ${
                            active ? "text-white bg-white/10 border border-white/15" : "text-white/90 hover:bg-white/10"
                          }`}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}

                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href="/contacto"
                      className="block w-full text-center text-2xl px-6 py-5 rounded-2xl text-black"
                      style={{ background: BRAND, boxShadow: `0 8px 34px ${BRAND}66, inset 0 0 0 1px #00000022` }}
                    >
                      Let’s talk
                    </Link>
                  </motion.li>
                </motion.ul>

                {/* Redes dentro del panel */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  {SOCIAL.map(({ href, label, iconPath }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid place-items-center h-12 w-12 rounded-2xl border border-white/18 bg-white/10 hover:bg-white/15 transition text-white"
                      aria-label={label}
                      title={label}
                    >
                      <SocialGlyph path={iconPath} className="h-[22px] w-[22px]" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
