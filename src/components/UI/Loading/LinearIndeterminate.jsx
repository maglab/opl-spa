import React from "react";

function IndeterminateLinearProgress() {
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full animate-progress"
        style={{ width: "50%" }}
      />
    </div>
  );
}

export default IndeterminateLinearProgress;
