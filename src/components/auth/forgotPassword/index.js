import React, { useState } from "react";
import { useUser } from "../../../common/hooks/useUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Button, CircularProgress, TextField } from "@mui/material";

const initialFormValues = { username: "" };
const initialFormForgotSubmitValues = {
  code: "",
  password: "",
  confirm_password: "",
};

const ForgotSubmitSchema = Yup.object().shape({
  code: Yup.string().min(6).required(),
  password: Yup.string().min(8).required(),
  confirm_password: Yup.string()
    .min(8)
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function ForgotPassword(props) {
  const { sendConfirmationCode, setNewPassword } = useUser();
  const [isConfirmationSend, setIsConfirmationSend] = useState(false);
  const [username, setUsername] = useState(null);
  const history = useHistory();

  const handleForgotPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      setUsername(values.username);
      await sendConfirmationCode(values.username);
      setSubmitting(false);
      setIsConfirmationSend(true);
    } catch (err) {
      setSubmitting(false);
      setErrors({ username: err.message });
    }
  };

  const handleForgotPasswordSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    try {
      await setNewPassword(username, values.code, values.password);
      setSubmitting(false);
      history.push("/login");
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message });
    }
  };

  if (!isConfirmationSend) {
    return (
      <div>
        <h3>Confirma tu correo electrónico</h3>
        <p>
          Enviaremos un email a tu dirección de correo electrónico para que
          puedas recuperar tu contraseña. Si no recibes el correo, consulta tu
          carpeta de spam
        </p>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleForgotPassword}
        >
          {({ handleChange, isSubmitting, values, isValid }) => (
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
                name="username"
                onChange={handleChange}
                value={values.username}
                fullWidth
                autoComplete="on"
                size="small"
              />
              <ErrorMessage name="username" component="div" />
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
                Aceptar
              </Button>
            </Box>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <>
        <h3>Introduce tu nueva contraseña</h3>
        <Formik
          initialValues={initialFormForgotSubmitValues}
          onSubmit={handleForgotPasswordSubmit}
          validationSchema={ForgotSubmitSchema}
        >
          {({ handleChange, isSubmitting, values, isValid }) => (
            <Box
              component={Form}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100" },
              }}
              autoComplete="off"
            >
              <Field
                as={TextField}
                type="text"
                name="code"
                onChange={handleChange}
                value={values.code}
                fullWidth
                size="small"
              />
              <ErrorMessage name="code" component="div" />
              <Field
                as={TextField}
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                fullWidth
                size="small"
              />
              <ErrorMessage name="password" component="div" />
              <Field
                as={TextField}
                type="password"
                name="confirm_password"
                onChange={handleChange}
                value={values.confirm_password}
                fullWidth
                size="small"
              />
              <ErrorMessage name="confirm_password" component="div" />
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
                Aceptar
              </Button>
            </Box>
          )}
        </Formik>
      </>
    );
  }
}

export default ForgotPassword;
