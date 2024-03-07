import React from "react";

export function LargeButton({
    classNames,
    onClick,
    children
}: {
    classNames?: string
    onClick?: () => void
    children: React.ReactNode
}) {
    let style = "bg-black text-white rounded-md transition-colors hover:bg-gray-800 p-10 min-w-64 text-xl font-semibold"
    if (classNames) style += ` ${classNames}`

    return <button className={style} onClick={onClick}>{children}</button>
}
