"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      // Eén viewport vooruit (B4, KAN-425): de inhoud is al zichtbaar voordat hij
      // in beeld komt, dus niemand leest een kop die nog aan het faden is, en een
      // full-page screenshot is niet meer half leeg. prefers-reduced-motion staat
      // in globals.css.
      { threshold: 0, rootMargin: "0px 0px 100% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
