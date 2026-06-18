import { Link } from "react-router-dom";
import { Globe, Facebook, Youtube, Instagram, ArrowUpRight, MapPin, ArrowRight } from "lucide-react";
import logoImg from "../assets/logo-interfacetv.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Quem Somos", path: "/quem-somos" },
  { label: "Unidades Móveis", path: "/unidades-moveis" },
  { label: "DSNG", path: "/dsng" },
  { label: "Clientes", path: "/clientes" },
  { label: "Cases", path: "/cases" },
];

const bases = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Minas Gerais, MG",
  "Fortaleza, CE",
  "São Luís, MA",
  "Belém, PA",
];

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="Interface TV Broadcasting" className="h-14 md:h-16 w-auto object-contain" />
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-none">
                Interface<span className="gradient-text">Tv</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Produtora especializada em transmissão de eventos para TV, agências e internet há mais de 25 anos.
            </p>
            <a
              href="https://interface-tv.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe size={13} className="text-primary/70" />
              interface-tv.netlify.app
            </a>
            <div className="flex gap-2 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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
            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group w-fit"
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
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {bases.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>

            <Link
              to="/fale-conosco"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 transition-all group"
            >
              Fale Conosco
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 border-t border-border/40 text-center sm:text-left">
          <span className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Interface TV Broadcasting. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
