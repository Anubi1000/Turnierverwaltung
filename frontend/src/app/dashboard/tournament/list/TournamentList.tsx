import {TournamentInfo} from "../../../../../../api/types"
import Link from "next/link";
export default async function TournamentList() {
    const response = await fetch(process.env["API_URL"] + "/tournaments")
    const tournaments = await response.json() as TournamentInfo[]

    const elements = tournaments.map((info, index) => {
        if (!info.id || !info.name) {
            throw new Error("id or name not present")
        }

        let classes = "flex flex-row p-3 pt-4 pb-4 rounded-md ml-2 mr-2"
        if (index % 2 == 1) {
            classes += " bg-gray-200"
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