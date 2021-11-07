import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../../common/hooks/useUser";
import { Link } from "react-router-dom";

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
        {({ isSubmitting, values, isValid }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting || !isValid}>
              Continuar
            </button>
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </Form>
        )}
      </Formik>
      <p></p>
    </>
  );
}
export default Login;
