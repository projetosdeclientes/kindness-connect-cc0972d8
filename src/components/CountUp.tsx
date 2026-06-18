import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

const CountUp = ({ value, duration = 1.6, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, match]);

  return (
    <span ref={ref} className={className}>
      {match ? n : value}
      {match ? suffix : ""}
    </span>
  );
};

export default CountUp;
