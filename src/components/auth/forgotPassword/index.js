import React, { useState } from "react";
import { useUser } from "../../../common/hooks/useUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const initialFormValues = { username: "" };
const initialFormForgotSubmitValues = {
  code: "",
  password: "",
  confirm_password: "",
};

const ForgotSubmitSchema = Yup.object().shape({
  code: Yup.string()
    .min(6)
    .required(),
  password: Yup.string()
    .min(8)
    .required(),
  confirm_password: Yup.string()
    .min(8)
    .required('Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

function ForgotPassword(props) {
  const { sendConfirmationCode, setNewPassword } = useUser();
  const [isConfirmationSend, setIsConfirmationSend] = useState(false);
  const [username, setUsername] = useState(null);
  const history = useHistory();

  const handleForgotPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      setUsername(values.username);
      await sendConfirmationCode(values.username);
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
      setSubmitting(false);
      await setNewPassword(username, values.code, values.password);
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
          {({ isSubmitting, values, isValid }) => (
            <Form>
              <Field type="email" name="username" />
              <ErrorMessage name="email" component="div" />
              <button type="submit" disabled={isSubmitting || !isValid}>
                Aceptar
              </button>
            </Form>
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
          {({ isSubmitting, values, isValid }) => (
            <Form>
              <Field type="text" name="code" />
              <ErrorMessage name="code" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <Field type="password" name="confirm_password" />
              <ErrorMessage name="confirm_password" component="div" />
              <button type="submit" disabled={isSubmitting || !isValid}>
                Aceptar
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default ForgotPassword;
