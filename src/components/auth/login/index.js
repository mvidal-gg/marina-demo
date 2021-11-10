import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../../common/hooks/useUser";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const initialFormValues = { email: "", password: "" };

function Login() {
  const { login } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      await login(values.email, values.password);
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message });
    }
  };

  return (
    <>
      <h3>Introduce tu contraseña para iniciar sesión</h3>
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
            />{" "}
            <ErrorMessage name="password" component="div" />
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Continuar
            </Button>
          </Box>
        )}
      </Formik>
    </>
  );
}
export default Login;
