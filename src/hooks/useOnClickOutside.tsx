import React, { useEffect } from "react";
export const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
        document.removeEventListener("mousedown", listener)
    document.removeEventListener("touchstart", listener);
}
  }, [ref, handler]);
};
