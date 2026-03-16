import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const cases = [
  { title: "Olimpíadas Brasil", image: "/images/case-olimpiadas.jpg", desc: "Cobertura completa das Olimpíadas com transmissão ao vivo para canais nacionais." },
  { title: "Brasileiro Feminino 2021", image: "/images/case-brasileiro-feminino.jpg", desc: "Transmissão do Campeonato Brasileiro Feminino de futebol." },
  { title: "Sorteio Copa do Mundo 2014", image: "/images/case-sorteio-copa.jpg", desc: "Cobertura do sorteio da Copa do Mundo FIFA 2014 no Brasil." },
  { title: "UFC", image: "/images/case-ufc.jpg", desc: "Transmissão de eventos do UFC no Brasil." },
  { title: "Copa do Nordeste – Nordeste TV / Fox Sports", image: "/images/case-copa-nordeste.jpg", desc: "Copa do Nordeste Nordeste TV/ Fox Sports." },
  { title: "Sulamericana 2021", image: "/images/case-sulamericana.jpg", desc: "Sulamericana Ceará 2 x 0 Bolívar." },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Cases" subtitle="Projetos que fazem a diferença" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all hover:shadow-[var(--shadow-glow)]">
                  <div className="aspect-video overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cases;
