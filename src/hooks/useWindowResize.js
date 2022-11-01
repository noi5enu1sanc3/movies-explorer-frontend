import { useState, useEffect } from "react";

const getWidth = () => window.innerWidth;

export const useWindowResize = () => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId = null;

    const resizeListener = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => setWidth(getWidth()), 100);
    };
    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return width;
};
