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
import AddIcon from "@mui/icons-material/Add";
import { Form } from "./Form";
import { Product as IProduct } from "../../types/Product";

interface IProps {
  type: "create" | "edit";
  btnType?: "icon" | "text";
  product?: IProduct;
}

export default function AddEditProductDialog({
  type,
  btnType = "text",
  product,
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
        btn: "Add Product",
        title: "New Product",
        description: ` To subscribe to this website, please enter your email address here. We
    will send updates occasionally.`,
      }
      : {
        btn: "Edit Product",
        title: `Edit Product ${product["@id"] ?? product["id"]}`,
        description: `To edit this product, please enter your email address here. We
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
          {type === "create" ? (
            <AddIcon sx={{ color: "primary.contrastText" }} />
          ) : (
            <EditIcon sx={{ color: "primary.contrastText" }} />
          )}
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
          <Form product={product} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
