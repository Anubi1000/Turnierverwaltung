import React from "react";

export function MediumButton({
    classNames,
    onClick,
    children
}: {
    classNames?: string
    onClick?: () => void
    children: React.ReactNode
}) {
    let style = "bg-black text-white rounded-md transition-colors hover:bg-gray-800 p-4 min-w-48"
    if (classNames) style += ` ${classNames}`

    return <button className={style} onClick={onClick}>{children}</button>
}
