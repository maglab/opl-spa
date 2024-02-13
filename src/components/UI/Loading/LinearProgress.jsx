import React from "react";

function LinearProgress({ value, max }) {
  const width = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default LinearProgress;
