import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/router";

interface IProps {
  title?: string;
}

export default function InfoIcon({ title = "To create tip click this button" }: IProps) {
  const router = useRouter();
  return (
    <Tooltip title={title}>
      <Button onClick={() => router.push('/dailytips')}>
        <InfoOutlinedIcon sx={{ color: "text.secondary" }} />
      </Button>
    </Tooltip>
  );
}
