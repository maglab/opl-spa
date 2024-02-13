// This HOC takes SVG Content and optional default props
/**
 * @param {React.Component} SvgContent - SVG Icon component to be wrapped containing svg information
 * @param {Object} defaultSvgProps
 * @returns {React.Component} - Wrapped SVG component
 */
const withSVG = (SvgContent, defaultSvgProps) =>
  function SvgComponent(props) {
    const combinedProps = { ...defaultSvgProps, ...props };
    return <SvgContent {...combinedProps} />;
  };

export default withSVG;
