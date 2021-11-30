import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../../common/hooks/useUser";
import { Link } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";

const initialFormValues = { email: "", password: "" };
const initialFormVerifyValues = { code: "" };

function Login() {
  const { login, confirmSignUp } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserValidated, setIsUserValidated] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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

  const handleVerifySubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      await confirmSignUp(email, values.code);
      enqueueSnackbar("Usuario verificado", {
        variant: "success",
      });
      await login(email, password);
    } catch (err) {
      setSubmitting(false);
      setErrors({ code: err.message });
    }
  };

  if (isUserValidated) {
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
              {console.log("isSubmitting:" + isSubmitting)}
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
              <br />
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              <br />
              <Link to="/activate-account">¿Necesitas activar tu cuenta?</Link>
            </Box>
          )}
        </Formik>
      </>
    );
  } else {
    return (
      <>
        <h3>
          Introduce tu código de verificación que has recibido por correo para
          iniciar sesión
        </h3>
        <Formik
          initialValues={initialFormVerifyValues}
          onSubmit={handleVerifySubmit}
        >
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
                Continuar
              </Button>
            </Box>
          )}
        </Formik>
      </>
    );
  }
}
export default Login;
