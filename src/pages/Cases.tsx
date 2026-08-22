import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const cases = [
  { title: "Olimpíadas Brasil", image: "/images/case-olimpiadas.jpg", desc: "Cobertura completa das Olimpíadas com transmissão ao vivo para canais nacionais.", tag: "Esporte" },
  { title: "Brasileiro Feminino 2021", image: "/images/case-brasileiro-feminino.jpg", desc: "Transmissão do Campeonato Brasileiro Feminino de futebol.", tag: "Futebol" },
  { title: "Sorteio Copa do Mundo 2014", image: "/images/case-sorteio-copa.jpg", desc: "Cobertura do sorteio da Copa do Mundo FIFA 2014 no Brasil.", tag: "FIFA" },
  { title: "UFC", image: "/images/case-ufc.jpg", desc: "Transmissão de eventos do UFC no Brasil.", tag: "MMA" },
  { title: "Copa do Nordeste – Nordeste TV / Fox Sports", image: "/images/case-copa-nordeste.jpg", desc: "Copa do Nordeste Nordeste TV / Fox Sports.", tag: "Futebol" },
  { title: "Sulamericana 2021", image: "/images/case-sulamericana.jpg", desc: "Sulamericana Ceará 2 x 0 Bolívar.", tag: "Futebol" },
  { title: "Campeonato Brasileiro 2020 – Ceará x Flamengo", image: "/images/portfolio-2.jpeg", desc: "Transmissão do Campeonato Brasileiro 2020, Ceará x Flamengo.", tag: "Futebol" },
  { title: "Ônibus Olímpico Rede Record em Goiânia", image: "/images/portfolio-5.jpeg", desc: "Operação do ônibus olímpico da Rede Record em Goiânia.", tag: "Esporte" },
  { title: "Anjos Cantam Jorge & Mateus", image: "/images/portfolio-10.jpeg", desc: "Produção e transmissão do show Anjos Cantam com Jorge & Mateus.", tag: "Entretenimento" },
  { title: "Superliga Masculina 19/20", image: "/images/portfolio-4.jpeg", desc: "Transmissão da Superliga Masculina de Vôlei 2019/2020.", tag: "Esporte" },
  { title: "Fortaleza x Independiente", image: "/images/portfolio-8.jpeg", desc: "Transmissão do jogo Fortaleza x Independiente pela Sulamericana.", tag: "Futebol" },
  { title: "Nordeste TV / Fox Sports", image: "/images/portfolio-3-1.jpeg", desc: "Cobertura esportiva para Nordeste TV e Fox Sports.", tag: "Futebol" },
  { title: "Produção ao Vivo", image: "/images/portfolio-7.jpeg", desc: "Produção e operação ao vivo com equipe técnica completa.", tag: "Produção" },
  { title: "Cobertura de Evento", image: "/images/portfolio-6.jpeg", desc: "Cobertura completa de evento com múltiplas câmeras.", tag: "Eventos" },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader gradient label="Portfólio" title="Cases" subtitle="Projetos que fazem a diferença" />
          
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

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cases;
