"use client";
import { signIn, SignInOptions } from "next-auth/react";
import React, { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function Page() {
  const searchParams = useSearchParams();

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    // @ts-ignore
    let options: SignInOptions = { password: event.target[0].value };
    let callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl != null) {
      options["callbackUrl"] = callbackUrl;
    }

    signIn("credentials", options);
  }

  let errorContent: React.ReactNode = <div />;

  if (searchParams.get("error") == "CredentialsSignin") {
    errorContent = <Text level="h1">Ungültige Anmeldedaten</Text>;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <Text level="h1">Anmeldung</Text>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <form className="flex flex-col" onSubmit={onFormSubmit}>
          <label>
            <p className="font-semibold">Passwort</p>
            <input
              className="rounded-md border border-gray-300 p-1"
              name="password"
              type="password"
            />
          </label>
          <Button className="mt-2" type="submit">
            Anmelden
          </Button>
        </form>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        {errorContent}
      </div>
    </div>
  );
}
