import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Início", path: "/" },
  {
    label: "Quem Somos", path: "/quem-somos",
    children: [
      { label: "Nossa História", path: "/quem-somos" },
      { label: "Equipe", path: "/quem-somos/equipe" },
    ],
  },
  {
    label: "Unidades Móveis", path: "/unidades-moveis",
    children: [
      { label: "Todas as Unidades", path: "/unidades-moveis" },
      { label: "Unidade 1", path: "/unidades-moveis/unidade-1" },
      { label: "Unidade 2", path: "/unidades-moveis/unidade-2" },
      { label: "Unidade 3", path: "/unidades-moveis/unidade-3" },
      { label: "Unidade 4", path: "/unidades-moveis/unidade-4" },
    ],
  },
  { label: "DSNG", path: "/dsng" },
  { label: "Clientes", path: "/clientes" },
  { label: "Cases", path: "/cases" },
  { label: "Fale Conosco", path: "/fale-conosco" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-xs font-display font-bold text-primary">IT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-display font-bold text-foreground leading-none">
                INTERFACE<span className="text-primary">TV</span>
              </span>
              <span className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase leading-none mt-0.5 hidden sm:block">Broadcasting</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.children ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.path ? null : item.path)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                      isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={12} className={`transition-transform ${openDropdown === item.path ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                      isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 p-1.5 rounded-xl glass border border-border/50 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                            location.pathname === child.path ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass border-t border-border/30 max-h-[80vh] overflow-y-auto"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.path ? null : item.path)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.path) ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform ${openDropdown === item.path ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.path && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block px-4 py-2 rounded-lg text-sm ${
                                  location.pathname === child.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.path) ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
