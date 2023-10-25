import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-[#1c1d20]",
  bgColorHover = "hover:bg-[#303134]",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-poppins font-semibold duration-200 ${bgColor} ${bgColorHover} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
