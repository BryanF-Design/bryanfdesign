"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BRAND = "#B4E332";

type Project = {
  slug: string;
  title: string;
  url: string;        // sitio en producción
  cover: string;      // /public/projects/<slug>-cover.jpg (o .png)
  logo?: string;      // /public/projects/<slug>-logo.svg|png
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    slug: "goldenrepublic",
    title: "Golden Republic",
    url: "https://goldenrepublic.com.mx",
    cover: "/portfolio/goldenrepublicsite.png",
    logo: "/portfolio/goldenrepubliclogo.png",
    tags: ["WordPress", "PHP", "SEO"],
  },
  {
    slug: "brasaprive",
    title: "Brasa Prive",
    url: "https://brasaprive.com.mx",
    cover: "/portfolio/brasaprivesite.png",
    logo: "/portfolio/brasaprivelogo.png",
    tags: ["WordPress", "WooCommerce", "Performance"],
  },
  {
    slug: "serviciosecem",
    title: "Servicio ECEM",
    url: "https://serviciosecem.com.mx",
    cover: "/portfolio/ecemsite.png",
    logo: "/portfolio/ecemlogo.png",
    tags: ["WordPress", "HTML", "JavaScript"],
  },
  {
    slug: "industriastritton",
    title: "Industrias Tritton",
    url: "https://industriastritton.com",
    cover: "/portfolio/trittonsite.png",
    logo: "/portfolio/trittonlogo.png",
    tags: ["WordPress", "BigData", "SEO"],
  },
];

export default function ProjectsGrid() {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Trabajos destacados
          </h2>

          <Link
            href="/proyectos"
            className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
          >
            Ver proyectos
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.03]"
            >
              {/* shine */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-1/2 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.08),transparent)] opacity-0 transition group-hover:opacity-100"
                style={{ transform: "skewX(-10deg)" }}
              />

              {/* screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <Image
                    src={p.cover}
                    alt={`${p.title} cover`}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 640px, 100vw"
                    priority={idx < 2}
                  />
                </motion.div>

                {/* soft gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,.55))]" />

                {/* logo */}
                {p.logo && (
                  <div className="absolute left-4 top-4 rounded-xl border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-sm">
                    <Image
                      src={p.logo}
                      alt={`${p.title} logo`}
                      width={120}
                      height={26}
                      className="h-[20px] w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* content */}
              <div className="relative p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-lg border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {p.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-[#b4e332] px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
                  >
                    Visitar sitio
                  </a>

                  <Link
                    href={`/projects/${p.slug}`} // futura página de case study
                    className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
                  >
                    Ver proyecto
                  </Link>
                </div>
              </div>

              {/* border glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: `0 0 0 1px ${BRAND}44, 0 0 24px ${BRAND}33 inset` }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
