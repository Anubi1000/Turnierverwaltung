import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteDialog({
  open,
  close,
  deleteTournament,
}: {
  open: boolean;
  close: () => void;
  deleteTournament: () => void;
}) {
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
          <Button onClick={close} autoFocus>
            Nein
          </Button>
          <Button
            onClick={() => {
              close();
              deleteTournament();
            }}
          >
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
