"use client"
import {MediumButton} from "@/components/MediumButton";
import React from "react";

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
                    <MediumButton onClick={() => reset()}>Erneut versuchen</MediumButton>
                </div>
            </div>
        </main>
    )
}