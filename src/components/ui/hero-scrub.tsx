"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_VH_MULTIPLE = 3.2;
const IMMERSE_OVERFILL = 1.04;
const ENTRY_DELAY = 0.15;
const CARD_START_SCALE_DESKTOP = 0.62;
const CARD_START_SCALE_MOBILE = 0.84;

export type HeroScrubProps = {
  imageUrl: string;
  imageAlt?: string;
  titleTop: string;
  titleBottom: string;
  bgClassName?: string;
  aspect?: number;
};

function usePrefersReducedMotion() {
  const reducedRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
  }, []);
  return reducedRef.current;
}

export function HeroScrub({
  imageUrl,
  imageAlt = "",
  titleTop,
  titleBottom,
  bgClassName = "bg-background",
  aspect = 16 / 9,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  // Entry
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ENTRY_DELAY });
      tl.from(bgRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });
      tl.from(cardRef.current, { opacity: 0, scale: 0.92, duration: 1, ease: "power3.out" }, 0.3);
      tl.from(titleTopRef.current, { opacity: 0, y: 30, duration: 0.9, ease: "expo.out" }, 0.45);
      tl.from(titleBottomRef.current, { opacity: 0, y: -30, duration: 0.9, ease: "expo.out" }, 0.55);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Scroll choreography
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startScale = () =>
        window.innerWidth < 768 ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP;

      const immerseScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const baseW = Math.min(vw * 0.96, vh * 0.72 * aspect);
        const baseH = Math.min(vh * 0.72, (vw * 0.96) / aspect);
        if (baseW <= 0 || baseH <= 0) return 1.5;
        return Math.max(vw / baseW, vh / baseH) * IMMERSE_OVERFILL;
      };

      gsap.set(cardRef.current, { scale: startScale(), transformOrigin: "50% 50%" });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      master.to(cardRef.current, { scale: 1, ease: "power2.out", duration: 0.15 }, 0);
      master.to(
        titleTopRef.current,
        {
          x: () => (window.innerWidth < 768 ? "-70vw" : "-55vw"),
          ease: "power2.inOut",
          duration: 0.15,
        },
        0
      );
      master.to(
        titleBottomRef.current,
        {
          x: () => (window.innerWidth < 768 ? "70vw" : "55vw"),
          ease: "power2.inOut",
          duration: 0.15,
        },
        0
      );

      master.to(cardRef.current, { scale: immerseScale(), ease: "power2.in", duration: 0.63 }, 0.15);
      master.to(titleTopRef.current, { opacity: 0, ease: "power1.in", duration: 0.22 }, 0.15);
      master.to(titleBottomRef.current, { opacity: 0, ease: "power1.in", duration: 0.22 }, 0.15);

      master.to(cardRef.current, { scale: startScale(), ease: "power3.inOut", duration: 0.22 }, 0.78);
      master.to(
        titleTopRef.current,
        { x: 0, opacity: 1, ease: "power2.inOut", duration: 0.22 },
        0.78
      );
      master.to(
        titleBottomRef.current,
        { x: 0, opacity: 1, ease: "power2.inOut", duration: 0.22 },
        0.78
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, aspect]);

  const tallHeight = `${(PIN_VH_MULTIPLE + 1) * 100}vh`;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-clip text-foreground ${bgClassName}`}
      style={{ height: tallHeight }}
      aria-label="Hero animado"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
        <div ref={bgRef} aria-hidden className="absolute inset-0 z-0 bg-background" />
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, hsl(var(--primary) / 0.10) 0%, transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
        />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 md:gap-6 px-4">
          <h2
            ref={titleTopRef}
            className="font-bold tracking-tight text-foreground text-center"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            {titleTop}
          </h2>

          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] ring-1 ring-border/30 will-change-transform"
            style={{
              width: `min(96vw, calc(72svh * ${aspect}))`,
              height: `min(72svh, 96vw / ${aspect})`,
              aspectRatio: aspect,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]"
            />
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <h2
            ref={titleBottomRef}
            className="font-bold tracking-tight text-center gradient-text"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            {titleBottom}
          </h2>
        </div>
      </div>
    </section>
  );
}
