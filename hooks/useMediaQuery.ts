"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverSnapshot = false): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return serverSnapshot;
    }
    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
