"use client";
import React, { useState } from "react";

export default function AssignTo({ onClick, children }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleAssignClick = () => {
    setIsClicked(!isClicked);
    onClick;
  };
  return (
    <button
      onClick={handleAssignClick}
      className={
        isClicked
          ? "w-12 h-5 text-white bg-primary text-xs rounded-md"
          : "w-12 h-5 text-black bg-[#f2edff] text-xs rounded-md"
      }
    >
      {children}
    </button>
  );
}
