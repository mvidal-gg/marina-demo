import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../common/hooks/useUser";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  email: "",
  password: "",
  phone_number: "",
  point_of_sale: "",
};

export default function NewUser() {
  const { signUp, user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [pointOfSale, setPointOfSale] = useState("");
  const [pointsOfSale, setPointsOfSale] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let isSubscribed = true;
    try {
      await fetch(
        "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/point-of-sale?scope=internal",
        {
          method: "GET",
          headers: {
            Authorization: user.signInUserSession.accessToken.jwtToken,
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          setPointsOfSale((pointsOfSale) => [
            ...pointsOfSale,
            ...data["pointsOfSale"],
          ])
        );
    } catch (err) {
      console.log(err);
    }
    return () => (isSubscribed = false);
  }

  const handleSelectChange = (event) => {
    setPointOfSale(event.target.value);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      await signUp(
        values.email,
        values.password,
        values.phone_number,
        values.email,
        pointOfSale
      );
      enqueueSnackbar("Usuario creado correctamente", {
        variant: "success",
      });
      history.push("/users");
    } catch (err) {
      setSubmitting(false);
      setErrors({ password: err.message });
    }
  };

  return (
    <>
      <h3>Introduce email contraseña y teléfono para crear un nuevo usuario</h3>
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
              label="email"
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
              label="password"
              onChange={handleChange}
              value={values.password}
              fullWidth
              autoComplete="on"
              size="small"
            />{" "}
            <ErrorMessage name="phone_number" component="div" />
            <Field
              as={TextField}
              type="tel"
              name="phone_number"
              label="teléfono"
              onChange={handleChange}
              value={values.phone_number}
              fullWidth
              autoComplete="on"
              size="small"
            />
            <Field
              as={Select}
              label="Punto de venta"
              labelId="point-of-sale"
              id="point-of-sale"
              value={pointOfSale}
              fullWidth
              onChange={handleSelectChange}
              size="small"
            >
              {pointsOfSale.map((element, index) => (
                <MenuItem key={element.id} value={element.id}>
                  {element.label}
                </MenuItem>
              ))}
            </Field>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Continuar
            </Button>
          </Box>
        )}
      </Formik>
    </>
  );
}
