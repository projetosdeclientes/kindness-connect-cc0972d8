import { Link } from "react-router-dom";
import { Mail, Phone, Globe, Facebook, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-2xl font-display font-bold gradient-text">INTERFACE<span className="text-foreground">TV</span></span>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Produtora de vídeo especializada em transmissão de eventos para canais de televisão, agências de publicidade e internet.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Navegação</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Início", path: "/" },
                { label: "Quem Somos", path: "/quem-somos" },
                { label: "Serviços", path: "/servicos" },
                { label: "Clientes", path: "/clientes" },
                { label: "Cases", path: "/cases" },
                { label: "Fale Conosco", path: "/fale-conosco" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:eventos@interfacetv.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={14} /> eventos@interfacetv.com.br
              </a>
              <a href="tel:8530161074" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={14} /> (85) 3016-1074 / 3272-8065
              </a>
              <a href="https://www.interfacetv.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Globe size={14} /> www.interfacetv.com.br
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Bases: São Paulo, Fortaleza, São Luís e Belém</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Interface TV Broadcasting. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
