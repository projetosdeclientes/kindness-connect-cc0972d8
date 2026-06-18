import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const Magnetic = ({ children, className = "", strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
