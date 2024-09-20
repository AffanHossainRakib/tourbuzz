import * as React from "react";

// By: lucide
// See: https://v0.app/icon/lucide/search
// Example: <IconLucideSearch width="24px" height="24px" style={{color: "#000000"}} />

export const IconLucideSearch = ({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <g
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21l-4.3-4.3" />
    </g>
  </svg>
);
