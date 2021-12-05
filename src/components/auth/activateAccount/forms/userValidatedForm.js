import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../../../common/hooks/useUser";
import { SubmitButton } from "../../../common/forms/submitButton";

const initialFormValues = { password: "", password2: "" };

export const UserValidatedForm = ({email, codeTemp, setIsUserValidated}) => {
  const { login } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(email, codeTemp, values.password);
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      if (err.code === "UserNotConfirmedException") {
        setIsUserValidated(false);
      } else {
        setSubmitting(false);
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
