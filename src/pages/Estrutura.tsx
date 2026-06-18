import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { MapPin, Building2, Truck, Satellite, Tv, Zap, ImagePlus } from "lucide-react";

// Estrutura preparada — fotos e dados detalhados da sede em Fortaleza e demais
// equipamentos serão adicionados assim que enviados pelo cliente.
const infra = [
  { icon: Truck, title: "Unidades Móveis", desc: "Frota completa para transmissões ao vivo de grande porte." },
  { icon: Satellite, title: "DSNGs", desc: "Links satelitais para cobertura em qualquer localidade." },
  { icon: Tv, title: "Vans Executivas", desc: "Mobilidade, agilidade e conforto operacional." },
  { icon: Zap, title: "Geradores de Energia", desc: "Autonomia total em qualquer ambiente." },
];

const Estrutura = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            label="Infraestrutura"
            title="Nossa Estrutura"
            subtitle="Tecnologia, frota e equipe pronta para qualquer transmissão no Brasil."
          />

          {/* Sede Fortaleza */}
          <AnimatedSection>
            <div className="max-w-5xl mx-auto p-6 md:p-10 rounded-3xl bg-card/40 border border-border/40 shine">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 size={18} className="text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Sede</span>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                    <MapPin size={16} className="text-primary" /> Fortaleza, CE
                  </h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nossa sede em Fortaleza concentra toda a estrutura operacional, com equipamentos de última geração, equipe técnica especializada e suporte logístico para atender produções em todo o território nacional.
              </p>

              {/* Placeholder de galeria */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl border border-dashed border-border/60 bg-muted/10 flex flex-col items-center justify-center text-muted-foreground/60"
                  >
                    <ImagePlus size={20} />
                    <span className="text-[10px] mt-1.5 uppercase tracking-wider">Foto em breve</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-center text-muted-foreground/70 italic">
                Estrutura preparada — aguardando fotos e dados detalhados da sede para finalização.
              </p>
            </div>
          </AnimatedSection>

          {/* Equipamentos */}
          <div className="mt-20 md:mt-24 max-w-5xl mx-auto">
            <SectionHeader label="Equipamentos" title="O que temos" subtitle="Frota e infraestrutura completa para sua produção." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {infra.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.08}>
                  <div className="group p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300 text-center shine h-full">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                      <s.icon size={18} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
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

export default Estrutura;
