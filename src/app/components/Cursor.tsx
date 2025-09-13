"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current!, r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50 });

    const move = (e: MouseEvent) => {
      gsap.to(d, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "expo.out" });
      gsap.to(r, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "expo.out" });
    };
    window.addEventListener("mousemove", move);

    const hoverables = "a, button, .btn, .link-underline";
    const enter = () => gsap.to(r, { scale: 1.6, duration: 0.2 });
    const leave = () => gsap.to(r, { scale: 1, duration: 0.2 });
    document.querySelectorAll(hoverables).forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
