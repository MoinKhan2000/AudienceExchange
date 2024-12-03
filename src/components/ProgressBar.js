import React from "react";

const ProgressBar = ({ progress }) => {
  let progressColor = "bg-red-500";

  if (progress >= 34 && progress <= 66) {
    progressColor = "bg-yellow-500";
  } else if (progress > 66) {
    progressColor = "bg-green-500";
  }

  return (
    <div className="w-full bg-white h-2 rounded-lg overflow-hidden">
      <div
        className={`${progressColor} h-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
