"use client"
import {TournamentInfo} from "../../../../../../api/types"
import Link from "next/link";
import useSWR, {SWRResponse} from "swr";
import {LoadingText} from "@/components/LoadingText";
import {ErrorText} from "@/components/ErrorText";


// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())


export function TournamentList() {
    const {
        data,
        error,
        isLoading
    }: SWRResponse<TournamentInfo[], any> = useSWR("http://localhost:8080/tournaments", fetcher)
    if (isLoading) {
        return <LoadingText/>
    }
    if (error || !data) {
        return <ErrorText/>
    }

    const elements = data.map((info, index) => {
        let classes = "flex flex-row p-3 pt-4 pb-4 rounded-md mx-1"
        if (index % 2 == 1) {
            classes += " bg-gray-200"
        }

        if (!info.id || !info.name) {
            return (
                <div key={index} className={classes}>
                    <ErrorText fillScreen={false}/>
                </div>
            )
        }

        return <Link key={info.id} href={`/dashboard/tournament/${info.id}`} className={classes}>
            <p className="font-semibold text-lg">{info.name}</p>
        </Link>
    })

    return (
        <div className="overflow-y-auto">
            {elements}
        </div>
    )
}