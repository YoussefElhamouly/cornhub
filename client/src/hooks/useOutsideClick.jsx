import { useEffect } from "react";

function useOutsideClick(refs, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside all refs
      const isOutside = refs.every(
        (ref) => ref?.current && !ref.current.contains(event.target)
      );

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
}

export default useOutsideClick;
