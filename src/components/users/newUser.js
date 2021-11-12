import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../common/hooks/useUser";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const initialFormValues = { email: "", password: "", phone_number: "" };
function NewUser() {
  const { signUp, confirmSignUp } = useUser();


  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      this.showVerification = await signUp(values.email, values.password, values.phone_number, values.email);
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message });
    }
  };

  return (
    <>
      <h3>Introduce email contraseña y teléfono para crear un nuevo usuario</h3>
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
                <ErrorMessage name="phone_number" component="div" />
                <Field
                  as={TextField}
                  type="tel"
                  name="phone_number"
                  onChange={handleChange}
                  value={values.phone_number}
                  fullWidth
                  autoComplete="on"
                  size="small"
                />
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
export default NewUser;
