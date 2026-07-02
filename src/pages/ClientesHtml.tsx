import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_DEV_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;

type Logo = { name: string; domain: string };
type Category = { index: string; name: string; logos: Logo[] };

// Domínios oficiais de cada marca — Logo.dev busca a logo real direto do site.
const categories: Category[] = [
  {
    index: "CH. 01",
    name: "TV Aberta & Emissoras",
    logos: [
      { name: "TV Globo", domain: "globo.com" },
      { name: "RecordTV", domain: "record.com.br" },
      { name: "SBT", domain: "sbt.com.br" },
      { name: "Band", domain: "band.uol.com.br" },
      { name: "TV Cultura", domain: "cultura.uol.com.br" },
      { name: "TV Brasil", domain: "tvbrasil.ebc.com.br" },
      { name: "TV Verdes Mares", domain: "verdesmares.com.br" },
      { name: "TV Liberal", domain: "gruporbs.com.br" },
      { name: "Rede Bahia", domain: "redebahia.com.br" },
      { name: "Jangadeiro", domain: "tvjangadeiro.com.br" },
      { name: "Futura", domain: "futura.org.br" },
      { name: "TVN", domain: "tvn.cl" },
      { name: "Cazé TV", domain: "cazetv.com.br" },
      { name: "Canal UOL", domain: "uol.com.br" },
      { name: "Sesc TV", domain: "sesctv.org.br" },
    ],
  },
  {
    index: "CH. 02",
    name: "Institucional & Olímpico",
    logos: [
      { name: "NBR", domain: "canalgov.gov.br" },
      { name: "EBC", domain: "ebc.com.br" },
      { name: "Ancine", domain: "gov.br" },
      { name: "Comitê Olímpico do Brasil", domain: "cob.org.br" },
      { name: "Comitê Paralímpico Brasileiro", domain: "cpb.org.br" },
    ],
  },
  {
    index: "CH. 03",
    name: "Futebol & Federações",
    logos: [
      { name: "CBF", domain: "cbf.com.br" },
      { name: "CBF TV", domain: "cbf.com.br" },
      { name: "Conmebol TV", domain: "conmebol.com" },
      { name: "FCF", domain: "futebolcearense.com.br" },
      { name: "CBSb", domain: "cbsb.com.br" },
      { name: "CBBF", domain: "cbbf.org.br" },
    ],
  },
  {
    index: "CH. 04",
    name: "Federações & Ligas Esportivas",
    logos: [
      { name: "FIVB", domain: "fivb.com" },
      { name: "Vôlei Brasil", domain: "cbv.com.br" },
      { name: "NBB", domain: "lnb.com.br" },
      { name: "WSL", domain: "worldsurfleague.com" },
      { name: "Dream Tour", domain: "dreamtour.com.br" },
      { name: "BWF", domain: "bwfbadminton.com" },
    ],
  },
  {
    index: "CH. 05",
    name: "Canais & Plataformas de Esporte",
    logos: [
      { name: "ESPN", domain: "espn.com" },
      { name: "SporTV", domain: "sportv.globo.com" },
      { name: "DAZN", domain: "dazn.com" },
      { name: "Fox Sports", domain: "foxsports.com" },
      { name: "Band Sports", domain: "bandsports.band.uol.com.br" },
      { name: "Esporte Interativo", domain: "esporteinterativo.com.br" },
      { name: "SportPromotion", domain: "sportpromotion.com.br" },
      { name: "Live Sports", domain: "livesports.com.br" },
      { name: "Live Mode", domain: "livemode.com" },
      { name: "Tribuna", domain: "tribunapr.com.br" },
    ],
  },
  {
    index: "CH. 06",
    name: "Luta & Combate",
    logos: [
      { name: "Jungle Fight", domain: "junglefight.com" },
      { name: "Maximum", domain: "maximumfight.com.br" },
      { name: "SFT", domain: "sftcombat.com" },
      { name: "X1Brazil", domain: "x1brazil.com.br" },
      { name: "CasaBlanca", domain: "casablancafight.com" },
    ],
  },
  {
    index: "CH. 07",
    name: "Entretenimento, Digital & Marcas",
    logos: [
      { name: "Disney Channel", domain: "disney.com" },
      { name: "YouTube", domain: "youtube.com" },
      { name: "MTV", domain: "mtv.com" },
      { name: "Universal Music Group", domain: "universalmusic.com" },
      { name: "PokerStars.com", domain: "pokerstars.com" },
      { name: "Pepsico", domain: "pepsico.com" },
      { name: "Rodobens", domain: "rodobens.com.br" },
    ],
  },
];

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}&size=400&format=png&retina=true&theme=dark&fallback=monogram`;

const ClientesHtml = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = rootRef.current?.querySelectorAll<HTMLDivElement>(".logo-card-html");
    if (!cards) return;
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Header />

      <style>{`
        .clientes-html { font-family: 'Inter', sans-serif; color: #EDEEF0; }
        .clientes-html .clients {
          padding: 96px 24px 64px; position: relative;
          background: #0A0C10 radial-gradient(circle at 15% 0%, rgba(232,163,61,.08), transparent 45%);
        }
        .clientes-html .clients::before {
          content:""; position:absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, #E8A33D, transparent); opacity:.5;
        }
        .clientes-html .clients-inner { max-width: 1180px; margin: 0 auto; }
        .clientes-html .eyebrow {
          display:flex; align-items:center; gap:10px;
          font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:600;
          letter-spacing:.18em; color:#E8A33D; margin-bottom:20px;
        }
        .clientes-html .live-dot {
          width:7px; height:7px; border-radius:50%; background:#E8A33D;
          animation: ch-pulse 1.8s ease-in-out infinite; flex-shrink:0;
        }
        .clientes-html .live-bars { display:inline-flex; gap:2px; align-items:flex-end; height:10px; }
        .clientes-html .live-bars i { display:block; width:2px; background:#E8A33D; animation: ch-bar 1.2s ease-in-out infinite; }
        .clientes-html .live-bars i:nth-child(1){ height:4px; }
        .clientes-html .live-bars i:nth-child(2){ height:9px; animation-delay:.2s; }
        .clientes-html .live-bars i:nth-child(3){ height:6px; animation-delay:.4s; }
        @keyframes ch-pulse { 0%,100%{opacity:1; transform:scale(1);} 50%{opacity:.35; transform:scale(.7);} }
        @keyframes ch-bar { 0%,100%{transform:scaleY(.55);} 50%{transform:scaleY(1);} }
        .clientes-html h2 {
          font-family:'Space Grotesk',sans-serif; font-size:clamp(28px,4vw,42px);
          font-weight:600; margin:0 0 14px; letter-spacing:-.01em; color:#EDEEF0;
        }
        .clientes-html .lead { color:#7E8794; font-size:16px; line-height:1.6; max-width:620px; margin:0 0 64px; }
        .clientes-html .category { margin-bottom:52px; }
        .clientes-html .cat-head {
          display:flex; align-items:baseline; gap:14px; margin-bottom:20px;
          padding-bottom:12px; border-bottom:1px solid #242B36;
        }
        .clientes-html .cat-index { font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:600; color:#E8A33D; letter-spacing:.08em; }
        .clientes-html .cat-name { font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:600; color:#EDEEF0; }
        .clientes-html .cat-count { margin-left:auto; font-size:12px; color:#7E8794; font-variant-numeric:tabular-nums; }
        .clientes-html .logo-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:14px;
        }
        .clientes-html .logo-card-html {
          position:relative; display:flex; flex-direction:column;
          background:#12161D; border:1px solid #242B36; border-radius:10px;
          opacity:0; transform:translateY(10px);
          transition: background .2s, border-color .2s, transform .5s, opacity .5s, box-shadow .2s;
          overflow:hidden;
        }
        .clientes-html .logo-card-html.in-view { opacity:1; transform:translateY(0); }
        .clientes-html .logo-card-html:hover { background:#1A2029; border-color:#E8A33D; box-shadow:0 6px 20px rgba(232,163,61,.15); }
        .clientes-html .logo-img-wrap {
          aspect-ratio:1/1; display:flex; align-items:center; justify-content:center;
          padding:14px; background:#0F1218;
        }
        .clientes-html .logo-card-html img { width:100%; height:100%; object-fit:contain; display:block; }
        .clientes-html .logo-name {
          font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:600;
          color:#EDEEF0; text-align:center; padding:10px 8px; line-height:1.25;
          border-top:1px solid #242B36; letter-spacing:.02em;
        }
        .clientes-html .logo-fallback {
          font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700;
          color:#E8A33D; text-align:center; line-height:1.2;
        }
        @media (max-width:640px){
          .clientes-html .clients { padding:64px 20px 48px; }
          .clientes-html .logo-grid { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }
          .clientes-html .logo-name { font-size:11px; padding:8px 6px; }
        }
        @media (prefers-reduced-motion:reduce){
          .clientes-html .live-dot, .clientes-html .live-bars i { animation:none; }
          .clientes-html .logo-card-html { transition:none; opacity:1; transform:none; }
        }
      `}</style>

      <div className="clientes-html" ref={rootRef}>
        <section className="clients">
          <div className="clients-inner">
            <div className="eyebrow">
              <span className="live-dot" />
              <span className="live-bars"><i /><i /><i /></span>
              <span>CLIENTES</span>
            </div>
            <h2>Quem já está no ar com a gente</h2>
            <p className="lead">
              Emissoras, federações e plataformas que confiam na Interfacetv Broadcasting para transmitir seus eventos ao vivo — com unidades móveis e DSNG prontos para qualquer cobertura.
            </p>

            {categories.map((cat) => (
              <div className="category" key={cat.index}>
                <div className="cat-head">
                  <span className="cat-index">{cat.index}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{cat.logos.length}</span>
                </div>
                <div className="logo-grid">
                  {cat.logos.map((logo) => (
                    <div key={`${cat.index}-${logo.name}`} className="logo-card-html" title={logo.name}>
                      <div className="logo-img-wrap">
                        <img
                          src={logoUrl(logo.domain)}
                          alt={logo.name}
                          loading="lazy"
                          onError={(e) => {
                            const img = e.currentTarget;
                            const parent = img.parentElement;
                            if (parent && !parent.querySelector(".logo-fallback")) {
                              img.style.display = "none";
                              const fb = document.createElement("span");
                              fb.className = "logo-fallback";
                              fb.textContent = logo.name.substring(0, 3).toUpperCase();
                              parent.appendChild(fb);
                            }
                          }}
                        />
                      </div>
                      <div className="logo-name">{logo.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p style={{ marginTop: 48, fontSize: 12, color: "#7E8794" }}>
              Logos fornecidas por <a href="https://logo.dev" style={{ color: "#E8A33D" }}>Logo.dev</a>.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ClientesHtml;
