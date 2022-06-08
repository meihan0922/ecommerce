import { useEffect, useRef } from "react";

const useDimensions = () => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = document.querySelector("body").offsetWidth;
    dimensions.current.height = document.querySelector("body").offsetHeight;
  }, []);

  return dimensions.current;
};

export default useDimensions;
