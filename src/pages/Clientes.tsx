import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const Clientes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Parceiros" title="Nossos Clientes" subtitle="Empresas que confiam no nosso trabalho" />
          
          <AnimatedSection>
            <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl bg-white/90 border border-border/30 shine">
              <img
                src="/images/clientes-grid.png"
                alt="Logos dos clientes da Interface TV Broadcasting"
                className="w-full"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl bg-card/40 border border-primary/20 text-center">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-2">Novo cliente</span>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Federação Internacional de Vôlei (FIVB)</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Realizamos os <strong className="text-foreground">Mundiais de Clubes Masculino e Feminino</strong> em dezembro de 2025.
              </p>
            </div>
            <p className="text-center text-xs text-muted-foreground/70 italic mt-6">
              Lista de clientes em atualização — novos logos serão adicionados em breve.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clientes;
