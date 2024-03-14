"use client";

import { Button } from "@/components/Button";
import React from "react";
import { Text } from "@/components/Text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex basis-1/3 flex-row items-center justify-center text-3xl font-bold">
        <Text level="h1" className="text-red-500">
          Etwas ist schiefgelaufen
        </Text>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <Button className="min-w-48" onClick={reset}>
          Erneut versuchen
        </Button>
      </div>
    </div>
  );
}
