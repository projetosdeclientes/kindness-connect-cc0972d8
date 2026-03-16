import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Tv, Satellite, Truck, Zap, MapPin } from "lucide-react";

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "4", desc: "Unidades de transmissão completas e de última geração para produções ao vivo de grande porte." },
  { icon: Satellite, title: "DSNGs", count: "2", desc: "Links satelitais para transmissão ao vivo de qualquer localidade do Brasil." },
  { icon: Tv, title: "Vans Executivas", count: "2", desc: "Toda comodidade para o cliente com mobilidade, agilidade e conforto." },
  { icon: Zap, title: "Geradores de Energia", count: "2", desc: "Autonomia total para operações em qualquer ambiente, garantindo produção ininterrupta." },
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Quem Somos" subtitle="Conheça nossa história!" />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedSection>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">A INTERFACETV BROADCASTING</strong> que atua há mais de 25 anos no mercado brasileiro, buscando a excelência e sempre acompanhando a evolução tecnológica no mercado.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Adquirimos um invejável Know-How para produzir os melhores trabalhos para os nossos clientes e parceiros.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Possuímos uma estrutura completa e de última geração: Unidades Móveis de Transmissão, DSNGs, Geradores de energia e Gruas eletrônicas.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com profissionais qualificados e com grande experiência no mercado audiovisual e publicitário, que garantem um excelente trabalho desde a pré-produção até a finalização e entrega do produto final.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
                <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Com bases em <strong className="text-foreground">São Paulo, Fortaleza, São Luís e Belém</strong>, nossa logística nos permite atender com agilidade e precisão em território nacional.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Infrastructure */}
          <div className="mt-20">
            <SectionHeader title="Nossa Estrutura" subtitle="Equipamentos de última geração para suas produções" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.1}>
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <s.icon size={28} className="text-primary" />
                    </div>
                    <span className="text-4xl font-bold gradient-text">{s.count}</span>
                    <h3 className="font-semibold text-foreground mt-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
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
