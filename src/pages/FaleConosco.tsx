import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Mail, Phone, Send, CheckCircle, MapPin, ArrowRight } from "lucide-react";

const FaleConosco = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent(formData.assunto || "Contato via site");
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\n\n${formData.mensagem}`
    );
    window.location.href = `mailto:eventos@interfacetv.com.br?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setStatus("success");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    }, 1000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/30 transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader label="Contato" title="Fale Conosco" subtitle="Teremos o maior prazer em responder suas perguntas!" />
          
          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="md:col-span-2">
              <AnimatedSection>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Agradecemos seu interesse! Orçamentos, sugestões e dúvidas preencha o formulário que entraremos em contato o mais breve possível.
                  </p>

                  <div className="p-5 rounded-2xl bg-card/30 border border-border/30 space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone size={14} className="text-primary mt-1 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">(85) 3016-1074 / 3272-8065</strong></p>
                        <p>(11) 99190-3177 / (85) 99912-0203 <span className="text-primary/60">Fernando</span></p>
                        <p>(11) 93018-3555 / (21) 97981-3218 <span className="text-primary/60">Roberto</span></p>
                      </div>
                    </div>
                    <div className="h-px bg-border/30" />
                    <a href="mailto:eventos@interfacetv.com.br" className="flex items-center gap-3 text-xs text-foreground hover:text-primary transition-colors">
                      <Mail size={14} className="text-primary flex-shrink-0" />
                      eventos@interfacetv.com.br
                    </a>
                    <div className="h-px bg-border/30" />
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">SP • CE • MA • PA</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <AnimatedSection delay={0.1}>
                {status === "success" ? (
                  <div className="p-10 rounded-2xl bg-card/30 border border-primary/20 text-center shine">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Mensagem enviada!</h3>
                    <p className="text-sm text-muted-foreground mt-2">Entraremos em contato em breve.</p>
                    <button onClick={() => setStatus("idle")} className="mt-5 text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                      Enviar outra mensagem <ArrowRight size={10} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card/30 border border-border/30 space-y-4 shine">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Nome *</label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">E-mail *</label>
                        <input
                          type="email"
                          required
                          maxLength={255}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Assunto</label>
                      <input
                        type="text"
                        maxLength={200}
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Mensagem *</label>
                      <textarea
                        required
                        maxLength={2000}
                        rows={5}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        className={`${inputClasses} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 shadow-[0_0_20px_hsl(157,72%,54%,0.15)]"
                    >
                      {status === "sending" ? "Enviando..." : <>Enviar Mensagem <Send size={13} /></>}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaleConosco;
