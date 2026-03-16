import AnimatedSection from "./AnimatedSection";

interface Props {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  label?: string;
}

const SectionHeader = ({ title, subtitle, gradient = true, label }: Props) => {
  return (
    <AnimatedSection className="text-center mb-14 md:mb-20">
      {label && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] text-primary border border-primary/20 bg-primary/5 mb-5">
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-[3.25rem] font-bold leading-tight text-balance ${gradient ? "gradient-text" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">{subtitle}</p>
      )}
    </AnimatedSection>
  );
};

export default SectionHeader;
