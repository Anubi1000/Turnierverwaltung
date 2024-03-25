"use client";
import Link from "next/link";
import TournamentMenuButton from "@/app/dashboard/tournament/list/TournamentMenuButton";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { useSearchParams } from "next/navigation";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TournamentList() {
  const searchParams = useSearchParams();
  const { data, error, mutate }: SWRResponse<TournamentInfo[], any> = useSWR(
    "http://localhost:8080/tournaments",
    fetcher,
  );
  const [snackbarData, setSnackbarData] = useState<{
    severity: AlertColor;
    title: string;
    message: string;
    visible: boolean;
    autoHideDuration: number | null;
  }>({
    severity: "info",
    title: "",
    message: "",
    visible: false,
    autoHideDuration: null,
  });

  useEffect(() => {
    if (searchParams.get("actionType") === "created") {
      setSnackbarData({
        severity: "success",
        title: "Turnier erstellt",
        message: `Das Turnier "${searchParams.get("name")}" wurde erstellt`,
        autoHideDuration: 6000,
        visible: true,
      });
    }
  }, [data, searchParams]);

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <Alert severity="error">
          <AlertTitle>Laden fehlgeschlagen</AlertTitle>
          Das Laden der Turniere fehlgeschlagen
        </Alert>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex w-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Typography variant="h5">Keine Turniere vorhanden</Typography>
        <Typography variant="body1" color="textSecondary">
          Es wurden bisher keine Turniere erstellt
        </Typography>
      </div>
    );
  }

  /*data.splice(0, data.length);
  for (let i = 0; i < 49; i++) {
    if (i == 10) {
      data.push({
        id: i.toString(),
        name: `Turnier ${i}`.repeat(6),
      });
      continue;
    }
    data.push({
      id: i.toString(),
      name: `Turnier ${i}`,
    });
  }*/

  const elements = data.map((info) => {
    if (!info.id || !info.name) {
      throw Error("id or name not present in entry");
    }

    return (
      <Card key={info.id} className="flex w-72 flex-grow flex-col">
        <Link href={`/dashboard/tournament/${info.id}`} className="h-full">
          <CardActionArea
            style={{
              height: "100%",
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <CardHeader title={info.name} />
          </CardActionArea>
        </Link>
        <CardActions className="mt-auto">
          <TournamentMenuButton
            onDelete={async () => {
              const controller = new AbortController();
              setTimeout(() => controller.abort(), 5000);
              try {
                let res = await fetch(
                  "http://localhost:8080/tournaments/" + info.id,
                  {
                    method: "DELETE",
                    signal: controller.signal,
                  },
                );

                if (res.ok) {
                  setSnackbarData({
                    severity: "success",
                    title: "Turnier gelöscht",
                    message: `Das Turnier "${info.name}" wurde gelöscht`,
                    autoHideDuration: 6000,
                    visible: true,
                  });
                } else {
                  setSnackbarData({
                    severity: "error",
                    title: "Löschen fehlgeschlagen",
                    message: `Das Löschen von Turnier "${info.name}" ist fehlgeschlagen`,
                    autoHideDuration: 6000,
                    visible: true,
                  });
                }

                await mutate();
              } catch (err) {
                setSnackbarData({
                  severity: "error",
                  title: "Löschen fehlgeschlagen",
                  message: `Löschen von Turnier "${info.name}" fehlgeschlagen`,
                  autoHideDuration: 6000,
                  visible: true,
                });
              }
            }}
          />
        </CardActions>
      </Card>
    );
  });

  return (
    <div className="h-screen w-full overflow-y-auto">
      <Snackbar
        open={snackbarData.visible}
        autoHideDuration={snackbarData.autoHideDuration}
        onClose={() => setSnackbarData({ ...snackbarData, visible: false })}
      >
        <Alert
          severity={snackbarData.severity}
          variant="filled"
          onClose={() => setSnackbarData({ ...snackbarData, visible: false })}
        >
          <AlertTitle>{snackbarData.title}</AlertTitle>
          {snackbarData.message}
        </Alert>
      </Snackbar>
      <div className="m-1 flex flex-wrap gap-4">{elements}</div>
    </div>
  );
}
