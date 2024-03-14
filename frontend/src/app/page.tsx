import Link from "next/link";
import { Text } from "@/components/Text";

function HomeLink({ name, link }: { name: string; link: string }) {
  return (
    <Link href={link} className="m-6">
      <button className="bg-black text-white rounded-md transition-colors hover:bg-gray-800 p-10 min-w-64">
        <Text level="h3">{name}</Text>
      </button>
    </Link>
  );
}

export default function Page() {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="basis-1/3 flex justify-center items-center">
          <Text level="h1">Turnierverwaltung</Text>
        </div>
        <div className="basis-1/3 flex justify-center items-center">
          <HomeLink name="Dashboard" link="/dashboard/tournament/list" />
          <HomeLink name="Scoreboard" link="/scoreboard" />
        </div>
      </div>
    </main>
  );
}
