import { useRef } from "react";
import "../../assets/css/Ripple.css";

/**
 * withRipple higher order function to apply ripple effect to components.
 * @param {React.ComponentType} WrappedComponent - The component to wrap with the ripple effect
 * @returns {React.FC} - Component wrapped with ripple functionality
 */

const withRipple = (WrappedComponent) =>
  function (props) {
    // Reference to the wrapping container to determine the position and size for the ripple
    const containerRef = useRef(null);

    /**
     *
     * @param {MouseEvent} event - The mouse event
     */
    const addRippleEffect = (event) => {
      const container = containerRef.current;
      const ripple = document.createElement("span");
      const rect = container.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      ripple.classList.add("ripple");
      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });

      container.appendChild(ripple);
    };

    return (
      // This container is relative and listend for the click event to trigger the ripple
      <div
        ref={containerRef}
        className="ripple-container"
        onClick={addRippleEffect}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

export default withRipple;
