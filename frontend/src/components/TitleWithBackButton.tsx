import Link from "next/link";
import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function TitleWithBackButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-center">
      <Link href={href}>
        <IconButton>
          <ArrowBack />
        </IconButton>
      </Link>
      <Typography variant="h5">{title}</Typography>
    </div>
  );
}
