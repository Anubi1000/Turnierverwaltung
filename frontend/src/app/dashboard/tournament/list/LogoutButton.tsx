"use client";
import {signOut} from "next-auth/react";
import {Button} from "@/components/Button";

export function LogoutButton() {
    return <Button classNames="my-1 mr-2" onClick={() => signOut({callbackUrl: "/"})}>Abmelden</Button>
}