"use client";
import {GoodLink} from "@/components/GoodLink";
import {SmallButton} from "@/components/SmallButton";
import {signOut} from "next-auth/react";

export default function ButtonRow() {
    return <div className="ml-auto">
        <GoodLink classes="mr-2">
            <SmallButton classNames="my-1">Neues Turnier</SmallButton>
        </GoodLink>
        <SmallButton classNames="my-1 mr-2" onClick={() => signOut({callbackUrl: "/"})}>Abmelden</SmallButton>
    </div>
}