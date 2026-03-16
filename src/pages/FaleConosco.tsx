import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";
import { Mail, Phone, Send, CheckCircle, MapPin, ArrowRight } from "lucide-react";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

const socialLinks = [
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/5511991903177",
    bg: "bg-[#25D366]",
    hoverBg: "hover:bg-[#20BD5A]",
    text: "text-white",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/interfacetv",
    bg: "bg-[#1877F2]",
    hoverBg: "hover:bg-[#1565D8]",
    text: "text-white",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/interfacetv",
    bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    hoverBg: "hover:brightness-110",
    text: "text-white",
  },
  {
    label: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@interfacetv",
    bg: "bg-[#FF0000]",
    hoverBg: "hover:bg-[#CC0000]",
    text: "text-white",
  },
];

const phoneGroups = [
  {
    label: "Telefones",
    numbers: [
      { number: "(85) 3016-1074", tel: "558530161074" },
      { number: "(85) 3272-8065", tel: "558532728065" },
    ],
  },
  {
    label: "Fernando",
    numbers: [
      { number: "(11) 99190-3177", tel: "5511991903177" },
      { number: "(85) 99912-0203", tel: "5585999120203" },
    ],
  },
  {
    label: "Roberto",
    numbers: [
      { number: "(11) 93018-3555", tel: "5511930183555" },
      { number: "(21) 97981-3218", tel: "5521979813218" },
    ],
  },
];

const FaleConosco = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    if (!projectId) {
      setStatus("error");
      setErrorMsg("Envio por formulário ainda não está configurado. Use os contatos ao lado por enquanto.");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem");
      }

      setStatus("success");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Envio indisponível no momento. Use telefone, WhatsApp ou email direto ao lado.");
      setTimeout(() => setStatus("idle"), 4000);
    }
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

                  {/* Phone Numbers */}
                  <div className="p-5 rounded-2xl bg-card/30 border border-border/30 space-y-4">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Telefones</span>
                    </div>
                    {phoneGroups.map((group) => (
                      <div key={group.label} className="space-y-1">
                        <span className="text-[11px] font-medium text-primary/60 uppercase tracking-wider px-3">{group.label}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.numbers.map((p) => (
                            <a
                              key={p.tel}
                              href={`tel:+${p.tel}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                            >
                              <Phone size={11} className="text-primary/60 flex-shrink-0" />
                              <span className="font-medium text-foreground">{p.number}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="p-5 rounded-2xl bg-card/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wider">E-mail</span>
                    </div>
                    <a href="mailto:eventos@interfacetv.com.br" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-foreground hover:text-primary hover:bg-secondary/50 transition-all">
                      eventos@interfacetv.com.br
                    </a>
                  </div>

                  {/* Locations */}
                  <div className="p-5 rounded-2xl bg-card/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Bases</span>
                    </div>
                    <span className="text-xs text-muted-foreground px-3">SP • CE • MA • PA</span>
                  </div>

                  {/* Social Media CTAs */}
                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${s.bg} ${s.text} ${s.hoverBg} transition-all shadow-md hover:shadow-lg text-sm font-medium`}
                      >
                        <s.icon size={16} />
                        {s.label}
                      </a>
                    ))}
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
                    {status === "error" && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                        {errorMsg}
                      </div>
                    )}
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
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 shadow-[0_0_20px_hsl(210,85%,55%,0.15)]"
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
