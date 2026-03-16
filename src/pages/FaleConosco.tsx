import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";

const FaleConosco = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // mailto fallback since there's no backend
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Fale Conosco" subtitle="Teremos o maior prazer em responder suas perguntas!" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Agradecemos seu interesse! Orçamentos, sugestões e dúvidas preencha o formulário que entraremos em contato o mais breve possível.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <Phone size={18} className="text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p>Telefones: <strong className="text-foreground">(85) 3016-1074 / 3272-8065</strong></p>
                      <p className="mt-1">Cel.: <strong className="text-foreground">(11) 99190-3177 / (85) 99912-0203</strong> (Fernando)</p>
                      <p>Cel.: <strong className="text-foreground">(11) 93018-3555 / (21) 97981-3218</strong> (Roberto)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <Mail size={18} className="text-primary" />
                    <a href="mailto:eventos@interfacetv.com.br" className="text-sm text-foreground hover:text-primary transition-colors">
                      eventos@interfacetv.com.br
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.2}>
              {status === "success" ? (
                <div className="p-8 rounded-xl bg-card border border-primary/30 text-center">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">Mensagem enviada!</h3>
                  <p className="text-muted-foreground mt-2">Entraremos em contato em breve.</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-primary hover:underline text-sm">
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Seu nome (obrigatório)</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Seu e-mail (obrigatório)</label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Assunto</label>
                    <input
                      type="text"
                      maxLength={200}
                      value={formData.assunto}
                      onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Sua mensagem</label>
                    <textarea
                      required
                      maxLength={2000}
                      rows={5}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {status === "sending" ? "Enviando..." : <>Enviar <Send size={16} /></>}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaleConosco;
