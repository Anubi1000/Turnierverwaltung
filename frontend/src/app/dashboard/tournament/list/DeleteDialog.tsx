import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function DeleteDialog({
  open,
  close,
  onDelete,
}: {
  open: boolean;
  close: () => void;
  onDelete: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>Turnier löschen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soll das Turnier gelöscht werden?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} autoFocus disabled={isLoading}>
            Nein
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              onDelete().then(() => {
                close();
                setIsLoading(false);
              });

              /*setIsLoading(true);
              fetch(`http://localhost:8080/tournaments/${tournamentId}`, {
                method: "DELETE",
              })
                .then((res) => {
                  close();
                  setIsLoading(false);
                })
                .catch((err) => {
                  setIsLoading(false);
                });*/
            }}
          >
            Ja
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
