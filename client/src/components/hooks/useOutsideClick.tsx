"use client";

import { useEffect, useRef } from "react";

function useOutsideClick(
  refs: Array<React.RefObject<HTMLElement | null> | null | undefined>,
  callback: () => void,
) {
  const callbackRef = useRef(callback);
  const refsRef = useRef(refs);

  // Update refs when they change
  useEffect(() => {
    callbackRef.current = callback;
    refsRef.current = refs;
  }, [refs, callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside all refs
      const isOutside = refsRef.current.every(
        (ref: React.RefObject<HTMLElement | null> | null | undefined) =>
          ref?.current != null &&
          !ref.current.contains(event.target as Node | null),
      );

      if (isOutside) {
        callbackRef.current();
      }
    };

    // Use a small delay to avoid immediate firing
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array - refs are stored in refsRef
}

export default useOutsideClick;
