import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/ShoppingCart";
import { Form } from "./Form";
import { DailyTip as IDailyTip } from "../../types/DailyTip";

interface IProps {
  type: "create" | "edit";
  btnType?: "icon" | "text";
  dailyTip?: IDailyTip;
}

export default function AddEditOrderDialog({
  type,
  btnType = "text",
  dailyTip,
}: IProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const VARIABLES =
    type === "create"
      ? {
        btn: "Add daily tips",
        title: "New daily tips",
        description: ` To subscribe to this website, please enter your email address here. We
    will send updates occasionally.`,
      }
      : {
        btn: "Edit daily tips",
        title: `Edit daily tips ${dailyTip["@id"] ?? dailyTip["id"]}`,
        description: `To edit this daily tip, please enter your email address here. We
    will send updates occasionally.`,
      };

  return (
    <div>
      {btnType === "icon" ? (
        <IconButton
          onClick={handleClickOpen}
          sx={{ color: "primary.contrastText" }}
          aria-label={type === "create" ? "AddIcon" : "EditIcon"}
        >
          {type === "create" ? <AddIcon /> : <EditIcon />}
        </IconButton>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          {VARIABLES.btn}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{VARIABLES.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{VARIABLES.description}</DialogContentText>
          <Form dailytip={dailyTip} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
