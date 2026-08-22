import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

const dsng1 = [
  "02 HPA'S XICOM 400 WATS",
  "02 MODULADORES NEWTEC AZ – 110 C/ 16 APSK E 5% ROLL. – OFF",
  "02 ENCONDERS NTT 4.2.2 E 4.2.0 MPEG 2 E MPEG4",
  "03 IRDS NTT PARA MONITORAÇÃO DE LOOPING DE CADEIA DOWN LINK",
  "01 MULTIPLEX SCREEN SERVICE",
  "ANTENA IBRASAT DE 2,40 M",
  "GERADOR CUMMINGS DE 08 KVAS A DIESEL SILENCIOSO",
];

const dsng2 = [
  "02 HPA'S XICOM 400 WATS",
  "02 MODULADORES NEWTEC AZ – 110 C/ 16 APSK E 5% ROLL. – OFF",
  "02 ENCONDERS NTT 4.2.2 E 4.2.0 MPEG 2 E MPEG4",
  "03 IRDS NTT PARA MONITORAÇÃO DE LOOPING DE CADEIA DOWN LINK",
  "01 MULTIPLEX SCREEN SERVICE",
  "ANTENA IBRASAT DE 2,40 M",
  "GERADOR CUMMINGS DE 08 KVAS A DIESEL SILENCIOSO",
  "--- EQUIPAMENTOS DE PRODUÇÃO ---",
  "01 SWITCHER FOR.A 390",
  "01 MATRIX FOR.A 16X16",
  "03 FRAMES FOR.A F9500",
  "COMUNICAÇÃO PICO CLEARCOM 32 CANAIS",
  "MESA DE ÁUDIO YAMAHA 01-V",
];

const DSNG = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader gradient label="Transmissão Satelital" title="DSNG" subtitle="Digital Satellite News Gathering – Links satelitais para transmissão ao vivo" />

          <AnimatedSection>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/30 mb-12">
              <img src="/images/dsng-banner.jpg" alt="DSNG Interface TV" className="w-full" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30 h-full">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">DSNG 01</h3>
                <p className="text-xs text-primary mb-4">Equipamento de RF</p>
                <ul className="space-y-2">
                  {dsng1.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30 h-full">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">DSNG 02</h3>
                <p className="text-xs text-primary mb-4">Com Produção de 4 Câmeras – Equipamento de RF</p>
                <ul className="space-y-2">
                  {dsng2.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs leading-relaxed ${item.startsWith("---") ? "text-primary font-medium mt-2" : "text-muted-foreground"}`}>
                      {!item.startsWith("---") && <div className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />}
                      {item.replace(/---/g, "").trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DSNG;
