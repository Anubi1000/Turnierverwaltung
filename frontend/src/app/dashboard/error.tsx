"use client"
import React from "react";
import {Button} from "@/components/Button";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main>
            <div className="flex flex-col h-screen">
                <div className="basis-1/3 flex flex-row text-3xl font-bold items-center justify-center">
                    <h1>Etwas ist schiefgelaufen</h1>
                </div>
                <div className="basis-1/3 flex flex-col items-center justify-center">
                    <Button classNames="min-w-48" onClick={() => reset()}>Erneut versuchen</Button>
                </div>
            </div>
        </main>
    )
}