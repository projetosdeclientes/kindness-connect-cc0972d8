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
            <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl bg-card/30 border border-border/30 shine">
              <img 
                src="/images/clientes-grid.png" 
                alt="Logos dos clientes da Interface TV Broadcasting" 
                className="w-full"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clientes;
