import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SubmitButton } from "../../../common/forms/submitButton";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { confirmSignUp } from "../../../../common/features/auth/authSlice";

const initialFormValues = { email: "", code: "" };

export const UserNotValidatedForm = ({
  setIsUserValidated,
  setEmail,
  setCodeTemp,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const email_value = values.email;
      const code_value = values.code;
      setEmail(email_value);
      let code = Math.random().toString(36).slice(-8);
      setCodeTemp(code);
      await dispatch(
        confirmSignUp({
          username: email_value,
          code: code_value,
          codeTemp: code,
        })
      ).unwrap();
      setSubmitting(false);
      enqueueSnackbar("Usuario verificado. Introduce una nueva contraseña", {
        variant: "success",
      });
      setIsUserValidated(true);
    } catch (err) {
      setSubmitting(false);
      setErrors({ code: err.message });
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
            type="string"
            name="code"
            onChange={handleChange}
            value={values.code || ""}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="code" component="div" />
          <SubmitButton
            text="Continuar"
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </Box>
      )}
    </Formik>
  );
};
