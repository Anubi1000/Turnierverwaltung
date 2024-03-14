import React from "react";

export function Text({
  level,
  className,
  children,
}: {
  level: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  if (className) {
    className = " " + className;
  } else {
    className = "";
  }
  switch (level) {
    case "h1":
      return <h1 className={"text-3xl font-bold" + className}>{children}</h1>;
    case "h2":
      return <h2 className={"text-2xl font-bold" + className}>{children}</h2>;
    case "h3":
      return <h3 className={"text-xl font-bold" + className}>{children}</h3>;
    default:
      throw new Error(`Unhandled level: ${level}`);
  }
}
