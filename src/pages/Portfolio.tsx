import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  { title: "Copa do Nordeste Nordeste TV/ Fox Sports", image: "/images/portfolio-1.jpeg", video: "https://youtu.be/Q-XcQIb6alQ" },
  { title: "Sulamericana 2021", image: "/images/portfolio-9.jpeg", video: "https://youtu.be/3aLuZ_CAu6I" },
  { title: "Campeonato Brasileiro 2020 – Ceará x Flamengo", image: "/images/portfolio-2.jpeg", video: "https://youtu.be/3aLuZ_CAu6I" },
  { title: "Ônibus Olímpico Rede Record Em Goiânia", image: "/images/portfolio-5.jpeg", video: "https://youtu.be/C-ACvHZnT2s" },
  { title: "Produção ao Vivo", image: "/images/portfolio-7.jpeg", video: null },
  { title: "Transmissão Esportiva", image: "/images/portfolio-3.jpeg", video: null },
  { title: "Anjos Cantam Jorge & Mateus", image: "/images/portfolio-10.jpeg", video: "https://youtu.be/nXZ2cWNTVYY" },
  { title: "Cobertura de Evento", image: "/images/portfolio-6.jpeg", video: null },
  { title: "Super Liga Masculina 19/20", image: "/images/portfolio-4.jpeg", video: "https://youtu.be/KhCUXZpUNc8" },
  { title: "Fortaleza x Independente", image: "/images/portfolio-8.jpeg", video: "https://youtu.be/ylnSzgvoHpg" },
  { title: "Nordeste TV/ Fox Sports", image: "/images/portfolio-3-1.jpeg", video: "https://youtu.be/HNEV8W6iyoo" },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Portfólio" title="Cases" subtitle="Nossos principais trabalhos e produções" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portfolioItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                {item.video ? (
                  <a
                    href={item.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="aspect-[3/2] overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors flex items-center justify-center">
                        <ExternalLink size={20} className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    </div>
                  </a>
                ) : (
                  <div className="rounded-2xl overflow-hidden bg-card/30 border border-border/30">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-foreground line-clamp-2">{item.title}</h3>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
