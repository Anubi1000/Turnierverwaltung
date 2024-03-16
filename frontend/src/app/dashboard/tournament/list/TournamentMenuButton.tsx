"use client";
import { MoreVert } from "@mui/icons-material";
import { Button, Dialog, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import DeleteDialog from "@/app/dashboard/tournament/list/DeleteDialog";

export default function TournamentMenuButton({
  deleteTournament,
}: {
  deleteTournament: () => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    // @ts-ignore
    const action = e.target["id"].replace("action_", "");
    if (action === "delete") {
      setShowDialog(true);
    }
  };

  return (
    <>
      <Button onClick={handleClick} startIcon={<MoreVert />}>
        Mehr
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem id="action_edit" onClick={handleClose}>
          Bearbeiten
        </MenuItem>
        <MenuItem id="action_delete" onClick={handleClose}>
          Löschen
        </MenuItem>
      </Menu>

      <DeleteDialog
        open={showDialog}
        close={() => setShowDialog(false)}
        deleteTournament={deleteTournament}
      />
    </>
  );
}
