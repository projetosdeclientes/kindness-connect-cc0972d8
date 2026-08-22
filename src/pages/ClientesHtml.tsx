import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import ClientsSection from "../components/ClientsSection";

const ClientesHtml = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader gradient={false} label="Parceiros" title="Nossos Clientes" subtitle="Empresas que confiam no nosso trabalho" />
          <AnimatedSection>
            <ClientsSection />
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientesHtml;
