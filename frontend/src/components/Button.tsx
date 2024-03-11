import React from "react";

export function Button({
    classNames,
    type,
    onClick,
    children
}: {
    classNames?: string
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void
    children: React.ReactNode
}) {
    let style = "bg-black text-white rounded-md transition-colors hover:bg-gray-800 p-2"
    if (classNames) style += ` ${classNames}`

    return <button className={style} type={type} onClick={onClick}>{children}</button>
}