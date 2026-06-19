import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { User, ImageOff } from "lucide-react";

// Estrutura pronta para receber os integrantes. Fotos, função e descrição serão
// adicionadas assim que forem enviadas pelo cliente.
const members: { name: string; role?: string; image?: string }[] = [
  { name: "Nando" },
  {
    name: "Beto",
    role: "Sócio e Coordenador de Eventos e Novos Negócios",
    image: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/N6uwID0HRxdbETr1wxR2y5Fe83o2/6b2e88bb-9ebd-434d-8379-e3fbfb2fbea9.png",
  },
  { name: "Caca" },
  { name: "Gabriel" },
  { name: "Marcão" },
  {
    name: "Gildo",
    image: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/N6uwID0HRxdbETr1wxR2y5Fe83o2/51206a97-b441-4bfc-abec-1abb64c9392e.png",
  },
  {
    name: "Edson Ribeiro",
    role: "Supervisor de Externa",
    image: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/N6uwID0HRxdbETr1wxR2y5Fe83o2/38d168b0-b9c5-4598-98b3-809b8af1c022.png",
  },
  {
    name: "Samuel",
    image: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/N6uwID0HRxdbETr1wxR2y5Fe83o2/42680331-07c4-4f08-b6ec-290aad397542.png",
  },
  {
    name: "Willams Teixeira",
    role: "Técnico de Áudio e Comunicação",
    image: "https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/N6uwID0HRxdbETr1wxR2y5Fe83o2/0d10663c-da11-452b-953b-c32aab14ef31.png",
  },
  { name: "Ramon" },
  { name: "Luigi" },
];

const Equipe = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            label="Nossa Equipe"
            title="Equipe"
            subtitle="Conheça os profissionais que fazem a Interface TV acontecer."
          />

          <AnimatedSection>
            <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 text-center">
              <p className="text-xs text-muted-foreground">
                <strong className="text-primary">Estrutura preparada</strong> — aguardando fotos, função e descrição de cada integrante para finalização.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {members.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.05}>
                <div className="group rounded-2xl bg-card/30 border border-border/30 hover:border-primary/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="aspect-square bg-gradient-to-br from-muted/20 to-card/40 flex items-center justify-center relative overflow-hidden">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 grid-pattern opacity-20" />
                        <div className="relative w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <User size={26} className="text-primary/60" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4 text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                    {m.role ? (
                      <p className="text-[11px] text-primary mt-1">{m.role}</p>
                    ) : (
                      <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-center gap-1">
                        <ImageOff size={10} /> Função em breve
                      </p>
                    )}
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

export default Equipe;
