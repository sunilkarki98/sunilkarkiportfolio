import { useCallback, useSyncExternalStore } from "react";

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback((callback: EventListener) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
  }, [query]);

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
