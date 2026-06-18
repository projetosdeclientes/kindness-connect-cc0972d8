import { useEffect, useState } from "react";
import heroImg1 from "../assets/hero-truck.png";
import heroImg2 from "../assets/hero-truck-2.png";

interface HeroCrossfadeProps {
  className?: string;
  alt?: string;
  intervalMs?: number;
  fadeMs?: number;
}

const images = [heroImg1, heroImg2];

const HeroCrossfade = ({
  className = "",
  alt = "Interface TV Broadcasting - Unidade Móvel",
  intervalMs = 3000,
  fadeMs = 1500,
}: HeroCrossfadeProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          draggable={false}
          className={`${className} transition-opacity ease-in-out`}
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${fadeMs}ms`,
          }}
        />
      ))}
    </>
  );
};

export default HeroCrossfade;
