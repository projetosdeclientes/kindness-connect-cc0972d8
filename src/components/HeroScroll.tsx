import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import heroImg from "../assets/hero-truck.png";

const HeroScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Texto desce e cresce conforme o scroll
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.85]);

  // Imagem sobe, encolhe e recua (fundo)
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const imgBlur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const imgFilter = useTransform(imgBlur, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden grid grid-rows-[auto_1fr]">
        {/* Texto (topo, desce no scroll) */}
        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-24 md:pt-28 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[12px] font-medium text-primary tracking-wide mb-5">
            <Play size={10} className="fill-primary" />
            +25 anos de excelência em broadcasting
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
            <span className="text-foreground">Luz, Câmera,</span>
            <br />
            <span className="gradient-text">Trans..."Missão"</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/90 max-w-xl mx-auto leading-relaxed">
            Transformamos tecnologia em conexão para levar emoção a cada transmissão.
          </p>
        </motion.div>

        {/* Imagem do caminhão — full bleed, sobe e recua */}
        <motion.div
          style={{ y: imgY, scale: imgScale, opacity: imgOpacity, filter: imgFilter }}
          className="relative w-full h-full overflow-hidden will-change-transform origin-top"
        >
          <img
            src={heroImg}
            alt="Interface TV Broadcasting - Unidade Móvel"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroScroll;
