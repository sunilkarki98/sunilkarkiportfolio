import React, { ReactNode, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ children, className = "", as: Component = "div", ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={`w-full max-w-[1400px] mx-auto ${className}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";