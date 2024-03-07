import React from "react";

export function SmallButton({
    classNames,
    onClick,
    children
}: {
    classNames?: string
    onClick?: () => void
    children: React.ReactNode
}) {
    let style = "bg-black text-white rounded-md transition-colors hover:bg-gray-800 py-1 px-2"
    if (classNames) style += ` ${classNames}`

    return <button className={style} onClick={onClick}>{children}</button>
}
