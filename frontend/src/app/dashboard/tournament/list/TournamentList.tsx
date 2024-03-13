import {TournamentInfo} from "../../../../../../api/types"
import Link from "next/link";
import {Text} from "@/components/Text";
import { unstable_noStore } from "next/cache";

export async function TournamentList() {
    unstable_noStore()
    const response = await fetch(`${process.env["API_URL"]}/tournaments`)
    const data: TournamentInfo[] = await response.json()

    const elements = data.map((info, index) => {
        let classes = "flex flex-row p-3 pt-4 pb-4 rounded-md"
        if (index % 2 == 1) {
            classes += " bg-gray-200"
        }

        if (!info.id || !info.name) {
            throw Error("id or name not present in entry")
        }

        return <Link key={info.id} href={`/dashboard/tournament/${info.id}`} className={classes}>
            <Text level="h3">{info.name}</Text>
        </Link>
    })

    return (
        <div className="overflow-y-auto m-1">
            {elements}
        </div>
    )
}
