"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const path = usePathname();
  const active = path === href;
  return (
    <Link
      href={href}
      className={`link-underline ${active ? "text-white" : "text-white/80"}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10"
    >
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
        <Link href="/" className="font-black tracking-widest text-[#b4e332]">BRYANF</Link>
        <div className="flex gap-6 text-sm">
          <NavLink href="/servicios">Servicios</NavLink>
          <NavLink href="/proyectos">Proyectos</NavLink>
          <Link href="/contacto" className="px-3 py-1 rounded-lg bg-[#b4e332] text-black font-semibold">Contacto</Link>
        </div>
      </div>
    </motion.nav>
  );
}
