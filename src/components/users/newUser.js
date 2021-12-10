import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SubmitButton } from "../common/forms/submitButton";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../common/features/auth/authSlice";
import {
  fetchPointsOfSale,
  selectAllPointsOfSale,
} from "../../common/features/pointsOfSale/pointsOfSaleSlice";

const initialFormValues = {
  role: "",
  email: "",
  password: "",
  phone_number: "",
  point_of_sale: "",
};

export default function NewUser() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [pointOfSale, setPointOfSale] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userToken = user.signInUserSession.idToken.jwtToken;

  const pointsOfSale = useSelector(selectAllPointsOfSale);
  const pointsOfSaleStatus = useSelector((state) => state.pointsOfSale.status);
  const error = useSelector((state) => state.pointsOfSale.error);

  useEffect(() => {
    if (pointsOfSaleStatus === "idle") {
      dispatch(fetchPointsOfSale(userToken));
    }
  }, [pointsOfSaleStatus, userToken, dispatch]);

  const handleSelectChange = (event) => {
    setPointOfSale(event.target.value);
  };

  const handleSelectChangeRole = (event) => {
    setRole(event.target.value);
  };

  //TODO: Revisar cuando peta la creación de usuario que parece que no haya petado...
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      var password = Math.random().toString(36).slice(-8);
      const { email, phone_number } = values;
      dispatch(
        signUp({
          username: email,
          password,
          phone_number,
          email,
          pointOfSale,
          role,
        })
      );
      setSubmitting(false);
      enqueueSnackbar("Usuario creado correctamente", {
        variant: "success",
      });
      /*history.push("/users");*/
    } catch (err) {
      setSubmitting(false);
      setErrors({ phone_number: err.message });
      enqueueSnackbar(err.message, {
        variant: "error",
      });
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
              type="tel"
              name="phone_number"
              label="teléfono"
              onChange={handleChange}
              value={values.phone_number}
              fullWidth
              autoComplete="on"
              size="small"
            />
            <ErrorMessage name="phone_number" component="div" />

            <SubmitButton
              text="Crear usuario"
              isValid={isValid}
              isSubmitting={isSubmitting}
            />
          </Box>
        )}
      </Formik>
    </>
  );
}
