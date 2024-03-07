"use client";
import React from "react";
import {useSearchParams} from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h2 className="font-semibold text-2xl">Es ist ein Fehler beim Anmelden aufgetreten</h2>
            <p className="font-semibold text-xl text-red-500"> {searchParams.get("error")}</p>
        </div>
    )
}
