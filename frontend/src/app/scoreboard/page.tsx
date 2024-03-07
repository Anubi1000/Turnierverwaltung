import Clock from "@/app/scoreboard/clock";
import {ScoreboardTable} from "@/app/scoreboard/scoreboardTable";

export default function Page() {
    return (
        <div className="h-screen w-screen flex flex-col">
            <ScoreboardTable/>
            <div className="border-t-2 border-black flex flex-row p-1">
                <p className="text-4xl font-semibold">Test Turnier</p>
                <Clock/>
            </div>
        </div>
    )
}