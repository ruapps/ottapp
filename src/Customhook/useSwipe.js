import { useEffect, useRef } from "react";

export default function useSwipe(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleMouseDown = (e) => {
      touchStartX.current = e.clientX;
    };

    const handleMouseUp = (e) => {
      touchEndX.current = e.clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (
        touchStartX.current !== null &&
        touchEndX.current !== null &&
        Math.abs(touchStartX.current - touchEndX.current) > threshold
      ) {
        if (touchStartX.current > touchEndX.current) {
          onSwipeLeft && onSwipeLeft();
        } else {
          onSwipeRight && onSwipeRight();
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    // Mobile
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Desktop
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
}
