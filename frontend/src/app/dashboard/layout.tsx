import React from "react";
import {getServerSession} from "next-auth";
import {SessionProviderComponent} from "@/app/dashboard/sessionProvider";
import {LoginButton} from "@/app/dashboard/loginButton";
import {authOptions} from "@/auth";

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (session) {
        return (
            <div>
                <SessionProviderComponent/>
                {children}
            </div>
        )
    } else {
        return (
            <div className="flex flex-col h-screen">
                <div className="basis-1/3 flex flex-col items-center justify-center">
                    <h1 className="font-bold text-3xl">Nicht angemeldet</h1>
                </div>
                <div className="basis-1/3 flex flex-col items-center justify-center">
                    <LoginButton/>
                </div>
            </div>
        )
    }
}