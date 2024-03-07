import {GoodLink} from "@/components/GoodLink";
import ButtonRow from "@/app/dashboard/tournament/list/buttonRow";
import Link from "next/link";

function TournamentRow(props: { gray: boolean }) {
    let colorClass = "";
    if (props.gray) {
        colorClass = "bg-gray-200 "
    }
    return (
        <GoodLink classes={colorClass + "flex flex-row p-3 pt-4 pb-4 rounded-md ml-2 mr-2"}>
            <p className="font-semibold text-lg">Turnier 1</p>
        </GoodLink>
    )
}

export default function Page() {
    const elements = []
    for (let i = 0; i < 10; i++) {
        elements.push((
            <TournamentRow key={i} gray={i % 2 == 1}/>
        ))
    }

    return (
        <div>
            <div className="h-screen flex flex-col">
                <div className="w-screen h-min-12 border-b-2 flex flex-row items-center">
                    <Link className="font-bold text-2xl ml-2" href="/">
                        <h1>Turniere</h1>
                    </Link>
                    <ButtonRow/>
                </div>

                <div className="overflow-y-auto">
                    {elements}
                </div>
            </div>
        </div>
    )
}