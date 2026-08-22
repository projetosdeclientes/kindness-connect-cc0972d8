import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Tv, Satellite, Truck, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Truck, title: "Unidades Móveis", count: "04", desc: "Unidades de transmissão completas e de última geração para cobertura de grandes eventos esportivos, shows e transmissões ao vivo.", features: ["Transmissão HD/4K", "Equipe técnica", "Cobertura nacional"] },
  { icon: Satellite, title: "DSNGs", count: "02", desc: "Digital Satellite News Gathering — links satelitais para transmissão ao vivo de qualquer localidade.", features: ["Link satelital dedicado", "Mobilidade total", "Setup rápido"] },
  { icon: Tv, title: "Vans Executivas", count: "02", desc: "Toda comodidade para o cliente, com mobilidade e agilidade para produções menores e gravações externas.", features: ["Conforto premium", "Equipamento completo", "Agilidade operacional"] },
  { icon: Zap, title: "Geradores de Energia", count: "02", desc: "Geradores de energia próprios para autonomia total em produções em qualquer local.", features: ["Autonomia total", "Silenciosos", "Alta potência"] },
];

const Servicos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader gradient label="O que fazemos" title="Nossos Serviços" subtitle="Estrutura completa para suas produções audiovisuais" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="group p-7 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300 shine h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <s.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                      <span className="text-lg font-bold gradient-text">{s.count} unidades</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <div className="space-y-1.5">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary/50" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 max-w-2xl mx-auto">
            <div className="p-8 rounded-2xl bg-card/30 border border-border/30 text-center shine">
              <h3 className="text-lg font-semibold text-foreground mb-3">Produções Especializadas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trabalhamos com produções e gravações de programas esportivos, entretenimento, institucionais, corporativos e produções independentes. Nossa equipe possui mais de 25 anos de experiência no mercado audiovisual brasileiro.
              </p>
              <Link to="/fale-conosco" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all group">
                Solicitar orçamento <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicos;
