import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex basis-1/3 flex-row items-center justify-center text-3xl font-bold">
        <Text level="h1" className="border-r-2 border-black pr-2">
          404
        </Text>
        <Text level="h1" className="pl-2">
          Seite nicht gefunden
        </Text>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <Link href="/">
          <Button className="min-w-48">Start</Button>
        </Link>
      </div>
    </div>
  );
}
