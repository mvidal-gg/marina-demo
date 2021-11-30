import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useUser } from "../../../../common/hooks/useUser";

const initialFormValues = { email: "", password: "" };

export const UserValidatedForm = (setIsUserValidated) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setEmail(values.email);
      setPassword(values.password);
      await login(values.email, values.password);
      setSubmitting(false);
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        setIsUserValidated(false);
      } else {
        setSubmitting(false);
        setErrors({ password: err.message });
      }
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
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="email" component="div" />
          <Field
            as={TextField}
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="password" component="div" />
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
            Iniciar sesión
          </Button>
        </Box>
      )}
    </Formik>
  );
};
