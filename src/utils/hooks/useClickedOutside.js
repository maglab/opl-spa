import { useEffect } from "react";

/**
 * Hook that executes something if a user has clicked outside of the component.
 * @param {React.Ref} ref
 * @param {function} callback - Function to be executed when outside element clicked
 * @returns
 */
export default function useClickedOutside(ref, callback) {
  useEffect(() => {
    function handleOutsideEvent(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind function to event listener
    document.addEventListener("mousedown", handleOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
    };
  }, [ref, callback]);
}
