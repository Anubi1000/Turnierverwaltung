import React from "react";
import Link from "next/link";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";

export default function NotFound() {
    return (
        <div className="flex flex-col h-screen">
            <div className="basis-1/3 flex flex-row text-3xl font-bold items-center justify-center">
                <Text level="h1" className="pr-2 border-r-2 border-black">404</Text>
                <Text level="h1" className="pl-2">Seite nicht gefunden</Text>
            </div>
            <div className="basis-1/3 flex flex-col items-center justify-center">
                <Link href="/">
                    <Button className="min-w-48">Start</Button>
                </Link>
            </div>
        </div>
    )
}