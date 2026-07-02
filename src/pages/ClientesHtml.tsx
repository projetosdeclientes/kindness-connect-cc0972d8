import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientsSection from "../components/ClientsSection";

const ClientesHtml = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ClientsSection />
      <Footer />
    </div>
  );
};

export default ClientesHtml;
