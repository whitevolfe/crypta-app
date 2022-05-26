import { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";

interface Props {
  label: string;
  value: any;
  text?: any;
}

export const OrderRowBox: FunctionComponent<Props> = ({
  label,
  value,
  text,
}) => {
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
            : "primary.contrastText",
          fontSize: 25,
          fontWeight: "medium",
        }}
      >
        {value}
      </Box>
      {text && (
        <Box
          sx={{
            color: text.startsWith("-") ? "error.dark" : "success.dark",
            display: "inline",
            fontWeight: "bold",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
};
