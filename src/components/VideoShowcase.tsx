import { useEffect, useRef, type ComponentProps } from "react";
import droneVideo from "@/assets/drone-arena-castelao.mp4.asset.json";
import { cn } from "@/lib/utils";

export interface VideoShowcaseProps extends ComponentProps<"section"> {
  /** Título exibido sobre o vídeo. */
  title?: string;
  /** Legenda curta abaixo do título. */
  subtitle?: string;
}

/**
 * Bloco de vídeo em destaque (drone — Arena Castelão).
 * Dá play automaticamente ao entrar na viewport e pausa/reseta ao sair,
 * evitando consumo de banda enquanto o usuário não está vendo.
 */
const VideoShowcase = ({ title = "Arena Castelão", subtitle, className, ...props }: VideoShowcaseProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() pode rejeitar (políticas de autoplay); ignorar com segurança.
          void video.play().catch(() => undefined);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("relative border-t border-border/30", className)} {...props}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-card/40 shadow-[var(--shadow-card)]">
          <video
            ref={videoRef}
            src={droneVideo.url}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover aspect-video"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-background/90 to-transparent">
            <h2 className="text-xl md:text-3xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
