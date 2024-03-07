import Link from "next/link";
import {LargeButton} from "@/components/LargeButton";

function HomeLink({name, link}: { name: string, link: string }) {
    return <Link href={link} className="m-6">
        <LargeButton>{name}</LargeButton>
    </Link>;
}

export default function Page() {
    return (
        <main>
            <div className="flex flex-col h-screen">
                <div className="basis-1/3 flex justify-center items-center">
                    <h1 className="text-3xl font-bold mb-16">Turnierverwaltung</h1>
                </div>
                <div className="basis-1/3 flex justify-center items-center">
                    <HomeLink name="Dashboard" link="/dashboard/tournament/list"/>
                    <HomeLink name="Scoreboard" link="/scoreboard"/>
                </div>
            </div>
        </main>
    )
}