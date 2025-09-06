import { useEffect, useState } from "react";

export default function useCarousel(
  carouseItemInd,
  ele,
  items = [],
  variableWidth = false
) {
  const [maxIndex, setMaxIndex] = useState(0);
  const [step, setStep] = useState(100); // px scroll step for variable width

  // 🔹 Calculate maxIndex dynamically
  useEffect(() => {
    if (!ele.current || items.length === 0) return;

    const updateMaxIndex = () => {
      if (!ele.current || items.length === 0) return;

      const containerWidth = ele.current.offsetWidth;

      if (!variableWidth) {
        // ✅ Fixed width (posters)
        const itemWidth = ele.current.childNodes[0]?.offsetWidth || 1;
        const visibleCount = Math.floor(containerWidth / itemWidth);
        const total = items.length;
        setMaxIndex(Math.max(0, total - visibleCount));
      } else {
        // ✅ Variable width (labels)
        const totalWidth = Array.from(ele.current.childNodes).reduce(
          (sum, child) => sum + child.offsetWidth,
          0
        );
        // How many pixels we can scroll
        const scrollableWidth = totalWidth - containerWidth;
        setMaxIndex(scrollableWidth > 0 ? scrollableWidth : 0);
        // 🔹 dynamic step: scroll by ~80% of container width
        setStep(Math.floor(containerWidth * 0.8));
      }
    };
    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => window.removeEventListener("resize", updateMaxIndex);
  }, [items, variableWidth]);

  // 🔹 Apply translateX for carousel movement
  useEffect(() => {
    if (!ele.current || items.length === 0) return;

    const eleChild = ele.current;

    // Clamp index so we don’t overscroll
    // const index = Math.min(carouseItemInd, maxIndex);

    if (!variableWidth) {
      // ✅ Fixed width → shift by index * 100%
      eleChild.childNodes.forEach((child) => {
        child.style.transform = `translateX(${-100 * carouseItemInd}%)`;
        child.style.transition = "transform 0.5s ease";
      });
    } else {
      // ✅ Variable width → pixel shift
      const offset = Math.min(carouseItemInd, maxIndex); // stop at last item edge
      eleChild.style.transform = `translateX(${-offset}px)`;
      eleChild.style.transition = "transform 0.5s ease";
    }
  }, [carouseItemInd, variableWidth, items, maxIndex]);

  return { maxIndex, step };
  // expose maxIndex and step to component
}
