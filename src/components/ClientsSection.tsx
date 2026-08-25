type Logo = { name: string; file: string };
type Category = { index: string; name: string; logos: Logo[] };

const categories: Category[] = [
  {
    index: "CH. 01",
    name: "TV Aberta & Emissoras",
    logos: [
      { name: "TV Globo", file: "tv-globo.png" },
      { name: "RecordTV", file: "record.webp" },
      { name: "SBT", file: "sbt.png" },
      { name: "Band", file: "band.png" },
      { name: "TV Cultura", file: "tv-cultura.png" },
      { name: "TV Brasil", file: "tv-brasil.png" },
      { name: "TV Verdes Mares", file: "tv-verdes-mares.png" },
      { name: "TV Liberal", file: "tv-liberal.png" },
      { name: "Rede Bahia", file: "rede-bahia.png" },
      { name: "Jangadeiro", file: "jangadeiro.png" },
      { name: "Futura", file: "futura.png" },
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
      { name: "NBR", file: "nbr.png" },
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
      { name: "Band Sports", file: "bandsports.png" },
      { name: "Esporte Interativo", file: "esporte-interativo.png" },
      { name: "SportPromotion", file: "sportpromotion.png" },
      { name: "Live Sports", file: "live-sports.png" },
      { name: "Live Mode", file: "live-mode.png" },
      { name: "Tribuna", file: "tribuna.png" },
    ],
  },
  {
    index: "CH. 06",
    name: "Luta & Combate",
    logos: [
      { name: "Jungle Fight", file: "jungle-fight.png" },
      { name: "Maximum", file: "maximum.png" },
      { name: "SFT", file: "sft.png" },
      { name: "X1Brazil", file: "x1-brazil.png" },
      { name: "CasaBlanca", file: "casablanca.png" },
    ],
  },
  {
    index: "CH. 07",
    name: "Entretenimento, Digital & Marcas",
    logos: [
      { name: "Disney Channel", file: "disney-channel.png" },
      { name: "YouTube", file: "youtube.png" },
      { name: "MTV", file: "mtv.png" },
      { name: "Universal Music", file: "universal-music.png" },
      { name: "PokerStars", file: "pokerstars.png" },
      { name: "PepsiCo", file: "pepsico.png" },
      { name: "Rodobens", file: "rodobens.png" },
    ],
  },
];

const logoUrl = (file: string) => `/images/client-logos/${file}`;

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, name: string) => {
  const img = e.currentTarget;
  const parent = img.parentElement;
  if (parent && !parent.querySelector(".logo-fallback")) {
    img.style.display = "none";
    const fb = document.createElement("span");
    fb.className = "logo-fallback";
    fb.textContent = name.substring(0, 3).toUpperCase();
    parent.appendChild(fb);
  }
};

const ClientsSection = ({ preview = false }: { preview?: boolean }) => {
  const displayCategories = preview ? categories.slice(0, 1) : categories;

  return (
    <section className="clients-section">
      <style>{`
.clients-section { margin-top: 2rem; }
.clients-section .category { margin-bottom: 2.5rem; }
.clients-section .cat-head {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1rem; padding: 0 0.25rem;
}
.clients-section .cat-index {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
  color: hsl(var(--primary)); background: hsl(var(--primary) / 0.12);
  padding: 0.25rem 0.6rem; border-radius: 4px;
}
.clients-section .cat-name { font-size: 1rem; font-weight: 600; color: #EDEEF0; }
.clients-section .cat-count {
  margin-left: auto; font-size: 0.75rem; color: hsl(var(--muted-foreground));
  background: #12161D; padding: 0.15rem 0.5rem; border-radius: 999px;
}
.clients-section .logo-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;
}
.clients-section .logo-card {
  background: #12161D; border: 1px solid #242B36; border-radius: 10px;
  overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
}
.clients-section .logo-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
.clients-section .logo-img-wrap {
  background: #fff; display: flex; align-items: center; justify-content: center;
  padding: 16px; height: 130px;
}
.clients-section .logo-img-wrap img { width: 100%; height: 100%; object-fit: contain; }
.clients-section .logo-fallback { font-size: 12px; font-weight: 700; color: #E8A33D; text-align: center; }
.clients-section .logo-name {
  padding: 0.625rem 0.5rem; border-top: 1px solid #242B36; text-align: center;
  font-size: 12px; font-weight: 600; color: #EDEEF0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
      `}</style>

      {displayCategories.map((cat) => (
        <div className="category" key={cat.index}>
          <div className="cat-head">
            <span className="cat-index">{cat.index}</span>
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.logos.length}</span>
          </div>
          <div className="logo-grid">
            {cat.logos.map((logo) => (
              <div className="logo-card" key={`${cat.index}-${logo.name}`} title={logo.name}>
                <div className="logo-img-wrap">
                  <img
                    src={logoUrl(logo.file)}
                    alt={logo.name}
                    loading="lazy"
                    onError={(e) => handleImgError(e, logo.name)}
                  />
                </div>
                <div className="logo-name">{logo.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/clientes"
            className="inline-block px-10 py-3.5 rounded-[10px] bg-primary text-primary-foreground text-[0.95rem] font-semibold"
          >
            Ver todos os clientes
          </a>
        </div>
      )}
    </section>
  );
};

export default ClientsSection;
