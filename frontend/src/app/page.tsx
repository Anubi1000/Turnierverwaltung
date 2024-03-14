import Link from "next/link";
import Text from "@/components/Text";

function HomeLink({ name, link }: { name: string; link: string }) {
  return (
    <Link href={link} className="m-6">
      <button className="min-w-64 rounded-md bg-black p-10 text-white transition-colors hover:bg-gray-800">
        <Text level="h3">{name}</Text>
      </button>
    </Link>
  );
}

export default function Page() {
  return (
    <main>
      <div className="flex h-screen flex-col">
        <div className="flex basis-1/3 items-center justify-center">
          <Text level="h1">Turnierverwaltung</Text>
        </div>
        <div className="flex basis-1/3 items-center justify-center">
          <HomeLink name="Dashboard" link="/dashboard/tournament/list" />
          <HomeLink name="Scoreboard" link="/scoreboard" />
        </div>
      </div>
    </main>
  );
}
