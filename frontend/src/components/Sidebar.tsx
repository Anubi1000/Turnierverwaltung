import React from "react";

export function Sidebar({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-gray-50 h-screen border-r flex flex-col p-1 w-[16.5rem]">
            {children}
        </div>
    )
}