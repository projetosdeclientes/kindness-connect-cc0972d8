import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";

type UnitData = {
  title: string;
  label: string;
  cameras: string;
  image: string | null;
  video: string[];
  audio: string[];
  estrutura: string[];
};

const unitsData: Record<string, UnitData> = {
  "unidade-1": {
    title: "Unidade 1",
    label: "HD UM 01",
    cameras: "16 CÂMERAS",
    image: "/images/um01.jpeg",
    video: [
      "01 Switches 24 canais - AVS350-HS - For.a",
      "16 Câmeras LDK3000 – Grass Valley",
      "16 Câmera Base Station - HD Triax - Grass-Valley",
      "16 Ocp 400 - Grass Valley",
      "02 Micro câmeras HD /SDI - Marshall",
      "01 Matrix de Video HD - KUMO 32x32 - Aja",
      "02 frames F.A - 9500 - For.A",
      "02 Frames Fs2 – Aja",
      "02 Servidor/Replay (4canais)Evs Xt2- Evs",
      "01 Servidor/Replay (8canais) 3play 820 –Newtronix",
      "02 Wave form e Vector Scope – Wfm7200 – Tecktronix",
      "01 monitor técnico Multiformato – Ikegame",
      "02 Monitores técnicos multiformat – Tv logic",
    ],
    audio: [
      "Sistema de Comunicação digital - Clear Com",
      "01 Matrix de Áudio 32 portas Cronus – Rts Telex",
      "06 Painéis de comunicação externa",
      "01 Mesa de áudio digital de 32 canais – DM1000 – Yamaha",
      "01 Mesa de áudio digital de 32 canais – 01V – Yamaha",
      "06 caixas de Monitoração – HS5- Yamaha",
      "06 Sistemas para narrador, comentarista e convidado – Ab120 – Clear com",
      "02 Sistemas de Repórter sem fio – Lectrosonics",
      "10 microfones de mão – Senheiser",
      "10 microfones de captação ambiente – Senheiser",
      "03 Hibridas de Comunicação –Rts Telex",
      "03 Sistemas de Comunicação Móvel (Chip cell) – Icell",
    ],
    estrutura: [
      "01 Caminhão ATEGO 1719 – Mercedes Benz – Baú de 10m comprimento x 2,60m largura x 2,60m altura",
      "No- break de 15 Kva – Cm comandos lineares",
      "02 Ar- Condicionados de 50btus-Carrier",
      "01 Ar- Condicionado de 12btus- Springer",
      "02 Transformadores/isoladores de 20kva - magnetrix",
    ],
  },
  "unidade-2": {
    title: "Unidade 2",
    label: "HD UM 02",
    cameras: "11 CÂMERAS",
    image: "/images/um02.jpeg",
    video: [
      "01 Switcher 16 canais – AV-HS 450-Panasonic",
      "11 Câmeras AK- HC3800-Panasonic",
      "11 Câmeras Base Station – HD Fibra – Panasonic",
      "11 Remotes – HRP 200 – Panasonic",
      "02 Micro Câmeras HD/SDI – Marshall",
      "01 Matrix de vídeo HD – KUMO 32x32 Aja",
      "02 Frames FA – 9500 –For.a",
      "02 Frames Fs2 – Aja",
      "02 Servidor/Replay (4canais) Evs xt2 – Evs",
      "01 Matriz de vídeo 32x32 - Kumo - AJA",
      "01 Servidor/ Replay SIMPLE LIVE",
      "01 Servidor/Replay (4canais) 3play 425 – Newtek",
      "01 Wave form e Vector Scope – Wfm7200 – Tektronix",
      "02 Monitores Técnicos Multiformat – Panasonic",
    ],
    audio: [
      "Sistema de comunicação digital - Clear Com",
      "01 Matrix de Áudio 72 portas plus3 – Clear com",
      "01 Mesas de áudio Digital de 32 canais – o1V – Yamaha",
      "03 Caixas de Monitoração – HS5 – Yamaha",
      "03 Sistemas de Repórter sem fio – Lectrosonics",
      "03 Sistemas Para Narrador, Comentarista e Convidado – Ab 120 – Clear Com",
      "10 Microfones de mão – Senheiser",
      "10 Microfones de Captação Ambiente – Senheiser",
      "03 hibridas de comunicação – Biquad",
    ],
    estrutura: [
      "01 Caminhão Apelo 815 - Mercedes Benz 815 - Baú de 6,40m comprimento, 2,4m de largura e 2,40 de altura",
      "No-Break de 15 kva- CM Comandos Lineares",
      "02 Ar-Condicionados de 32.000btus –Springer",
      "01 Transformadores/isoladores de 20kva – Magnetix",
    ],
  },
  "unidade-3": {
    title: "Unidade 3",
    label: "HD UM 03",
    cameras: "10 CÂMERAS",
    image: "/images/um03.jpeg",
    video: [
      "01 Switcher 16 canais – AV-HS 450- Panasonic",
      "10 Câmeras AK- HC3800 – Panasonic",
      "10 Camera Base STATION – Hd Fibra – Panasonic",
      "08 Remote- hrp 200 – Panasonic",
      "01 Servidor/ Replay ( 4 canais) EVS",
      "02 Micro câmeras HD/SDI - Marshall",
      "01 Matrix de Video HD – KUMO 16X16 - Aja",
      "02 Frames F.A – 9500 – For.a",
      "01 Frame Fs2 – Aja",
      "02 Servidor/Replay (4canais) 3play 425 – newtek",
      "02 Smartscope Duo 4k – Black Magic",
      "02 Monitores Técnicos Multiformat – Panasonic",
    ],
    audio: [
      "Sistema de comunicação digital - Clear Com",
      "01 Matrix de Áudio 16 portas Eclipse – Clear Com",
      "01 Mesa de áudio Digital de 32 canais – DM1000 – Yamaha",
      "01 Mesa de Audio Digital de 32 Canais – 01V – Yamaha",
      "03 Caixas de Monitoração – HS5 – Yamaha",
      "03 Sistemas Para Narrador, Comentarista e Convidado – Ab 120 – Clear Com",
      "02 Sistemas de Repórter sem fio - Lectrsonics",
      "10 Microfones de mão – Sensheiser",
      "10 Microfones de Captação de ambiente – Senheiser",
      "03 Hibridas de comunicação – Rts Telex",
      "03 Hibridas de comunicação móvel (chip cell) – icell",
    ],
    estrutura: [
      "01 Caminhão ATEGO 1719 Mercedes Benz – Baú de 9m comprimento, 2,40m altura 2,40m largura",
      "No-Break de 15 Kva – Cm Comandos lineares",
      "02 Ar-condicionado de 50Btus – Carrier",
      "01 Ar- condicionado de 12Btus – Springer",
      "02 Transformadores/isoladores de 20KVa – Magnetix",
    ],
  },
  "unidade-4": {
    title: "Unidade 4",
    label: "HD UM 04",
    cameras: "07 CÂMERAS",
    image: "/images/um04.jpeg",
    video: [
      "01 Switcher 16 canais AV-HS450 -PANASONIC",
      "11 Câmeras -AK-HC3800 PANASONIC",
      "11 Ocp - PANASONIC",
      "02 Micro câmeras - CV505 - MARSHALL",
      "01 Matrix de vídeo 32x32 - KUMO - AJA",
      "02 Frames Synchronizer - FA.9500 - FOR.A",
      "02 Frames Synchronizer - FS2 - AJA",
      "01 Waveform/Vector Scope - WFM7200 -TEKTRONIX",
      "02 Waveform/Vector Scope - SMART DUO 4K - BLACK MAGIC",
      "02 Monitores de referência de vídeo - BLACK MAGIC",
      "01 Servidor/Replay 4 canais - XT2- EVS",
      "02 Servidores/Replay 8 canais - 3PLAY 440 - NEWTEK",
    ],
    audio: [
      "Sistema de comunicação digital - Clear Com",
      "01 Matrix de áudio/Intercom 72 portas - PLUS 3 - CLEAR COM",
      "02 Mesas de áudio digital 48 canais - 01V - YAMAHA",
      "04 Monitores de referência HS8 - YAMAHA",
      "02 Announcer Console - AB120 - CLEAR COM",
      "03 Sistemas Para Narrador, Comentarista e Convidado – Ab 120 – Clear Com",
      "10 Microfones de mão – Sensheiser",
      "10 Microfones de Captação de ambiente – Senheiser",
      "03 Hibridas de comunicação – Rts Telex",
    ],
    estrutura: [
      "01 Van 416 CDI Mercedes Benz – Baú de 5m comprimento, 1,70m largura e 2m altura",
      "02 No-Break de 6 Kvas – EATON",
      "02 Ar-condicionado de 12.000 Btus – Springer",
      "01 Transformadores/isoladores de 20KVa – Magnetix",
    ],
  },
};

const unitKeys = ["unidade-1", "unidade-2", "unidade-3", "unidade-4"];

const UnidadeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const unit = id ? unitsData[id] : null;
  const currentIndex = id ? unitKeys.indexOf(id) : -1;
  const prevUnit = currentIndex > 0 ? unitKeys[currentIndex - 1] : null;
  const nextUnit = currentIndex < unitKeys.length - 1 ? unitKeys[currentIndex + 1] : null;

  if (!unit) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-36 text-center text-muted-foreground">Unidade não encontrada.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 radial-glow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <AnimatedSection>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
              <Link to="/unidades-moveis" className="hover:text-primary transition-colors">Unidades Móveis</Link>
              <span>/</span>
              <span className="text-foreground">{unit.title}</span>
            </div>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] text-primary border border-primary/20 bg-primary/5 mb-3">
                  {unit.label}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{unit.title}</h1>
                <p className="text-lg gradient-text font-semibold mt-1">{unit.cameras}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Image */}
          {unit.image && (
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden border border-border/30 mb-12">
                <img src={unit.image} alt={unit.title} className="w-full" />
              </div>
            </AnimatedSection>
          )}

          {/* Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Vídeo", items: unit.video },
              { title: "Áudio", items: unit.audio },
              { title: "Estrutura", items: unit.estrutura },
            ].map((section, i) => (
              <AnimatedSection key={section.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card/30 border border-border/30 h-full">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 pb-3 border-b border-border/30">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <div className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Navigation */}
          <AnimatedSection className="mt-12">
            <div className="flex justify-between">
              {prevUnit ? (
                <Link to={`/unidades-moveis/${prevUnit}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft size={14} /> Unidade anterior
                </Link>
              ) : <div />}
              {nextUnit ? (
                <Link to={`/unidades-moveis/${nextUnit}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  Próxima unidade <ArrowRight size={14} />
                </Link>
              ) : <div />}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UnidadeDetail;
