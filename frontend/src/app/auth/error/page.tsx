"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Es ist ein Fehler beim Anmelden aufgetreten
      </h2>
      <p className="text-xl font-semibold text-red-500">
        {" "}
        {searchParams.get("error")}
      </p>
    </div>
  );
}
