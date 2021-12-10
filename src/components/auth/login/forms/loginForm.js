import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SubmitButton } from "../../../common/forms/submitButton";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { login } from "../../../../common/features/auth/authSlice";
import { useDispatch } from "react-redux";

const initialFormValues = { email: "", password: "" };

export const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password } = values;
      await dispatch(login({ email, password })).unwrap();
      setSubmitting(false);
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        enqueueSnackbar("El usuario está pendiente de activación", {
          variant: "error",
        });
        history.push("/activate-account");
      } else  if (err.code === "NotAuthorizedException"){
        setErrors({ password: "Usuario y/o contraseña incorrectos" });
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
            label="Email"
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
            label="Contraseña"
            onChange={handleChange}
            value={values.password}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="password" component="div" />
          <SubmitButton
            text="Iniciar sesión"
            isSubmitting={isSubmitting}
            isValid={isValid}
          ></SubmitButton>
        </Box>
      )}
    </Formik>
  );
};
