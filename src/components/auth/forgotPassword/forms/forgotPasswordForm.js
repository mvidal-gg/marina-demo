import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SubmitButton } from "../../../../components/common/forms/submitButton";
import { useDispatch } from "react-redux";
import { sendConfirmationCode } from "../../../../common/features/auth/authSlice";

const initialFormValues = { username: "" };

export const ForgotPasswordForm = ({ setUsername, setIsConfirmationSend }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setUsername(values.username);
      const username = values.username;
      await dispatch(sendConfirmationCode({ email: username }));
      setSubmitting(false);
      setIsConfirmationSend(true);
    } catch (err) {
      setSubmitting(false);
      setErrors({ username: err.message });
    }
  };

  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
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
            label="Email"
            onChange={handleChange}
            value={values.username}
            fullWidth
            autoComplete="on"
            size="small"
          />
          <ErrorMessage name="username" component="div" />
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
