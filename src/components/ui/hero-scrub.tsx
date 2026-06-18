"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_VH_MULTIPLE = 2.6;
const IMMERSE_OVERFILL = 1.04;
const ENTRY_DELAY = 0.1;
const CARD_START_SCALE_DESKTOP = 0.7;
const CARD_START_SCALE_MOBILE = 0.88;

export type HeroScrubProps = {
  imageUrl: string;
  imageAlt?: string;
  titleTop: string;
  titleBottom: string;
  bgClassName?: string;
  aspect?: number;
};

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
  const fadeRef = useRef<HTMLDivElement>(null);

  // Entry
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ENTRY_DELAY });
      tl.from(bgRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
      tl.from(cardRef.current, { opacity: 0, scale: 0.94, duration: 0.9, ease: "power3.out" }, 0.2);
      tl.from(titleTopRef.current, { opacity: 0, y: 24, duration: 0.8, ease: "expo.out" }, 0.35);
      tl.from(titleBottomRef.current, { opacity: 0, y: -24, duration: 0.8, ease: "expo.out" }, 0.45);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Scroll choreography — beginning / middle / end with smooth handoff
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startScale = () =>
        window.innerWidth < 768 ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP;

      const immerseScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const baseW = Math.min(vw * 0.92, vh * 0.6 * aspect);
        const baseH = Math.min(vh * 0.6, (vw * 0.92) / aspect);
        if (baseW <= 0 || baseH <= 0) return 1.5;
        return Math.max(vw / baseW, vh / baseH) * IMMERSE_OVERFILL;
      };

      gsap.set(cardRef.current, { scale: startScale(), transformOrigin: "50% 50%" });
      gsap.set(fadeRef.current, { opacity: 0 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // BEGINNING (0 → 0.25): titles split apart, card grows to natural size
      master.to(cardRef.current, { scale: 1, ease: "power2.out", duration: 0.25 }, 0);
      master.to(
        titleTopRef.current,
        {
          x: () => (window.innerWidth < 768 ? "-60vw" : "-45vw"),
          ease: "power2.inOut",
          duration: 0.25,
        },
        0
      );
      master.to(
        titleBottomRef.current,
        {
          x: () => (window.innerWidth < 768 ? "60vw" : "45vw"),
          ease: "power2.inOut",
          duration: 0.25,
        },
        0
      );

      // MIDDLE (0.25 → 0.75): card immerses to fill screen, titles fade out
      master.to(cardRef.current, { scale: immerseScale(), ease: "power2.inOut", duration: 0.5 }, 0.25);
      master.to(titleTopRef.current, { opacity: 0, ease: "power1.in", duration: 0.25 }, 0.25);
      master.to(titleBottomRef.current, { opacity: 0, ease: "power1.in", duration: 0.25 }, 0.25);

      // END (0.75 → 1): image fades out into background → seamless transition
      master.to(fadeRef.current, { opacity: 1, ease: "power2.in", duration: 0.25 }, 0.75);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [aspect]);

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
              "radial-gradient(ellipse at 50% 40%, hsl(var(--primary) / 0.12) 0%, transparent 60%)",
          }}
        />

        {/* Conteúdo principal — abaixo do header fixo */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 md:gap-6 px-4 pt-24 md:pt-28">
          <h2
            ref={titleTopRef}
            className="font-bold tracking-tight text-foreground text-center will-change-transform"
            style={{
              fontSize: "clamp(1.75rem, 5.5vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {titleTop}
          </h2>

          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] ring-1 ring-border/30 will-change-transform"
            style={{
              width: `min(92vw, calc(60svh * ${aspect}))`,
              height: `min(60svh, 92vw / ${aspect})`,
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
            className="font-bold tracking-tight text-center gradient-text will-change-transform"
            style={{
              fontSize: "clamp(1.75rem, 5.5vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {titleBottom}
          </h2>
        </div>

        {/* Fade final → handoff suave para a próxima seção */}
        <div
          ref={fadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 bg-background"
        />
      </div>
    </section>
  );
}
