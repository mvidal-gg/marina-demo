import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../../../common/hooks/useUser";
import { SubmitButton } from "../../../common/forms/submitButton";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const initialFormValues = { email: "", password: "" };

export const LoginForm = () => {
  const { login } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password } = values;
      await login(email, password);
      setSubmitting(false);
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        enqueueSnackbar("El usuario está pendiente de activación", {
          variant: "error",
        });
        history.push("/activate-account");
      } else {
        console.log(err);
        setErrors({ password: err.message });
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
