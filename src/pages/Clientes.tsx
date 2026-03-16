import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const Clientes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Nossos Clientes" subtitle="Alguns de nossos clientes e parceiros" />
          
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
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
