import React from "react";

type SearchIconProps = {
  color: "white" | "black";
};

export const SearchIcon: React.FC<SearchIconProps> = ({ color }) => {
  const getColor = () => {
    if (color === "white") {
      return "text-white mb-0.5 dark:text-white/90 text-slate-200";
    }

    return "text-black/50 mb-0.5 dark:text-white/90";
  };
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="2em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1.4em"
      className={"pointer-events-none flex-shrink-0 " + getColor()}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
