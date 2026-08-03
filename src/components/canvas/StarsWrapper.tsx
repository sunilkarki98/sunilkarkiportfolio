"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const StarsCanvas = dynamic(() => import('./Stars'), { ssr: false });

export default function StarsWrapper() {
  return (
    <Suspense fallback={null}>
      <StarsCanvas />
    </Suspense>
  );
}
