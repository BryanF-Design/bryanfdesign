"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Opciones válidas en Lenis v1
    const lenis = new Lenis({
      duration: 1.1,         // velocidad de easing
      smoothWheel: true,     // suaviza scroll con wheel
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // opcional
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
