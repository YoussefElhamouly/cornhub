import { useEffect, useRef } from "react";

function useOutsideClick(refs, callback) {
  const callbackRef = useRef(callback);
  const refsRef = useRef(refs);

  // Update refs when they change
  useEffect(() => {
    callbackRef.current = callback;
    refsRef.current = refs;
  }, [refs, callback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside all refs
      const isOutside = refsRef.current.every(
        (ref) => ref?.current && !ref.current.contains(event.target)
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
