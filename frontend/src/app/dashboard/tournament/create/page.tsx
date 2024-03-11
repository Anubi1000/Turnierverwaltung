"use client";
import Link from "next/link";
import React from "react";
import {EditForm} from "@/app/dashboard/tournament/create/EditForm";

export default function Page() {
    return (
        <div>
            <div className="h-screen flex flex-col">
                <div className="w-screen h-min-12 border-b-2 flex flex-row items-center">
                    <Link className="font-bold text-2xl ml-1" href="/dashboard/tournament/list">
                        <h1 className="ont-bold text-2xl ml-1">Neues Turnier</h1>
                    </Link>
                </div>
                <EditForm/>
            </div>
        </div>
    )
}