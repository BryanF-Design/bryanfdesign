import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LayoutGroup } from "framer-motion";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRYANF DESIGN",
  description: "Sitios rápidos, animados y con SEO pro.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f0f10] text-white`}>
        {/* Agrupa toda la app para shared element transitions */}
        <LayoutGroup id="bryanf-site">
          {/* Preloader solo en la primera entrada de la sesión */}
          <Preloader />

          {/* Navbar siempre arriba */}
          <Navbar />

          {/* Cursor personalizado (se oculta en móvil) */}
          <Cursor />

          {/* Contenido */}
          {children}

          {/* Footer */}
          <Footer />
        </LayoutGroup>
      </body>
    </html>
  );
}
