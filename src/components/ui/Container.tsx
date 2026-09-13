import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ children, className = "", as: Component = "div", id }, ref) => {
    return (
      <Component
        ref={ref}
        id={id}
        className={`w-full max-w-[1400px] mx-auto ${className}`}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
