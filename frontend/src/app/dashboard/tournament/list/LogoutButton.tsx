"use client";
import {signOut} from "next-auth/react";
import {Button} from "@/components/Button";

export function LogoutButton() {
    return <Button style="outlined" className="mt-auto" onClick={() => signOut({callbackUrl: "/"})}>Abmelden</Button>
}