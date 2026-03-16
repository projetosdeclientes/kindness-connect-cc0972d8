import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Tv, Satellite, Truck, Zap, MapPin, CheckCircle } from "lucide-react";

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "04", desc: "Unidades de transmissão completas e de última geração para produções ao vivo de grande porte." },
  { icon: Satellite, title: "DSNGs", count: "02", desc: "Links satelitais para transmissão ao vivo de qualquer localidade do Brasil." },
  { icon: Tv, title: "Vans Executivas", count: "02", desc: "Toda comodidade para o cliente com mobilidade, agilidade e conforto." },
  { icon: Zap, title: "Geradores de Energia", count: "02", desc: "Autonomia total para operações em qualquer ambiente, garantindo produção ininterrupta." },
];

const highlights = [
  "Excelência e evolução tecnológica constante",
  "Know-How invejável no mercado",
  "Profissionais com grande experiência audiovisual",
  "Desde pré-produção até entrega final",
  "Atendimento ágil em território nacional",
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Sobre nós" title="Quem Somos" subtitle="Conheça nossa história e nossa missão." />
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto items-start">
            <div className="space-y-5">
              <AnimatedSection>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">A INTERFACETV BROADCASTING</strong> que atua há mais de 25 anos no mercado brasileiro, buscando a excelência e sempre acompanhando a evolução tecnológica no mercado.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.05}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Adquirimos um invejável Know-How para produzir os melhores trabalhos para os nossos clientes e parceiros.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Possuímos uma estrutura completa e de última geração: Unidades Móveis de Transmissão, DSNGs, Geradores de energia e Gruas eletrônicas.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Com profissionais qualificados e com grande experiência no mercado audiovisual e publicitário, que garantem um excelente trabalho desde a pré-produção até a finalização e entrega do produto final.
                </p>
              </AnimatedSection>
            </div>

            <div className="space-y-5">
              <AnimatedSection delay={0.1}>
                <div className="p-6 rounded-2xl bg-card/30 border border-border/30">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Nossos Diferenciais</h3>
                  <div className="space-y-3">
                    {highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/15">
                  <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Com bases em <strong className="text-foreground">São Paulo, Fortaleza, São Luís e Belém</strong>, nossa logística nos permite atender com agilidade e precisão em território nacional.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="mt-24 md:mt-32">
            <SectionHeader label="Infraestrutura" title="Nossa Estrutura" subtitle="Equipamentos de última geração para suas produções" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.08}>
                  <div className="group p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300 text-center shine h-full">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                      <s.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-3xl font-bold gradient-text tracking-tight">{s.count}</span>
                    <h3 className="text-sm font-semibold text-foreground mt-2">{s.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuemSomos;
