import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SubmitButton } from "../../../common/forms/submitButton";
import { useDispatch } from "react-redux";
import { setNewPassword } from "../../../../common/features/auth/authSlice";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const initialFormValues = {
  code: "",
  password: "",
  confirm_password: "",
};

const schema = Yup.object().shape({
  code: Yup.string().min(6).required(),
  password: Yup.string().min(8).required(),
  confirm_password: Yup.string()
    .min(8)
    .required("La contraseña no puede estar vacía")
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

export const ForgotPasswordSubmitForm = ({ username }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { code, password } = values;
      await dispatch(
        setNewPassword({ email: username, code, new_password: password })
      );
      setSubmitting(false);
      history.push("/login");
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message });
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
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
            label="Código de activación"
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
            label="Contraseña"
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
            label="Confirma contraseña"
            onChange={handleChange}
            value={values.confirm_password}
            fullWidth
            size="small"
          />
          <ErrorMessage name="confirm_password" component="div" />
          <SubmitButton
            text="Aceptar"
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Box>
      )}
    </Formik>
  );
};
