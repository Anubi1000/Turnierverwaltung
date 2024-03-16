"use client";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";

export default function TournamentMenuButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    // @ts-ignore
    const action = e.target["id"].replace("action_", "");
    console.log(action);
  };

  return (
    <>
      <div className="mr-2">
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </div>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem id="action_edit" onClick={handleClose}>
          Bearbeiten
        </MenuItem>
        <MenuItem id="action_delete" onClick={handleClose}>
          Löschen
        </MenuItem>
      </Menu>
    </>
  );
}
