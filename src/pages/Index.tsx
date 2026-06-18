import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Tv, Satellite, Truck, Zap, Play, Radio, Users, Award } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import AuroraBackground from "../components/AuroraBackground";
import heroImg from "../assets/hero-truck.png";
import HeroCrossfade from "../components/HeroCrossfade";
import { Typewriter } from "@/components/ui/typewriter-text";

import TiltCard from "../components/TiltCard";
import CountUp from "../components/CountUp";
import Magnetic from "../components/Magnetic";

const showcaseItems = [
  { title: "Olimpíadas Brasil", image: "/images/case-olimpiadas.jpg" },
  { title: "Sulamericana 2021", image: "/images/case-sulamericana.jpg" },
  { title: "UFC", image: "/images/case-ufc.jpg" },
  { title: "Copa do Nordeste – Fox Sports", image: "/images/case-copa-nordeste.jpg" },
  { title: "Superliga Masculina 19/20", image: "/images/portfolio-4.jpeg" },
  { title: "Anjos Cantam Jorge & Mateus", image: "/images/portfolio-10.jpeg" },
];

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "04", desc: "Transmissão completa de última geração" },
  { icon: Satellite, title: "DSNGs", count: "02", desc: "Links satelitais para qualquer local" },
  { icon: Tv, title: "Vans Executivas", count: "02", desc: "Mobilidade e conforto para o cliente" },
  { icon: Zap, title: "Geradores de Energia", count: "02", desc: "Autonomia total em qualquer ambiente" },
];

const team = [
  { name: "Caca", role: "Diretor", image: "/images/team-caca.jpg" },
  { name: "Fernando", role: "Diretor Geral", image: "/images/team-fernando.png" },
  { name: "Roberto", role: "Gerente Geral / Novos Negócios", image: "/images/team-roberto.jpg" },
];

const stats = [
  { value: "25+", label: "Anos de Experiência", icon: Award },
  { value: "6", label: "Bases no Brasil", icon: Radio },
  { value: "30+", label: "Clientes Ativos", icon: Users },
  { value: "5", label: "Unidades Móveis de Transmissão", icon: Truck },
];

const stagger = {
  parent: { transition: { staggerChildren: 0.08 } },
  child: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero mobile: composição imersiva com imagem + texto sobreposto */}
      <section className="md:hidden relative w-full overflow-hidden bg-background">
        <div className="relative w-full h-[78svh] min-h-[560px] flex flex-col">
          {/* Glow de fundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />

          {/* Conteúdo textual */}
          <div className="relative z-20 pt-24 px-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.18em] text-primary border border-primary/25 bg-primary/5 mb-5">
              Interface TV Broadcasting
            </span>
            <h1 className="text-[2.6rem] xs:text-5xl font-bold leading-[1.02] tracking-tight min-h-[5.2rem]">
              <span className="text-white">Luz, Câmera,</span>
              <br />
              <Typewriter
                text={['Trans..."Missão"']}
                speed={80}
                deleteSpeed={40}
                delay={2500}
                loop
                cursor="▍"
                cursorClassName="gradient-text animate-pulse ml-0.5"
                className="gradient-text"
              />
            </h1>
            <p className="mt-4 text-[15px] text-foreground/80 max-w-sm mx-auto leading-relaxed">
              Transformamos tecnologia em conexão para levar emoção a cada transmissão.
            </p>
          </div>

          {/* Imagem ancorada na base, inteira, sem corte */}
          <div className="relative z-10 flex-1 mt-2">
            <HeroCrossfade className="absolute inset-x-0 bottom-0 w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Fade para a próxima seção */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none" />
        </div>
      </section>

      {/* Hero desktop: caminhão sticky no fundo */}
      <section className="hidden md:block relative w-full md:h-[90vh] sticky top-0 z-0 overflow-hidden bg-background">
        <HeroCrossfade className="absolute inset-0 w-full h-full object-cover" />
      </section>

      <section className="hidden md:block relative z-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-28">
          <h1 className="text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight min-h-[10rem]">
            <span className="text-white">Luz, Câmera,</span>
            <br />
            <Typewriter
              text={['Trans..."Missão"']}
              speed={80}
              deleteSpeed={40}
              delay={2500}
              loop
              cursor="▍"
              cursorClassName="gradient-text animate-pulse ml-1"
              className="gradient-text"
            />
          </h1>
          <p className="mt-6 text-lg text-foreground/90 max-w-xl mx-auto leading-relaxed">
            Transformamos tecnologia em conexão para levar emoção a cada transmissão.
          </p>
        </div>
      </section>



      {/* Stats */}
      <section className="relative overflow-hidden border-t border-border/30">
        <AuroraBackground />
        <div className="absolute inset-0 grid-pattern opacity-8" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <TiltCard key={s.label} className="group rounded-2xl">
                  <div className="p-4 sm:p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 hover:border-primary/40 transition-colors h-full">
                    <s.icon size={18} className="text-primary mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
                      <CountUp value={s.value} />
                    </div>
                    <div className="text-sm text-foreground/90 mt-1 tracking-wide font-medium">{s.label}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>




      {/* Clients */}
      <section className="relative py-12 md:py-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Parceiros" title="Clientes" subtitle="Conheça alguns de nossos clientes e parceiros de confiança." />
          <AnimatedSection>
            <div className="max-w-6xl mx-auto p-6 md:p-10 rounded-3xl bg-white/90 border border-border/30 shine">
              <img src="/images/clientes-grid.png" alt="Logos dos clientes da Interface TV" className="w-full hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="text-center mt-8">
              <Link to="/clientes" className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 font-medium">
                Ver todos os clientes <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-32 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <AnimatedSection>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] text-primary border border-primary/20 bg-primary/5 mb-6">
                  Sobre nós
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Mais de 25 anos transformando a{" "}
                  <span className="gradient-text">transmissão audiovisual</span>{" "}
                  no Brasil
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  A <strong className="text-foreground">INTERFACETV BROADCASTING</strong> é uma produtora de vídeo, que se especializou em transmissão de eventos para canais de televisão, agência de publicidade e internet.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Trabalhamos com produções e gravações de programas esportivos, entretenimento, institucionais, corporativos e produções independentes.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Equipe de profissionais com mais de 25 anos de experiência no mercado de áudio visual brasileiro, com ampla capacidade e qualidade técnica entregamos a sua empresa os melhores resultados do mercado.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <Link to="/quem-somos" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium group">
                  Conheça nossa história
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s, i) => (
                  <TiltCard key={s.title} intensity={8} className={`group rounded-2xl ${i === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="p-5 md:p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/30 transition-all duration-300 shine h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <s.icon size={16} className="text-primary" />
                        </div>
                        <span className="text-xl font-bold text-foreground tracking-tight">{s.count}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-32 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Equipe" title="DNA Interface TV" subtitle="Nosso time ajuda seu negócio/projeto a ir mais longe!" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="group text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/15 transition-all duration-300">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-5 ring-1 ring-border/50 group-hover:ring-primary/20 transition-all">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cases + Portfólio */}
      <section className="relative py-12 md:py-32 border-t border-border/30">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Portfólio" title="Cases + Portfólio" subtitle="Todos os nossos principais projetos em uma única galeria." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {showcaseItems.map((item, i) => (
              <AnimatedSection key={`${item.title}-${i}`} delay={i * 0.05}>
                <div className="group rounded-2xl overflow-hidden bg-card/40 border border-border/30 hover:border-primary/20 transition-all duration-300 h-full flex flex-col shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]">
                  <div className="aspect-[16/9] overflow-hidden bg-muted/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5 flex-1 flex items-center justify-center">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center">{item.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-10">
            <Link to="/cases" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-border transition-all group">
              Ver portfólio completo
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-32 border-t border-border/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] text-primary border border-primary/20 bg-primary/5 mb-6">
              Contato
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              Pronto para elevar suas{" "}
              <span className="gradient-text">transmissões</span>?
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-md mx-auto">
              Teremos o maior prazer em responder suas perguntas e criar o projeto perfeito para você.
            </p>
            <Magnetic className="mt-9">
              <Link
                to="/fale-conosco"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-[0_0_40px_hsl(var(--primary)/0.35)] group"
              >
                Fale Conosco
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
