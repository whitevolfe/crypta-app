import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch, getProducts } from "../../utils/dataAccess";
import { Order } from "../../types/Order";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import useGlobalContext from "../../context/GlobalContext/GlobalContext";

interface Props {
  order?: Order;
  type?: "create" | "edit";
  handleClose?: () => void;
}

export const Form: FunctionComponent<Props> = ({ order, type = "create", handleClose }) => {
  const { updateOrder, addOrder, setProducts } = useGlobalContext();
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;


    fetch(order["@id"], { method: "DELETE" }).then(() => {

    }).catch(err => {
      setError(`Error when deleting the resource: ${error}`);
    });

  };

  const types = [
    {
      value: "buy",
      label: "Buy",
    },
    {
      value: "sell",
      label: "Sell",
    },
  ]

  return (
    <div>
      <Formik
        initialValues={order ? { ...order } : new Order()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          fetch(isCreation ? "/orders" : values["@id"], {
            method: isCreation ? "POST" : "PUT",
            body: JSON.stringify(values),
          }).then((result) => {
            getProducts().then((res) => {
              setProducts(res);
            });
            // if (isCreation) {
            //   updateOrder(result);
            // } else {
            //   addOrder(result);
            // }
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            handleClose();
          }).catch(err => {
            setStatus({
              isValid: false,
              msg: `${err.defaultErrorMsg}`,
            });
            setErrors(err.fields);
          }).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_amountBought"
                  name="amountBought"
                  label="Amount"
                  type="number"
                  value={values.amountBought ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amountBought && Boolean(errors.amountBought)}
                  helperText={touched.amountBought && errors.amountBought}
                />
              </div>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_buyingPrice"
                  name="buyingPrice"
                  label="Buying Price"
                  type="number"
                  value={values.buyingPrice ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.buyingPrice && Boolean(errors.buyingPrice)}
                  helperText={touched.buyingPrice && errors.buyingPrice}
                />
              </div>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_fee"
                  name="fee"
                  label="Fee"
                  type="number"
                  value={values.fee ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fee && Boolean(errors.fee)}
                  helperText={touched.fee && errors.fee}
                />
              </div>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_exchange"
                  name="exchange"
                  label="Exchange"
                  value={values.exchange ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.exchange && Boolean(errors.exchange)}
                  helperText={touched.exchange && errors.exchange}
                />
              </div>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="outlined-select-type"
                  select
                  label="Select"
                  value={values.type ?? "buy"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.type && Boolean(errors.type)}
                  helperText={touched.type && errors.type}
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {status && status.msg && (
                <Alert severity={`${status.isValid ? "success" : "error"
                  }`}>{status.msg}</Alert>
              )}
              <Button color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting}>Submit</Button>
            </Stack>
          </form>
        )}
      </Formik>

      {/* {order && (
        <Button color="error" variant="contained" fullWidth type="submit" onClick={handleDelete}>
          Delete
        </Button>
      )} */}
    </div >
  );
};
