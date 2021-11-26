import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../common/hooks/useUser";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  role: "",
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
  const [role, setRole] = useState("");
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

  const handleSelectChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(false);
      var password = Math.random().toString(36).slice(-8);
      await signUp(
        values.email,
        password,
        values.phone_number,
        values.email,
        pointOfSale,
        role
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
      <h3>
        Introduce tipo de usuario, email y teléfono para crear un nuevo usuario
      </h3>
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        {({ handleChange, values, isSubmitting, isValid }) => (
          <Box
            component={Form}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100" },
            }}
            autoComplete="off"
          >
            <InputLabel id="role-label">Tipo de usuario</InputLabel>
            <Field
              as={Select}
              labelId="role-label"
              id="role"
              label="Tipo de usuario"
              value={role}
              fullWidth
              onChange={handleSelectChangeRole}
              size="small"
            >
              <MenuItem key="kiosko" value="kiosko">
                Kiosko
              </MenuItem>
              <MenuItem key="marina" value="marina">
                Marina
              </MenuItem>
            </Field>
            <ErrorMessage name="email" component="div" />
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
            {role === "kiosko" && (
              <>
                <InputLabel id="point-of-sale-label">Punto de venta</InputLabel>
                <Field
                  as={Select}
                  labelId="point-of-sale-label"
                  id="point-of-sale"
                  value={pointOfSale}
                  label="Punto de venta"
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
              </>
            )}
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
