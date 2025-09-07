import { useRef, useEffect } from "react";

export default function useSwipeCarousel(ref, { onSwipeLeft, onSwipeRight }) {
  const startX = useRef(null);
  const endX = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      // ✅ Only allow touches that start on this element
      if (!element.contains(e.target)) return;
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!element.contains(e.target)) return;
      endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (!element.contains(e.target)) return;

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

    // ✅ Attach only to this element, not window
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight]);
}
