import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Tv, Satellite, Truck, Zap, Play } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import heroImg from "../assets/hero-broadcast.jpg";

const cases = [
  { title: "Olimpíadas Brasil", image: "/images/case-olimpiadas.jpg" },
  { title: "Brasileiro Feminino 2021", image: "/images/case-brasileiro-feminino.jpg" },
  { title: "Sorteio Copa do Mundo 2014", image: "/images/case-sorteio-copa.jpg" },
  { title: "UFC", image: "/images/case-ufc.jpg" },
  { title: "Copa do Nordeste – Fox Sports", image: "/images/case-copa-nordeste.jpg" },
  { title: "Sulamericana 2021", image: "/images/case-sulamericana.jpg" },
];

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "4", desc: "Unidades de transmissão completas e de última geração." },
  { icon: Satellite, title: "DSNGs", count: "2", desc: "Links satelitais para transmissão ao vivo de qualquer local." },
  { icon: Tv, title: "Vans Executivas", count: "2", desc: "Toda comodidade para o cliente com mobilidade e agilidade." },
  { icon: Zap, title: "Geradores de Energia", count: "2", desc: "Autonomia total para operações em qualquer ambiente." },
];

const team = [
  { name: "Caca", role: "Diretor", image: "/images/team-caca.jpg" },
  { name: "Fernando", role: "Diretor Geral", image: "/images/team-fernando.png" },
  { name: "Roberto", role: "Gerente Geral / Novos Negócios", image: "/images/team-roberto.jpg" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Interface TV Broadcasting" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
              <Play size={12} className="text-primary" />
              +25 anos de experiência em broadcasting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Luz, Câmera,</span>
              <br />
              <span className="gradient-text">Trans... "Missão"</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Produtora de vídeo especializada em transmissão de eventos para canais de televisão, agências de publicidade e internet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/fale-conosco"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Fale Conosco <ArrowRight size={16} />
              </Link>
              <Link
                to="/cases"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Ver Cases
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {services.map((s) => (
              <div key={s.title} className="p-4 rounded-xl bg-card/60 border border-border/50 text-center">
                <span className="text-3xl font-bold gradient-text">{s.count}</span>
                <p className="text-sm text-muted-foreground mt-1">{s.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Highlight */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Clientes" subtitle="Conheça alguns de nossos clientes!" />
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <img src="/images/clientes-grid.png" alt="Logos dos clientes da Interface TV" className="w-full opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-center mt-8">
              <Link to="/clientes" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                Ver todos os clientes <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Quem Somos" subtitle="Conheça nossa história!" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A <strong className="text-foreground">INTERFACETV BROADCASTING</strong> é uma produtora de vídeo, que se especializou em transmissão de eventos para canais de televisão, agência de publicidade e internet.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Trabalhamos com produções e gravações de programas esportivos, entretenimento, institucionais, corporativos e produções independentes.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Equipe de profissionais com mais de 25 anos de experiência no mercado de áudio visual brasileiro, com ampla capacidade e qualidade técnica entregamos a sua empresa os melhores resultados do mercado.
              </p>
              <Link to="/quem-somos" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline font-medium">
                Saiba mais <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.title} className="p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group">
                    <s.icon size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="DNA Interface TV" subtitle="Nosso time ajuda seu negócio/projeto a ir mais longe!" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden gradient-border mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 md:py-28 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Cases" subtitle="Projetos que fazem a diferença." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <div className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/30 transition-all hover:shadow-[var(--shadow-glow)]">
                  <div className="aspect-video overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/cases" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
              Ver todos os cases <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Entre em Contato</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Teremos o maior prazer em responder suas perguntas!
            </p>
            <Link
              to="/fale-conosco"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Fale Conosco <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
