import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  { title: "Olimpíadas Brasil", image: "/images/case-olimpiadas.jpg", desc: "Cobertura completa das Olimpíadas com transmissão ao vivo para canais nacionais.", tag: "Esporte" },
  { title: "Brasileiro Feminino 2021", image: "/images/case-brasileiro-feminino.jpg", desc: "Transmissão do Campeonato Brasileiro Feminino de futebol.", tag: "Futebol" },
  { title: "Sorteio Copa do Mundo 2014", image: "/images/case-sorteio-copa.jpg", desc: "Cobertura do sorteio da Copa do Mundo FIFA 2014 no Brasil.", tag: "FIFA" },
  { title: "UFC", image: "/images/case-ufc.jpg", desc: "Transmissão de eventos do UFC no Brasil.", tag: "MMA" },
  { title: "Copa do Nordeste – Nordeste TV / Fox Sports", image: "/images/case-copa-nordeste.jpg", desc: "Copa do Nordeste Nordeste TV/ Fox Sports.", tag: "Futebol" },
  { title: "Sulamericana 2021", image: "/images/case-sulamericana.jpg", desc: "Sulamericana Ceará 2 x 0 Bolívar.", tag: "Futebol" },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Portfólio" title="Cases" subtitle="Projetos que fazem a diferença" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.08}>
                <div className="group rounded-2xl overflow-hidden bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm text-[10px] font-medium text-foreground tracking-wider uppercase">{c.tag}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-14">
            <Link to="/fale-conosco" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all group">
              Solicitar orçamento <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cases;
