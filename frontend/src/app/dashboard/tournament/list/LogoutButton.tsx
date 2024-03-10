"use client";
import {SmallButton} from "@/components/SmallButton";
import {signOut} from "next-auth/react";

export default function LogoutButton() {
    return <SmallButton classNames="my-1 mr-2" onClick={() => signOut({callbackUrl: "/"})}>Abmelden</SmallButton>
}