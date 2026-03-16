import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Tv, Satellite, Truck, Zap } from "lucide-react";

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "4", desc: "Unidades de transmissão completas e de última geração para cobertura de grandes eventos esportivos, shows e transmissões ao vivo." },
  { icon: Satellite, title: "DSNGs", count: "2", desc: "Digital Satellite News Gathering — links satelitais para transmissão ao vivo de qualquer localidade." },
  { icon: Tv, title: "Vans Executivas", count: "2", desc: "Toda comodidade para o cliente, com mobilidade e agilidade para produções menores e gravações externas." },
  { icon: Zap, title: "Geradores de Energia", count: "2", desc: "Geradores de energia próprios para autonomia total em produções em qualquer local." },
];

const Servicos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Nossos Serviços" subtitle="Estrutura completa para suas produções audiovisuais" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <s.icon size={28} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                      <span className="text-2xl font-bold gradient-text">{s.count} unidades</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Produções Especializadas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trabalhamos com produções e gravações de programas esportivos, entretenimento, institucionais, corporativos e produções independentes. Nossa equipe possui mais de 25 anos de experiência no mercado audiovisual brasileiro.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicos;
