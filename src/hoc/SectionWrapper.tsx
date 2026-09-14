import React from "react";
import { styles } from "@/styles";

const StarWrapper = <P extends object>(Component: React.ComponentType<P>, idName: string) => {
  const HOC = (props: P) => {
    return (
      <section className={`${styles.padding} max-w-[1400px] mx-auto relative z-0`}>
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component {...props} />
      </section>
    );
  };

  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name || "Component"})`;
  return HOC;
};

export default StarWrapper;