import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Logo = { name: string; file: string; review?: string };
type Category = { index: string; name: string; logos: Logo[] };

// Base curada de logos locais: evita retornos incorretos de domínios genéricos/subdomínios.
const categories: Category[] = [
  {
    index: "CH. 01",
    name: "TV Aberta & Emissoras",
    logos: [
      { name: "TV Globo", file: "tv-globo.svg" },
      { name: "RecordTV", file: "record.webp" },
      { name: "SBT", file: "sbt-restored.svg", review: "restaurada em vetor 4K para corrigir proporção/qualidade do arquivo anterior" },
      { name: "Band", file: "band.png" },
      { name: "TV Cultura", file: "tv-cultura-restored.svg", review: "restaurada em vetor 4K por falta de fonte oficial pública em alta resolução exatamente igual ao gabarito" },
      { name: "TV Brasil", file: "tv-brasil.png" },
      { name: "TV Verdes Mares", file: "tv-verdes-mares.png" },
      { name: "TV Liberal", file: "tv-liberal.png" },
      { name: "Rede Bahia", file: "rede-bahia.png" },
      { name: "Jangadeiro", file: "jangadeiro.png" },
      { name: "Futura", file: "futura.svg" },
      { name: "TVN", file: "tvn.png" },
      { name: "Cazé TV", file: "caze-tv.png" },
      { name: "Canal UOL", file: "canal-uol.png" },
      { name: "Sesc TV", file: "sesc-tv.png" },
    ],
  },
  {
    index: "CH. 02",
    name: "Institucional & Olímpico",
    logos: [
      { name: "NBR", file: "nbr.svg" },
      { name: "EBC", file: "ebc.png" },
      { name: "Ancine", file: "ancine.png" },
      { name: "Comitê Olímpico do Brasil", file: "cob.png" },
      { name: "Comitê Paralímpico Brasileiro", file: "cpb.png" },
    ],
  },
  {
    index: "CH. 03",
    name: "Futebol & Federações",
    logos: [
      { name: "CBF", file: "cbf.png" },
      { name: "CBF TV", file: "cbf-tv.png" },
      { name: "Conmebol TV", file: "conmebol-tv.png" },
      { name: "FCF", file: "fcf.png" },
      { name: "CBSb", file: "cbsb.png" },
      { name: "CBBF", file: "cbbf.png" },
    ],
  },
  {
    index: "CH. 04",
    name: "Federações & Ligas Esportivas",
    logos: [
      { name: "FIVB", file: "fivb.png" },
      { name: "Vôlei Brasil", file: "volei-brasil.png" },
      { name: "NBB", file: "nbb.png" },
      { name: "WSL", file: "wsl.png" },
      { name: "Dream Tour", file: "dream-tour.png" },
      { name: "BWF", file: "bwf.png" },
    ],
  },
  {
    index: "CH. 05",
    name: "Canais & Plataformas de Esporte",
    logos: [
      { name: "ESPN", file: "espn.png" },
      { name: "SporTV", file: "sportv.png" },
      { name: "DAZN", file: "dazn.png" },
      { name: "Fox Sports", file: "fox-sports.png" },
      { name: "Band Sports", file: "bandsports-restored.svg", review: "restaurada em vetor 4K porque o asset anterior estava ilegível no card" },
      { name: "Esporte Interativo", file: "esporte-interativo.png" },
      { name: "SportPromotion", file: "sportpromotion.png" },
      { name: "Live Sports", file: "live-sports.svg", review: "restaurada em vetor 4K com base no gabarito por falta de fonte pública estável em alta resolução" },
      { name: "Live Mode", file: "live-mode.png" },
      { name: "Tribuna", file: "tribuna.png" },
    ],
  },
  {
    index: "CH. 06",
    name: "Luta & Combate",
    logos: [
      { name: "Jungle Fight", file: "jungle-fight.png" },
      { name: "Maximum", file: "maximum-restored.svg", review: "restaurada em vetor 4K a partir de referência de baixa resolução" },
      { name: "SFT", file: "sft.png" },
      { name: "X1Brazil", file: "x1-brazil-restored.svg", review: "restaurada em vetor 4K; site oficial bloqueou acesso público" },
      { name: "CasaBlanca", file: "casablanca-restored.svg", review: "restaurada em vetor 4K por falta de fonte pública estável em alta resolução" },
    ],
  },
  {
    index: "CH. 07",
    name: "Entretenimento, Digital & Marcas",
    logos: [
      { name: "Disney Channel", file: "disney-channel.png" },
      { name: "YouTube", file: "youtube.svg" },
      { name: "MTV", file: "mtv-restored.svg", review: "restaurada em vetor 4K para corrigir logo invisível/ilegível" },
      { name: "Universal Music Group", file: "universal-music.svg" },
      { name: "PokerStars.com", file: "pokerstars.png" },
      { name: "Pepsico", file: "pepsico.svg" },
      { name: "Rodobens", file: "rodobens.png" },
    ],
  },
]

const logoUrl = (file: string) => `/images/client-logos/${file}`;

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
          min-height:190px;
          background:#12161D; border:1px solid #242B36; border-radius:10px;
          opacity:0; transform:translateY(10px);
          transition: background .2s, border-color .2s, transform .5s, opacity .5s, box-shadow .2s;
          overflow:hidden;
        }
        .clientes-html .logo-card-html.in-view { opacity:1; transform:translateY(0); }
        .clientes-html .logo-card-html:hover { background:#1A2029; border-color:#E8A33D; box-shadow:0 6px 20px rgba(232,163,61,.15); }
        .clientes-html .logo-img-wrap {
          width:100%; height:145px;
          display:flex; align-items:center; justify-content:center;
          padding:16px; background:#fff;
        }
        .clientes-html .logo-card-html img { width:100%; height:100%; object-fit:contain; display:block; }
        .clientes-html .logo-name {
          min-height:44px;
          display:flex; align-items:center; justify-content:center;
          font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:600;
          color:#EDEEF0; text-align:center; padding:8px 10px; line-height:1.2;
          border-top:1px solid #242B36;
        }
        .clientes-html .logo-fallback {
          font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700;
          color:#E8A33D; text-align:center; line-height:1.2;
        }
        .clientes-html .review-flag { display:none !important; }
        @media (max-width:640px){
          .clientes-html .clients { padding:64px 20px 48px; }
          .clientes-html .logo-grid { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }
          .clientes-html .logo-card-html { min-height:165px; }
          .clientes-html .logo-img-wrap { height:120px; padding:12px; }
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
                    <div key={`${cat.index}-${logo.name}`} className="logo-card-html" title={logo.review ? `${logo.name} — ${logo.review}` : logo.name}>
                      <div className="logo-img-wrap">
                        <img
                          src={logoUrl(logo.file)}
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
                      <div className="logo-name">
                        {logo.name}
                        {logo.review && <span className="review-flag">VALIDAR</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p style={{ marginTop: 48, fontSize: 12, color: "#7E8794", lineHeight: 1.7 }}>
              Base revisada com assets locais em alta resolução/SVG quando disponível. Marcas com selo <strong style={{ color: "#E8A33D" }}>VALIDAR</strong> foram restauradas em vetor 4K ou exigem conferência manual por falta de fonte oficial pública estável.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ClientesHtml;
