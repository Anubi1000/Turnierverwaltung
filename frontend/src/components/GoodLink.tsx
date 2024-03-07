import React from "react";

export function GoodLink({children, classes}: { children: React.ReactNode, classes: string }) {
    return (
        <a className={classes} rel="noreferrer noopener" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            {children}
        </a>
    )
}