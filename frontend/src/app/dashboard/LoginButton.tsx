"use client";
import {signIn} from "next-auth/react";
import React from "react";
import {MediumButton} from "@/components/MediumButton";

export function LoginButton() {
    return <MediumButton onClick={() => signIn()}>Anmelden</MediumButton>;
}