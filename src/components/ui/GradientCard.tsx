"use client";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

const GradientCard = ({
  children,
  className = "",
  innerClassName = "",
}: GradientCardProps) => (
  <div
    className={`bg-surface border border-border rounded-xl h-full transition-all duration-300 shadow-sm group-hover:bg-surface-alt group-hover:border-border-hover group cursor-pointer ${className}`}
  >
    <div className={`w-full h-full ${innerClassName}`}>
      {children}
    </div>
  </div>
);

export default GradientCard;
