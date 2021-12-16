import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsumptions,
  selectAllConsumptions,
} from "../../common/features/consumptions/consumptionsSlice";

import withRole from "../../common/roles/withRole";
import { Role } from "../../common/roles/role";
import { PointsOfSaleFilter } from "../../components/consumptions/PointsOfSaleFilter";

export default function Consumptions() {
  const [selection, setSelection] = useState([]);

  const dispatch = useDispatch();

  const { token: userToken } = useSelector((state) => state.auth.user);

  const consumptions = useSelector(selectAllConsumptions);
  const consumptionsStatus = useSelector((state) => state.consumptions.status);
  const error = useSelector((state) => state.consumptions.error);

  const pointOfSale = useSelector((state) => state.pointsOfSale.current);
 
  useEffect(() => {
    if (consumptionsStatus === "idle") {
      dispatch(fetchConsumptions({userToken, pointOfSale}));
    }
  }, [consumptionsStatus, userToken, pointOfSale, dispatch]);

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

  let Filter = () => (
    <PointsOfSaleFilter
      pointOfSale={pointOfSale}
    />
  );

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
