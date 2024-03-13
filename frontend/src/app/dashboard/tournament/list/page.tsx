import Link from "next/link";
import {TournamentList} from "@/app/dashboard/tournament/list/TournamentList";
import {LogoutButton} from "@/app/dashboard/tournament/list/LogoutButton";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    return (
        <div className="flex">
            <div className="basis-[10%] bg-gray-50 h-screen border-r flex flex-col p-1">
                <div className="flex items-center">
                    <Link href="/">
                        <Button>
                            <FontAwesomeIcon icon={faArrowLeft} className="w-5 aspect-square"/>
                        </Button>
                    </Link>
                    <Text level="h2" className="ml-2">Turniere</Text>
                </div>
                <Link href="/dashboard/tournament/create" className="mt-1">
                    <Button className="w-full">Neues Turnier</Button>
                </Link>

                <LogoutButton/>
            </div>
            <div className="basis-[90%] h-screen">
                <TournamentList/>
            </div>
        </div>
    )
}