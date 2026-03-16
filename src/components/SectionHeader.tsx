import AnimatedSection from "./AnimatedSection";

interface Props {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

const SectionHeader = ({ title, subtitle, gradient = true }: Props) => {
  return (
    <AnimatedSection className="text-center mb-12 md:mb-16">
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${gradient ? "gradient-text" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </AnimatedSection>
  );
};

export default SectionHeader;
