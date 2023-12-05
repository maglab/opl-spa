import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { generalActions } from "../../state/generalStateSlice";
function useViewWidth() {
  const dispatch = useDispatch();
  const viewWidth = useSelector((state) => state.general.viewWidth);
  const isMobile = useSelector((state) => state.general.viewWidth);

  useEffect(() => {
    // Handle resizing of window and keep track of the inner width
    const handleResize = () => {
      dispatch(
        generalActions.setDimensions({
          viewWidth: window.innerWidth,
          viewHeight: window.innerHeight,
        })
      );
      dispatch(generalActions.setIsMobile());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); //Cleanup function to prevent memory leak
    };
  }, [dispatch, viewWidth]);
  return { viewWidth, isMobile };
}

export default useViewWidth;
