import React, { useEffect, useState } from "react";
import { useUser } from "../../common/hooks/useUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useApi } from "../../common/hooks/useApi";
import getConsumptions from "../../services/consumptionApiService";
import { fetchData } from "../../services/fetchData";

export default function Consumptions() {
  const { user } = useUser();
  const userToken = user.signInUserSession.idToken.jwtToken;
  const [consumptions, setConsumptions] = useApi(() =>
    getConsumptions(userToken)
  );
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

  useEffect(() => {
    fetchData(setConsumptions);
  }, []);

  return (
    <>
      <h3> Consumptions component. Acceso privado</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={consumptions.data || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Button component={Link} to="/consumptions/new" variant="contained">
        Nuevo
      </Button>
    </>
  );
}
