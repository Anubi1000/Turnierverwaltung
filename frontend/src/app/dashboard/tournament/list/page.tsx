import Link from "next/link";
import {TournamentList} from "@/app/dashboard/tournament/list/TournamentList";
import {LogoutButton} from "@/app/dashboard/tournament/list/LogoutButton";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";

export default function Page() {
    return (
        <div className="flex">
            <div className="basis-[10%] bg-gray-50 h-screen border-r flex flex-col p-1">
                <div className="flex items-center">
                    <Link href="/">
                        <Button className="h-[40px]">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Button>
                    </Link>
                    <Text level="h2" className="ml-2">Turniere</Text>
                </div>
                <Link href="/dashboard/tournament/create" className="mt-1">
                    <Button className="w-full">
                        <div className="flex justify-center">
                            <span className="material-symbols-outlined mr-1">add</span>
                            Neues Turnier
                        </div>
                    </Button>
                </Link>

                <LogoutButton/>
            </div>
            <div className="basis-[90%] h-screen">
                <TournamentList/>
            </div>
        </div>
    )
}