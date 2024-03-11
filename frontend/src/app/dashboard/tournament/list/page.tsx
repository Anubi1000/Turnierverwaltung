import Link from "next/link";
import {TournamentList} from "@/app/dashboard/tournament/list/TournamentList";
import {LogoutButton} from "@/app/dashboard/tournament/list/LogoutButton";
import {Button} from "@/components/Button";

export default function Page() {
    return (
        <div>
            <div className="h-screen flex flex-col">
                <div className="w-screen h-min-12 border-b-2 flex flex-row items-center">
                    <Link className="font-bold text-2xl ml-1" href="/">
                        <h1>Turniere</h1>
                    </Link>
                    <div className="ml-auto">
                        <Link href="/dashboard/tournament/create" className="mr-2">
                            <Button classNames="my-1">Neues Turnier</Button>
                        </Link>
                        <LogoutButton/>
                    </div>
                </div>

                <TournamentList/>
            </div>
        </div>
    )
}