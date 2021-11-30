import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useUser } from "../../../../common/hooks/useUser";

const initialFormValues = { code: "" };

export const UserNotValidatedForm = (setIsUserValidated) => {
  const { login, confirmSignUp } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await confirmSignUp(email, values.code);
      setSubmitting(false);
      enqueueSnackbar("Usuario verificado", {
        variant: "success",
      });
      await login(email, password);
    } catch (err) {
      setSubmitting(false);
      setErrors({ code: err.message });
    }
  };

  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
      {({ handleChange, values, isSubmitting, isValid }) => (
        <Box
          component={Form}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100" },
          }}
          autoComplete="off"
        >
          <Field
            as={TextField}
            type="string"
            name="code"
            onChange={handleChange}
            value={values.code || ""}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="code" component="div" />
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            Continuar
          </Button>
        </Box>
      )}
    </Formik>
  );
};
