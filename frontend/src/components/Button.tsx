import React from "react";

export default function Button({
  className,
  style,
  type,
  onClick,
  children,
}: {
  className?: string;
  style?: "filled" | "outlined";
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (!style) style = "filled";

  let classes = "rounded-md transition-colors p-2";
  switch (style) {
    case "filled":
      classes += " bg-black text-white hover:bg-gray-800";
      break;
    case "outlined":
      classes += " border border-black hover:border-gray-400";
  }
  if (className) classes += ` ${className}`;

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
