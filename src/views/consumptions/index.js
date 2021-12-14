import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsumptions,
  selectAllConsumptions,
} from "../../common/features/consumptions/consumptionsSlice";
import {
  fetchPointsOfSale,
  selectAllPointsOfSale,
} from "../../common/features/pointsOfSale/pointsOfSaleSlice";
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

  const pointsOfSale = useSelector(selectAllPointsOfSale);
  const pointsOfSaleStatus = useSelector((state) => state.pointsOfSale.status);

  const [pointOfSale, setPointOfSale] = useState("");

  useEffect(() => {
    if (pointsOfSaleStatus === "idle") {
      dispatch(fetchPointsOfSale(userToken));
    }
  }, [pointsOfSaleStatus, userToken, dispatch]);

  useEffect(() => {
    if (consumptionsStatus === "idle") {
      dispatch(fetchConsumptions(userToken));
    }
  }, [consumptionsStatus, userToken, dispatch]);

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

  const handleDataSelection = (newSelection) => {
    setSelection(newSelection);
  };

  const handleUnsubscribe = () => {
    alert("Aquí daríamos de baja a las filas: " + selection);
  };

  const handleSelectPointOfSale = (evt) => {
    setPointOfSale(evt.target.value);
    alert("aquí filtramos por punto de venta => " + evt.target.value);
  };

  let Filter = () => {
    return (
      <Box mb={5} >
        <Formik>
          {() => (
            <Box component={Form} autoComplete="off">
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="point-of-sale-label">Punto de venta</InputLabel>
                <Field
                  as={Select}
                  labelId="point-of-sale-label"
                  id="point-of-sale"
                  label="Punto de venta"
                  value={pointOfSale}
                  onChange={handleSelectPointOfSale}
                  size="small"
                >
                  {pointsOfSale.map((element) => (
                    <MenuItem key={element.id} value={element.id}>
                      {element.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
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
          onSelectionModelChange={handleDataSelection}
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
