"use client";
import {SessionProvider} from "next-auth/react";

export function SessionProviderComponent() {
    return (
        <SessionProvider refetchInterval={5 * 60}>
            <div/>
        </SessionProvider>
    )
}