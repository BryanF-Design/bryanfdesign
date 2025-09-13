"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({
  children,
  href = "#",
  variant = "solid",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.25,
        y: (e.clientY - (r.top + r.height / 2)) * 0.25,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const leave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-outline"}`}
    >
      {children}
    </a>
  );
}
