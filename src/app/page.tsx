"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function ComingSoon() {
  useEffect(() => {
    // Animación del título
    gsap.fromTo(
      ".title",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );

    // Glow infinito
    gsap.to(".title", {
      textShadow: "0px 0px 20px #b4e332, 0px 0px 40px #b4e332",
      repeat: -1,
      yoyo: true,
      duration: 2,
    });

    // Partículas sencillas siguiendo el mouse
    const particles = document.querySelectorAll(".particle");
    document.addEventListener("mousemove", (e) => {
      particles.forEach((p, i) => {
        gsap.to(p, {
          x: e.clientX + Math.sin(i) * 50,
          y: e.clientY + Math.cos(i) * 50,
          duration: 1.5,
          ease: "expo.out",
        });
      });
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-[#212121] flex flex-col items-center justify-center overflow-hidden">
      {/* Texto principal */}
      <h1 className="title text-6xl md:text-8xl font-extrabold text-[#b4e332]">
        BRYANF DESIGN
      </h1>
      <p className="mt-6 text-lg text-[#F2F2F2]">
        🚀 Portafolio en construcción — Coming Soon
      </p>

      {/* Botón */}
      <a
        href="/contacto"
        className="mt-10 px-6 py-3 bg-[#b4e332] text-[#212121] rounded-lg font-bold hover:scale-110 transition-transform"
      >
        Contáctame
      </a>

      {/* Partículas */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full bg-[#b4e332] opacity-60"
        />
      ))}
    </main>
  );
}
