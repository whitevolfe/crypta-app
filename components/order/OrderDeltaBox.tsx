import { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";

interface Props {
  label: string;
  value: any;
}

export const OrderDeltaBox: FunctionComponent<Props> = ({ label, value }) => {
  return (
    <Box
      sx={{
        p: 2,
        minWidth: 200,
      }}
    >
      <Box sx={{ color: "text.secondary" }}>{label}</Box>
      <Box
        sx={{
          color: value.toString().startsWith("-")
            ? "error.dark"
            : "success.dark",
          fontSize: 25,
          fontWeight: "medium",
        }}
      >
        {value}
      </Box>
    </Box>
  );
};
