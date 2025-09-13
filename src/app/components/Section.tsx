"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section ref={ref} className={`mx-auto max-w-6xl px-4 py-20 ${className}`}>
      {children}
    </section>
  );
}
