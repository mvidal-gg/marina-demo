import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../common/hooks/useUser";

const initialFormValues = { email: "", password: "" };

function Login() {

  const { login } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values.email, values.password)
      setSubmitting(false);
    } catch (err) {
      setErrors({ password: err.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
      {({ isSubmitting, values, isValid }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting || !isValid}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
export default Login;
