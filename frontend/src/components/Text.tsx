import React from "react";

export function Text({
    level,
    classNames,
    children
}: {
    level: "h1" | "h2" | "h3"
    classNames?: string
    children: React.ReactNode
}) {
    if (classNames) {
        classNames = " " + classNames
    } else {
        classNames = ""
    }
    switch (level) {
        case "h1":
            return <h1 className={"text-3xl font-bold" + classNames}>{children}</h1>
        case "h2":
            return <h2 className={"text-2xl font-bold" + classNames}>{children}</h2>
        case "h3":
            return <h3 className={"text-xl font-bold" + classNames}>{children}</h3>
        default:
            throw new Error(`Unhandled level: ${level}`)
    }
}