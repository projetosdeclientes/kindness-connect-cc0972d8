import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Logo = {
  name: string;
  /** URL da logo real */
  src: string;
  /** true = logo clara/branca -> usa fundo escuro no card */
  dark?: boolean;
};

type Category = {
  index: string;
  name: string;
  logos: Logo[];
};

// Logos reais: Clearbit para marcas com domínio, Wikimedia para federações/orgs.
const clearbit = (domain: string) => `https://logo.clearbit.com/${domain}`;

const categories: Category[] = [
  {
    index: "CH. 01",
    name: "TV Aberta & Emissoras",
    logos: [
      { name: "TV Globo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Rede_Globo_logo_2021.svg/512px-Rede_Globo_logo_2021.svg.png" },
      { name: "RecordTV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Record_2023_logo.svg/512px-Record_2023_logo.svg.png" },
      { name: "SBT", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/SBT_2020_logo.svg/512px-SBT_2020_logo.svg.png" },
      { name: "Band", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Band_logo_2011.svg/512px-Band_logo_2011.svg.png" },
      { name: "TV Cultura", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/TV_Cultura_logo_2013.svg/512px-TV_Cultura_logo_2013.svg.png" },
      { name: "TV Brasil", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/TV_Brasil_logo_2022.svg/512px-TV_Brasil_logo_2022.svg.png" },
      { name: "TV Verdes Mares", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/TV_Verdes_Mares_logo.svg/512px-TV_Verdes_Mares_logo.svg.png" },
      { name: "TV Liberal", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TV_Liberal_logo_2016.svg/512px-TV_Liberal_logo_2016.svg.png" },
      { name: "Rede Bahia", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rede_Bahia_logo.svg/512px-Rede_Bahia_logo.svg.png" },
      { name: "Jangadeiro", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/TV_Jangadeiro_logo_2019.svg/512px-TV_Jangadeiro_logo_2019.svg.png" },
      { name: "Futura", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Canal_Futura_logo_2015.svg/512px-Canal_Futura_logo_2015.svg.png" },
      { name: "TVN", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/TVN_Chile_logo_2016.svg/512px-TVN_Chile_logo_2016.svg.png" },
      { name: "Cazé TV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/CazeTV.svg/512px-CazeTV.svg.png", dark: true },
      { name: "Canal UOL", src: clearbit("uol.com.br") },
      { name: "Sesc TV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/SescTV_logo_2020.svg/512px-SescTV_logo_2020.svg.png" },
    ],
  },
  {
    index: "CH. 02",
    name: "Institucional & Olímpico",
    logos: [
      { name: "NBR", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Canal_Gov_logo.svg/512px-Canal_Gov_logo.svg.png" },
      { name: "EBC", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Empresa_Brasil_de_Comunica%C3%A7%C3%A3o_logo.svg/512px-Empresa_Brasil_de_Comunica%C3%A7%C3%A3o_logo.svg.png" },
      { name: "Ancine", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Logo_ANCINE.svg/512px-Logo_ANCINE.svg.png" },
      { name: "Comitê Olímpico do Brasil", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Comit%C3%AA_Ol%C3%ADmpico_do_Brasil_logo.svg/512px-Comit%C3%AA_Ol%C3%ADmpico_do_Brasil_logo.svg.png" },
      { name: "Comitê Paralímpico Brasileiro", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Comit%C3%AA_Paral%C3%ADmpico_Brasileiro_logo.svg/512px-Comit%C3%AA_Paral%C3%ADmpico_Brasileiro_logo.svg.png" },
    ],
  },
  {
    index: "CH. 03",
    name: "Futebol & Federações",
    logos: [
      { name: "CBF", src: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Brazilian_Football_Confederation_logo.svg/512px-Brazilian_Football_Confederation_logo.svg.png" },
      { name: "CBF TV", src: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Brazilian_Football_Confederation_logo.svg/512px-Brazilian_Football_Confederation_logo.svg.png" },
      { name: "Conmebol TV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/CONMEBOL_logo_2023.svg/512px-CONMEBOL_logo_2023.svg.png" },
      { name: "FCF", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Federa%C3%A7%C3%A3o_Cearense_de_Futebol_logo.svg/512px-Federa%C3%A7%C3%A3o_Cearense_de_Futebol_logo.svg.png" },
      { name: "CBSb", src: "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6a/Cbsb_logo.png/240px-Cbsb_logo.png" },
      { name: "CBBF", src: clearbit("cbbf.org.br") },
    ],
  },
  {
    index: "CH. 04",
    name: "Federações & Ligas Esportivas",
    logos: [
      { name: "FIVB", src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/F%C3%A9d%C3%A9ration_Internationale_de_Volleyball_logo.svg/512px-F%C3%A9d%C3%A9ration_Internationale_de_Volleyball_logo.svg.png" },
      { name: "Vôlei Brasil", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Confedera%C3%A7%C3%A3o_Brasileira_de_Voleibol_logo.svg/512px-Confedera%C3%A7%C3%A3o_Brasileira_de_Voleibol_logo.svg.png" },
      { name: "NBB", src: "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Novo_Basquete_Brasil_logo.svg/512px-Novo_Basquete_Brasil_logo.svg.png" },
      { name: "WSL", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/World_Surf_League_logo.svg/512px-World_Surf_League_logo.svg.png", dark: true },
      { name: "Dream Tour", src: clearbit("dreamtour.com.br") },
      { name: "BWF", src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Badminton_World_Federation_logo.svg/512px-Badminton_World_Federation_logo.svg.png" },
    ],
  },
  {
    index: "CH. 05",
    name: "Canais & Plataformas de Esporte",
    logos: [
      { name: "ESPN", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/512px-ESPN_wordmark.svg.png", dark: true },
      { name: "SporTV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/SporTV_logo_2015.svg/512px-SporTV_logo_2015.svg.png" },
      { name: "DAZN", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/DAZN_1_Logo.svg/512px-DAZN_1_Logo.svg.png" },
      { name: "Fox Sports", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/2015_Fox_Sports_logo.svg/512px-2015_Fox_Sports_logo.svg.png" },
      { name: "Band Sports", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/BandSports_logo_2011.svg/512px-BandSports_logo_2011.svg.png" },
      { name: "Esporte Interativo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Esporte_Interativo_logo_2016.svg/512px-Esporte_Interativo_logo_2016.svg.png" },
      { name: "SportPromotion", src: clearbit("sportpromotion.com.br") },
      { name: "Live Sports", src: clearbit("livesports.com.br") },
      { name: "Live Mode", src: clearbit("livemode.com") },
      { name: "Tribuna", src: clearbit("tribunapr.com.br") },
    ],
  },
  {
    index: "CH. 06",
    name: "Luta & Combate",
    logos: [
      { name: "Jungle Fight", src: clearbit("junglefight.com") },
      { name: "Maximum", src: clearbit("maximummma.com.br") },
      { name: "SFT", src: clearbit("sftcombat.com") },
      { name: "X1Brazil", src: clearbit("x1brazil.com.br") },
      { name: "CasaBlanca", src: clearbit("casablancafight.com") },
    ],
  },
  {
    index: "CH. 07",
    name: "Entretenimento, Digital & Marcas",
    logos: [
      { name: "Disney Channel", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2019_Disney_Channel_logo.svg/512px-2019_Disney_Channel_logo.svg.png" },
      { name: "YouTube", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/512px-YouTube_full-color_icon_%282017%29.svg.png" },
      { name: "MTV", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/MTV-2021.svg/512px-MTV-2021.svg.png" },
      { name: "Universal Music Group", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Universal_Music_Group_logo.svg/512px-Universal_Music_Group_logo.svg.png" },
      { name: "PokerStars.com", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/PokerStars_logo.svg/512px-PokerStars_logo.svg.png" },
      { name: "Pepsico", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/PepsiCo_logo.svg/512px-PepsiCo_logo.svg.png" },
      { name: "Rodobens", src: clearbit("rodobens.com.br") },
    ],
  },
];

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
          padding: 96px 24px 64px;
          position: relative;
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
        .clientes-html .live-bars i:nth-child(1){ height:4px; animation-delay:0s; }
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
        .clientes-html .category:last-child { margin-bottom:0; }
        .clientes-html .cat-head {
          display:flex; align-items:baseline; gap:14px; margin-bottom:20px;
          padding-bottom:12px; border-bottom:1px solid #242B36;
        }
        .clientes-html .cat-index { font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:600; color:#E8A33D; letter-spacing:.08em; white-space:nowrap; }
        .clientes-html .cat-name { font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:600; letter-spacing:.02em; color:#EDEEF0; }
        .clientes-html .cat-count { margin-left:auto; font-size:12px; color:#7E8794; font-variant-numeric:tabular-nums; }
        .clientes-html .logo-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:12px;
        }
        .clientes-html .logo-card-html {
          position:relative; aspect-ratio:4/3;
          background:#ffffff; border:1px solid #E5E7EB; border-radius:8px;
          display:flex; align-items:center; justify-content:center; padding:18px;
          opacity:0; transform:translateY(10px);
          transition: background .2s ease, border-color .2s ease, transform .5s ease, opacity .5s ease, box-shadow .2s ease;
          overflow:hidden;
        }
        .clientes-html .logo-card-html.dark-bg { background:#111418; border-color:#2A2F38; }
        .clientes-html .logo-card-html.in-view { opacity:1; transform:translateY(0); }
        .clientes-html .logo-card-html:hover { border-color:#E8A33D; box-shadow:0 6px 20px rgba(232,163,61,.15); }
        .clientes-html .logo-card-html img {
          max-width:100%; max-height:100%; object-fit:contain; display:block;
        }
        .clientes-html .logo-fallback {
          font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:600;
          color:#111418; text-align:center; line-height:1.2;
        }
        .clientes-html .dark-bg .logo-fallback { color:#EDEEF0; }
        .clientes-html .card-tag {
          position:absolute; top:6px; right:6px;
          font-family:'Space Grotesk',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:.06em; color:#9CA3AF; background:transparent; padding:2px 5px; border-radius:3px;
        }
        .clientes-html .dark-bg .card-tag { color:#6B7280; }
        @media (max-width:640px){
          .clientes-html .clients { padding:64px 20px 48px; }
          .clientes-html .logo-grid { grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); }
        }
        @media (prefers-reduced-motion:reduce){
          .clientes-html .live-dot, .clientes-html .live-bars i { animation:none; }
          .clientes-html .logo-card-html { transition:none; opacity:1; transform:none; }
        }
      `}</style>

      <div className="clientes-html" ref={rootRef}>
        <section className="clients" id="clientes">
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
                    <div
                      key={logo.name}
                      className={`logo-card-html${logo.dark ? " dark-bg" : ""}`}
                      title={logo.name}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          const parent = img.parentElement;
                          if (parent && !parent.querySelector(".logo-fallback")) {
                            img.style.display = "none";
                            const fb = document.createElement("span");
                            fb.className = "logo-fallback";
                            fb.textContent = logo.name;
                            parent.appendChild(fb);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ClientesHtml;
