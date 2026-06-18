import { Link } from "react-router-dom";
import { Globe, Facebook, Youtube, Instagram, ArrowUpRight, MapPin } from "lucide-react";
import logoImg from "../assets/logo-interfacetv.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <img src={logoImg} alt="Interface TV Broadcasting" className="h-20 md:h-24 w-auto object-contain mb-4" />
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Interface<span className="gradient-text">Tv</span>
            </h3>
            <a
              href="https://interface-tv.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe size={13} className="text-primary/70" />
              interface-tv.netlify.app
            </a>
            <div className="flex gap-2 mt-6">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Youtube, href: "https://youtube.com" },
                { icon: Instagram, href: "https://instagram.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-[0.15em]">Navegação</h4>
            <nav className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Início", path: "/" },
                { label: "Quem Somos", path: "/quem-somos" },
                { label: "Unidades Móveis", path: "/unidades-moveis" },
                { label: "DSNG", path: "/dsng" },
                { label: "Clientes", path: "/clientes" },
                { label: "Cases", path: "/cases" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  {item.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-[0.15em] flex items-center gap-2">
              <MapPin size={12} className="text-primary" /> Bases
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>São Paulo, SP</span>
              <span>Rio de Janeiro, RJ</span>
              <span>Minas Gerais, MG</span>
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
