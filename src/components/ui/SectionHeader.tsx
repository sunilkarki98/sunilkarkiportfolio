"use client";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  center?: boolean;
  className?: string;
}

const SectionHeader = ({ subtitle, title, center = true, className = "" }: SectionHeaderProps) => (
  <div className={`flex flex-col ${center ? "items-center" : ""} ${className}`}>
    <div className="mb-1">
      <p
        className={`text-text-primary/80 text-sm tracking-[0.2em] uppercase font-mono ${center ? "text-center" : ""}`}
        data-header="subtitle"
      >
        {`< ${subtitle} />`}
      </p>
    </div>
    <div className="w-full h-px bg-border mb-3" />
    <h2
      className={`font-heading font-semibold text-text-primary text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none ${center ? "text-center" : ""}`}
      data-header="title"
    >
      {title}
    </h2>
  </div>
);

export default SectionHeader;
