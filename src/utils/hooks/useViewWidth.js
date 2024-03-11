import { useEffect, useState } from "react";

function useViewWidth() {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newViewWidth = window.innerWidth;
      setViewWidth(newViewWidth);

      // Determine if the screen is considered mobile based on some criteria (e.g., screen width)
      const newIsMobile = newViewWidth <= 450; // You can adjust this threshold - 450 for now since that encapsulates most mobile screens
      setIsMobile(newIsMobile);
    };

    // Initial update
    handleResize();

    // Add listener for window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove the event listener to prevent memory leaks
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { viewWidth, isMobile };
}

export default useViewWidth;
