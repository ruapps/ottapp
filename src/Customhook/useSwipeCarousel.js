import { useRef, useEffect } from "react";

export default function useSwipeCarousel(ref, { onSwipeLeft, onSwipeRight }) {
  const startX = useRef(null);
  const endX = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX.current !== null && endX.current !== null) {
        const diff = startX.current - endX.current;

        // ✅ sensitivity threshold adapts with screen width
        const threshold =
          window.innerWidth < 600 ? 40 : window.innerWidth < 1024 ? 60 : 80;

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            onSwipeLeft && onSwipeLeft();
          } else {
            onSwipeRight && onSwipeRight();
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
  }, [ref, onSwipeLeft, onSwipeRight]);
}
