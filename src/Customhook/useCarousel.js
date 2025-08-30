import { useEffect } from "react";

export default function useCarousel(carouseItemInd, ele) {
  const ItemInd = carouseItemInd;
  let eleChild;
  useEffect(() => {
    eleChild = ele.current;
    if (eleChild.tagName === "UL") {
      eleChild.style.transform = "translateX(" + -5 * ItemInd + "%)";
      // eleChild.style.transition = "tra"
    } else {
      eleChild.childNodes.forEach((ele) => {
        ele.style.transform = "translateX(" + -100 * ItemInd + "%)";
      });
    }
  }, [ItemInd]);
}
