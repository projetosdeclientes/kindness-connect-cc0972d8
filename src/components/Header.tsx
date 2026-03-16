import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo-interfacetv.png";

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
  { label: "Portfólio", path: "/portfolio" },
  { label: "Fale Conosco", path: "/fale-conosco" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
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
    setMobileDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
        scrolled || mobileOpen ? "glass border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoImg} alt="Interface TV Broadcasting" className="h-9 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5" ref={dropdownRef}>
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
            className="md:hidden p-2.5 rounded-lg text-foreground hover:bg-secondary/80 transition-colors active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden fixed left-0 right-0 top-16 z-50 glass border-t border-border/30 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === item.path ? null : item.path)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors active:bg-secondary/50 ${
                            isActive(item.path) ? "text-primary bg-primary/5" : "text-foreground"
                          }`}
                        >
                          {item.label}
                          <ChevronDown size={16} className={`transition-transform duration-200 text-muted-foreground ${mobileDropdown === item.path ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === item.path && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-1 space-y-0.5">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className={`block px-4 py-3 rounded-xl text-[14px] transition-colors active:bg-secondary/50 ${
                                      location.pathname === child.path ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors active:bg-secondary/50 ${
                          isActive(item.path) ? "text-primary bg-primary/5" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <Link
                    to="/fale-conosco"
                    className="block w-full text-center px-4 py-3.5 rounded-xl bg-primary text-primary-foreground text-[15px] font-semibold active:brightness-90 transition-all"
                  >
                    Fale Conosco
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
