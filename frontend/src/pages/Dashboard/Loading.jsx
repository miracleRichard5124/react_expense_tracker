import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-50">
      <div className="flex space-x-2">
        {/* Three dots with bounce and delay */}
        <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce animation-delay-200"></span>
        <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce animation-delay-400"></span>
      </div>
    </div>
  );
};

export default Loading;
