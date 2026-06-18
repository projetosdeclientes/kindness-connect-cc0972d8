import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

const CountUp = ({ value, duration = 2.8, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const { target, suffix, isNumeric } = useMemo(() => {
    const m = value.match(/^(\d+)(.*)$/);
    return m
      ? { target: parseInt(m[1], 10), suffix: m[2], isNumeric: true }
      : { target: 0, suffix: value, isNumeric: false };
  }, [value]);

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
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
  }, [inView, isNumeric, target, duration]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? `${n}${suffix}` : value}
    </span>
  );
};

export default CountUp;
