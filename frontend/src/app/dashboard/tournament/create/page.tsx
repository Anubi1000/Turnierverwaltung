"use client";
import Link from "next/link";
import React from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar>
        <div className="flex items-center">
          <Link href="/dashboard/tournament/list">
            <Button className="h-[40px]">
              <span className="material-symbols-outlined">arrow_back</span>
            </Button>
          </Link>
          <Text level="h2" className="mx-2">
            Turnier erstellen
          </Text>
        </div>
      </Sidebar>
      <div className="h-screen flex-grow"></div>
    </div>
  );
}
