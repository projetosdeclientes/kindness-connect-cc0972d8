import droneVideo from "../assets/drone-arena-castelao.mp4.asset.json";
import { useEffect, useRef } from "react";

interface HeroCrossfadeProps {
  className?: string;
  alt?: string;
}

const HeroCrossfade = ({ className = "" }: HeroCrossfadeProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={droneVideo.url}
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
};

export default HeroCrossfade;
