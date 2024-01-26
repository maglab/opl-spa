import React from "react";

export default function Spinner({ width, height }) {
  return (
    <div
      className={`animate-spin rounded-full w-${width ? width : 10} h-${
        height ? height : 10
      } bg-gradient-to-tr from-theme-blue to-theme-blue-light flex items-center justify-center`}
    >
      <div
        className={`h-${height ? height - 3 : 7} w-${
          width ? width - 3 : 7
        } rounded-full bg-bg-grey`}
      ></div>
    </div>
  );
}
