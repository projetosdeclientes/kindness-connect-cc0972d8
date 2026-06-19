import fleetAsset from "../assets/fleet.png.asset.json";

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
      src={fleetAsset.url}
      alt={alt}
      draggable={false}
      className={className}
    />
  );
};

export default HeroCrossfade;
