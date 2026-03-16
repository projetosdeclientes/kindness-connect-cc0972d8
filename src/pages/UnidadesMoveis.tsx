import { Link } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const units = [
  { id: 1, title: "Unidade 1", cameras: "16 Câmeras", desc: "HD UM 01 – Mercedes Benz ATEGO 1719", image: "/images/um01.jpeg" },
  { id: 2, title: "Unidade 2", cameras: "11 Câmeras", desc: "HD UM 02 – Mercedes Benz 815", image: "/images/um02.jpeg" },
  { id: 3, title: "Unidade 3", cameras: "10 Câmeras", desc: "HD UM 03 – Mercedes Benz ATEGO 1719", image: "/images/um03.jpeg" },
  { id: 4, title: "Unidade 4", cameras: "07 Câmeras", desc: "HD UM 04 – Van 416 CDI Mercedes Benz", image: null },
];

const UnidadesMoveis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Infraestrutura" title="Unidades Móveis" subtitle="Conheça nossas unidades de transmissão de última geração" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {units.map((u, i) => (
              <AnimatedSection key={u.id} delay={i * 0.08}>
                <Link
                  to={`/unidades-moveis/unidade-${u.id}`}
                  className="group block rounded-2xl overflow-hidden bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300"
                >
                  {u.image ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={u.image} alt={u.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-secondary/30 flex items-center justify-center">
                      <Truck size={48} className="text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{u.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{u.cameras} • {u.desc}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UnidadesMoveis;
