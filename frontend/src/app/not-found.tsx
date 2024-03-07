import React from "react";
import {MediumButton} from "@/components/MediumButton";
import Link from "next/link";

export default function NotFound() {
    return (
        <main>
            <div className="flex flex-col h-screen">
                <div className="basis-1/3 flex flex-row text-3xl font-bold items-center justify-center">
                    <h1 className="pr-2 border-r-2 border-black">404</h1>
                    <h1 className="pl-2">Seite nicht gefunden</h1>
                </div>
                <div className="basis-1/3 flex flex-col items-center justify-center">
                    <Link href="/">
                        <MediumButton>Start</MediumButton>
                    </Link>
                </div>
            </div>
        </main>
    )
}