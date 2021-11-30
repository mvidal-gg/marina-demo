import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../../common/hooks/useUser";
import { Link } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";

const initialFormVerifyValues = { email: "", code: "" };
const initialFormValues = { password: "", password2: "" };

function ActivateAccount() {
  const { confirmSignUp, login } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [isUserValidated, setIsUserValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [codeTemp, setCodeTemp] = useState("");

  const handleVerifySubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setEmail(values.email);
      var code = Math.random().toString(36).slice(-8);
      setCodeTemp(code);
      await confirmSignUp(values.email, values.code, code);
      setSubmitting(false);
      enqueueSnackbar("Usuario verificado", {
        variant: "success",
      });
      setIsUserValidated(true);
    } catch (err) {
      setSubmitting(false);
      setErrors({ code: err.message });
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(email, codeTemp, values.password);
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

  if (isUserValidated) {
    return (
      <>
        <h3>
          Cuenta activada correctamente. Establezca un password para terminar la
          activación de la cuenta
        </h3>
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
                type="password"
                name="password"
                label="Introduzca el nuevo password"
                onChange={handleChange}
                value={values.password || ""}
                fullWidth
                autoComplete="on"
                size="small"
              />
              <ErrorMessage name="password" component="div" />
              <Field
                as={TextField}
                type="password"
                name="password2"
                label="Repita de nuevo el password"
                onChange={handleChange}
                value={values.password2 || ""}
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
                Continuar
              </Button>
            </Box>
          )}
        </Formik>
      </>
    );
  } else {
    return (
      <>
        <h3>
          Introduce el correo de la cuenta a activar y tu código de verificación
          que has recibido por correo para iniciar sesión
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
      </>
    );
  }
}
export default ActivateAccount;
