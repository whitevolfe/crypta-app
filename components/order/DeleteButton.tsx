import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Order as IOrder } from '../../types/Order';
import { fetch, getProducts } from "../../utils/dataAccess";
import useGlobalContext from '../../context/GlobalContext/GlobalContext';

interface IProps {
  btnType?: 'icon' | 'text';
  order: IOrder;
}

export default function DeteteOrderDialog({ btnType = 'icon', order }: IProps) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { deleteOrder, setProducts } = useGlobalContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(order["@id"], { method: "DELETE" });
      // deleteOrder(order["@id"]);
      const result = await getProducts();
      setProducts(result);
      handleClose();
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
    }
  };

  const VARIABLES = {
    btn: 'Delete Order',
    title: `Delete Order ${order['@id'] ?? order['id']}`,
    description: `Are you sure you want to delete this Order?`,
  }

  return (
    <div>
      {btnType === 'icon' ? <IconButton onClick={handleClickOpen} color="error" aria-label="DeleteIcon">
        <DeleteIcon />
      </IconButton>
        : <Button variant="outlined" onClick={handleClickOpen}>
          {VARIABLES.btn}
        </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{VARIABLES.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {VARIABLES.description}
          </DialogContentText>
          {error && <DialogContentText color="error">{error}</DialogContentText>}
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDelete} color='error'>
              Agree
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
