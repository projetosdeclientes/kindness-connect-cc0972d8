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

  // Imagem: começa visível e grande, sobe e recua (escala + opacidade) ao rolar
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.5, 0]);
  const imgBlur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const imgFilter = useTransform(imgBlur, (v) => `blur(${v}px)`);

  // Texto: começa fora (acima) e desce suavemente ocupando o lugar da imagem
  const textY = useTransform(scrollYProgress, [0, 1], [-80, 220]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0, 0.6, 1, 1]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.04]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4">
        {/* Imagem do caminhão (frente, vai para o fundo) */}
        <motion.div
          style={{ y: imgY, scale: imgScale, opacity: imgOpacity, filter: imgFilter }}
          className="absolute inset-0 flex items-center justify-center pt-24 pb-10 will-change-transform"
        >
          <img
            src={heroImg}
            alt="Interface TV Broadcasting - Unidade Móvel"
            draggable={false}
            className="max-w-[92%] md:max-w-5xl w-auto h-auto max-h-[70vh] object-contain select-none"
          />
        </motion.div>

        {/* Texto (desce e aparece) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="relative z-10 text-center max-w-3xl mx-auto will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[12px] font-medium text-primary tracking-wide mb-6">
            <Play size={10} className="fill-primary" />
            +25 anos de excelência em broadcasting
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
            <span className="text-foreground">Luz, Câmera,</span>
            <br />
            <span className="gradient-text">Trans..."Missão"</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-foreground/90 max-w-xl mx-auto leading-relaxed">
            Transformamos tecnologia em conexão para levar emoção a cada transmissão.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroScroll;
