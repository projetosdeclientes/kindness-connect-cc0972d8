import heroImg2 from "../assets/hero-truck-2.png";

interface HeroCrossfadeProps {
  className?: string;
  alt?: string;
}

const HeroCrossfade = ({
  className = "",
  alt = "Interface TV Broadcasting - Frota de Unidades Móveis",
}: HeroCrossfadeProps) => {
  return (
    <img
      src={heroImg2}
      alt={alt}
      draggable={false}
      className={className}
    />
  );
};

export default HeroCrossfade;
