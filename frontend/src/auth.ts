import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Test",
            credentials: {
                password: {label: "Passwort", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }

                const result = await fetch(`${process.env["API_URL"]}/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({password: credentials.password})
                })

                if (!result.ok) {
                    return null
                }

                const resultJson = await result.json()
                if (resultJson["valid"] == true) {
                    return {id: "admin"}
                }

                return null
            }
        })
    ],
    session: {
        maxAge: 60 * 60 // 1h
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    secret: process.env["NEXTAUTH_SECRET"]
} satisfies NextAuthOptions