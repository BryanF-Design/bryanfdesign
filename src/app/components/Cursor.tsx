"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // No mostrar en pantallas táctiles
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) setMounted(false);
  }, []);

  const cursor = (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* circulito */}
      <div
        style={{
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          borderRadius: "9999px",
          border: "2px solid #B4E332",
          boxShadow: "0 0 12px #B4E33288",
        }}
      />
    </div>
  );

  if (!mounted) return null;
  return createPortal(cursor, document.body);
}
