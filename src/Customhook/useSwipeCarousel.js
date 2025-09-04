import { useRef, useEffect } from "react";

export default function useSwipeCarousel({ onSwipeLeft, onSwipeRight }) {
  const startX = useRef(null);
  const endX = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX.current !== null && endX.current !== null) {
        const diff = startX.current - endX.current;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            onSwipeLeft && onSwipeLeft(); // next
          } else {
            onSwipeRight && onSwipeRight(); // prev
          }
        }
      }
      startX.current = null;
      endX.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);
}
