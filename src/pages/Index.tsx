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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const truckOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const truckScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero com efeito parallax: caminhão fixo e some enquanto texto sobe por cima */}
      <div ref={heroRef} className="relative">
        <section className="sticky top-0 w-full h-[60vh] md:h-[80vh] overflow-hidden z-0 bg-background">
          <motion.img
            style={{ opacity: truckOpacity, scale: truckScale }}
            src={heroImg}
            alt="Interface TV Broadcasting - Unidade Móvel"
            className="absolute inset-0 w-full h-full object-contain object-center md:object-cover"
            draggable={false}
          />
        </section>

        {/* Texto sobe por cima da imagem do caminhão */}
        <section className="relative z-10 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-16 md:pt-24 md:pb-24">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
              <span className="text-foreground">Luz, Câmera,</span>
              <br />
              <span className="gradient-text">Trans..."Missão"</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-foreground/90 max-w-xl mx-auto leading-relaxed">
              Transformamos tecnologia em conexão para levar emoção a cada transmissão.
            </p>
          </div>
        </section>
      </div>


      {/* Stats */}
      <section className="relative overflow-hidden border-t border-border/30">
        <AuroraBackground />
        <div className="absolute inset-0 grid-pattern opacity-8" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="group p-4 sm:p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 hover:border-primary/30 transition-colors">
                  <s.icon size={18} className="text-primary mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">{s.value}</div>
                  <div className="text-sm text-foreground/90 mt-1 tracking-wide font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>




      {/* Clients */}
      <section className="relative py-24 md:py-32">
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
      <section className="py-24 md:py-32 border-t border-border/30">
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
                  <div key={s.title} className={`group p-5 md:p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/20 transition-all duration-300 shine ${i === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <s.icon size={16} className="text-primary" />
                      </div>
                      <span className="text-xl font-bold text-foreground tracking-tight">{s.count}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 border-t border-border/30">
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
      <section className="relative py-24 md:py-32 border-t border-border/30">
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
      <section className="relative py-24 md:py-32 border-t border-border/30 overflow-hidden">
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
            <Link
              to="/fale-conosco"
              className="mt-9 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-[0_0_30px_hsl(210,85%,55%,0.15)] group"
            >
              Fale Conosco
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
