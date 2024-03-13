"use client"

import {Button} from "@/components/Button";
import React from "react";
import {Text} from "@/components/Text";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col h-screen">
            <div className="basis-1/3 flex flex-row text-3xl font-bold items-center justify-center">
                <Text level="h1" className="text-red-500">Etwas ist schiefgelaufen</Text>
            </div>
            <div className="basis-1/3 flex flex-col items-center justify-center">
                <Button classNames="min-w-48" onClick={reset}>Erneut versuchen</Button>
            </div>
        </div>
    )
}