"use client";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  // Wait till nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? <>{children}</> : <div>Still loading...</div>} </>;
}
