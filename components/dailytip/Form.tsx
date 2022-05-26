import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { DailyTip } from "../../types/DailyTip";
import { Button, Stack, TextField } from "@mui/material";

interface Props {
  dailytip?: DailyTip;
}

export const Form: FunctionComponent<Props> = ({ dailytip }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(dailytip["@id"], { method: "DELETE" });
      router.push("/dailytips");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {dailytip ? `Edit DailyTip ${dailytip["@id"]}` : `Create DailyTip`}
      </h1>
      <Formik
        initialValues={dailytip ? { ...dailytip } : new DailyTip()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/daily_tips" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/daily_tips");
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
        }) => (
          <form onSubmit={handleSubmit}>
            {status && status.msg && (
              <div
                className={`alert ${status.isValid ? "alert-success" : "alert-danger"
                  }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <Stack spacing={2}>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_product"
                  name="product"
                  label="Product"
                  value={values.product ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product && Boolean(errors.product)}
                  helperText={touched.product && errors.product}
                />
              </div>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="_content"
                  name="content"
                  label="Content"
                  value={values.content ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
              </div>
              <Button color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting}>Submit</Button>
            </Stack>
          </form>
        )}
      </Formik>
      {/* <Link href="/daily_tips">
        <a className="btn btn-primary">Back to list</a>
      </Link> */}
      {/* {dailytip && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )} */}
    </div>
  );
};
