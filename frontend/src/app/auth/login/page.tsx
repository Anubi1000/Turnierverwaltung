"use client";
import {signIn, SignInOptions} from "next-auth/react";
import React, {FormEvent} from "react";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";

export default function Page() {
    const searchParams = useSearchParams()

    function onFormSubmit(event: FormEvent) {
        event.preventDefault()
        // @ts-ignore
        let options: SignInOptions = {password: event.target[0].value}
        let callbackUrl = searchParams.get("callbackUrl")
        if (callbackUrl != null) {
            options["callbackUrl"] = callbackUrl
        }

        signIn("credentials", options)
    }

    let errorContent: React.ReactNode = <div/>

    if (searchParams.get("error") == "CredentialsSignin") {
        errorContent = <h1 className="font-semibold text-red-500 text-1xl">Ungültige Anmeldedaten</h1>
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="basis-1/3 flex flex-col items-center justify-center">
                <Text level="h1">Anmeldung</Text>
            </div>
            <div className="basis-1/3 flex flex-col items-center justify-center">
                <form className="flex flex-col" onSubmit={onFormSubmit}>
                    <label>
                        <p className="font-semibold">Passwort</p>
                        <input className="border rounded-md border-gray-300 p-1" name="password" type="password"/>
                    </label>
                    <Button classNames="mt-2" type="submit">Anmelden</Button>
                </form>
            </div>
            <div className="basis-1/3 flex flex-col items-center justify-center">
                {errorContent}
            </div>
        </div>
    )
}
