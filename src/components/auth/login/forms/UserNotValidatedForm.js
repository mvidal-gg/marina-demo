import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useUser } from "../../../../common/hooks/useUser";
import { SubmitButton } from "../../../common/forms/submitButton";

const initialFormValues = { code: "" };

export const UserNotValidatedForm = (setIsUserValidated) => {
  const { login, confirmSignUp } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password, code } = values;
      await confirmSignUp(email, code);
      setSubmitting(false);
      setIsUserValidated(true);
      enqueueSnackbar("Usuario verificado", {
        variant: "success",
      });
      await login(email, password);
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
          ></SubmitButton>
        </Box>
      )}
    </Formik>
  );
};
