"use client";
import { signIn, SignInOptions } from "next-auth/react";
import React, { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";

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
    errorContent = (
      <Typography variant="h6" color="error">
        Ungültige Anmeldedaten
      </Typography>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <Typography variant="h3">Anmeldung</Typography>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <Box component="form" className="flex flex-col" onSubmit={onFormSubmit}>
          <TextField
            required
            label="Passwort"
            variant="outlined"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "0.5rem" }}
          >
            Anmelden
          </Button>
        </Box>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center">
        {errorContent}
      </div>
    </div>
  );
}
