import React, { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch, getProducts } from "../../utils/dataAccess";
import { Product } from "../../types/Product";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import useGlobalContext from "../../context/GlobalContext/GlobalContext";

interface Props {
  product?: Product;
  handleClose?: () => void;
}

export const Form: FunctionComponent<Props> = ({ product, handleClose }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [supportCoins, setSupportCoins] = useState([]);
  const router = useRouter();
  const { addProduct, updateProduct, setProducts } = useGlobalContext();

  useEffect(() => {
    fetch('/supporting_coins').then(res => {
      if (res.status === 404) {
        setError('No supporting coins found');
      }
      const data = res['hydra:member'];
      setSupportCoins(data.map(coin => ({ label: coin.name, value: coin.coinId })));
    }).catch(err => {
      setError(err.message);
    })
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(product["@id"], { method: "DELETE" });
      router.push("/products");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
    }
  };

  const handleAutoCompleteValue = (id) => supportCoins.find(coin => coin.value === id);

  return (
    <div>
      <h1>{product ? `Edit Product ${product["@id"] ?? product['id']}` : `Create Product`}</h1>
      <Formik
        initialValues={product ? { ...product } : new Product()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            const data = await fetch(isCreation ? "/products" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            // if (isCreation)
            //   addProduct(data);
            // else
            //   updateProduct(data);
            const result = await getProducts();
            setProducts(result);

            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });

            handleClose();

          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <div className="form-group">
                <Autocomplete
                  disablePortal
                  options={supportCoins}
                  sx={{ width: 300 }}
                  id="coinId"
                  value={handleAutoCompleteValue(values.coinId)}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setFieldValue('coinId', newValue['value']);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Coin"
                      variant="outlined"
                      margin="normal"
                      id="coinId"
                      name="coinId"
                      fullWidth
                      required
                      error={errors.coinId && touched.coinId}
                      helperText={errors.coinId && touched.coinId && errors.coinId}
                    />
                  )}
                />

                <TextField
                  fullWidth
                  id="_tradingPair"
                  name="tradingPair"
                  label="Trading Pair"
                  value={values.tradingPair ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tradingPair && Boolean(errors.tradingPair)}
                  helperText={touched.tradingPair && errors.tradingPair}
                />
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
      {/* {product && (
        <Button color="error" variant="contained" fullWidth type="submit" onClick={handleDelete}>Delete</Button>
      )} */}
    </div>
  );
};
