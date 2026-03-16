import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const members = [
  { name: "Alfredo Roth", image: "/images/equipe-alfredo.png" },
  { name: "Samuel Leite", image: "/images/equipe-samuel.png" },
  { name: "Marcos", image: "/images/equipe-marcos.png" },
  { name: "Edson", image: "/images/equipe-edson.png" },
  { name: "Gildo", image: "/images/equipe-gildo.png" },
];

const Equipe = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? members.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === members.length - 1 ? 0 : c + 1));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Nossa Equipe" title="Equipe" subtitle="Conheça os profissionais que fazem a Interface TV acontecer." />

          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-card/30 border border-border/30">
                <img
                  src={members[current].image}
                  alt={members[current].name}
                  className="w-full object-contain max-h-[520px]"
                />
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {members.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === current ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Equipe;
