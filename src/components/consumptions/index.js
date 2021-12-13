import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsumptions,
  selectAllConsumptions,
} from "../../common/features/consumptions/consumptionsSlice";
import { Field, Form, Formik } from "formik";
import { Box } from "@mui/system";
import withRole from "../../common/roles/withRole";
import { Role } from "../../common/roles/role";

export default function Consumptions() {
  const [selection, setSelection] = useState([]);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userToken = user.signInUserSession.idToken.jwtToken;

  const consumptions = useSelector(selectAllConsumptions);
  const consumptionsStatus = useSelector((state) => state.consumptions.status);
  const error = useSelector((state) => state.consumptions.error);

  const columns = [
    { title: "id", field: "id" },
    { title: "idPublication", field: "idPublication" },
    { title: "idPointSale", field: "idPointSale" },
    { title: "copies", field: "copies" },
    { title: "date", field: "date" },
    { title: "origen", field: "origen" },
    { title: "create_user", field: "create_user" },
    { title: "update_user", field: "update_user" },
    { title: "created", field: "created" },
    { title: "update", field: "update" },
  ];

  const handleSelection = (newSelection) => {
    setSelection(newSelection);
  };

  const handleUnsubscribe = () => {
    alert("Aquí daríamos de baja a las filas: " + selection);
  };

  const handleSelectPointOfSale = (evt) => {
    alert("aquí filtramos por punto de venta => " + evt.target.value);
  };

  useEffect(() => {
    if (consumptionsStatus === "idle") {
      dispatch(fetchConsumptions(userToken));
    }
  }, [consumptionsStatus, userToken, dispatch]);

  let Filter = () => {
    return (
      <Box mb={5}>
        <Formik>
          {({ handleChange, setFieldValue, isSubmitting, values, isValid }) => (
            <Box
              component={Form}
              autoComplete="off"
            >
              <InputLabel id="point-of-sale">Punto de venta</InputLabel>
              <Field
                as={Select}
                labelId="point-of-sale-label"
                id="role"
                label="Punto de venta"
                value=""
                onChange={handleSelectPointOfSale}
                size="small"
              >
                <MenuItem key="p1" value="punto venta 1">
                  Punto venta 1
                </MenuItem>
                <MenuItem key="p2" value="punto venta 2">
                  Punto venta 2
                </MenuItem>
              </Field>
            </Box>
          )}
        </Formik>
      </Box>
    );
  };

  const RestrictedFilter = withRole([Role.Marina])(Filter);

  let content;
  if (consumptionsStatus === "loading") {
    content = <CircularProgress size={24} />;
  } else if (consumptionsStatus === "succeeded") {
    content = (
      <>
        <DataGrid
          rows={consumptions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={handleSelection}
        />
      </>
    );
  } else if (consumptionsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <>
      <h3> Consumos del día</h3>
      <RestrictedFilter />
      <div
        style={{
          height: 400,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </div>

      <Button component={Link} to="/consumptions/new" variant="contained">
        Nuevo consumo
      </Button>
      {selection && selection.length > 0 && (
        <Button onClick={handleUnsubscribe} variant="outlined">
          Dar de baja
        </Button>
      )}
    </>
  );
}
