import { Link } from "react-router-dom";
import { Mail, Phone, Globe, Facebook, Youtube, Instagram, ArrowUpRight } from "lucide-react";
import logoImg from "../assets/logo-interfacetv.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-4">
              <img src={logoImg} alt="Interface TV Broadcasting" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Produtora de vídeo especializada em transmissão de eventos para canais de televisão, agências de publicidade e internet.
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Youtube, href: "https://youtube.com" },
                { icon: Instagram, href: "https://instagram.com" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-[0.15em]">Navegação</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Início", path: "/" },
                { label: "Quem Somos", path: "/quem-somos" },
                { label: "Unidades Móveis", path: "/unidades-moveis" },
                { label: "DSNG", path: "/dsng" },
                { label: "Clientes", path: "/clientes" },
                { label: "Cases", path: "/cases" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  {item.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-[0.15em]">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:eventos@interfacetv.com.br" className="hover:text-foreground transition-colors flex items-center gap-2">
                <Mail size={13} className="text-primary/60" /> eventos@interfacetv.com.br
              </a>
              <a href="tel:8530161074" className="hover:text-foreground transition-colors flex items-center gap-2">
                <Phone size={13} className="text-primary/60" /> (85) 3016-1074
              </a>
              <a href="https://www.interfacetv.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                <Globe size={13} className="text-primary/60" /> www.interfacetv.com.br
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-[0.15em]">Bases</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>São Paulo, SP</span>
              <span>Fortaleza, CE</span>
              <span>São Luís, MA</span>
              <span>Belém, PA</span>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Interface TV Broadcasting. Todos os direitos reservados.
          </span>
          <Link to="/fale-conosco" className="text-xs text-primary hover:text-primary/80 transition-colors">
            Fale Conosco →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
