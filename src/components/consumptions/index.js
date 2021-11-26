import React, { useEffect, useState } from "react";
import { useUser } from "../../common/hooks/useUser";
import { Button } from "@mui/material";
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import configAPI from "../../config/configApi.json";
import { ConsoleLogger } from "@aws-amplify/core";

export default function Consumptions() {
  const { user } = useUser();
  const [consumptions, setConsumptions] = useState([]);
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
    { title: "update", field: "update" }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let isSubscribed = true;
    try {
      await fetch(
        "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/consumption?pointSaleId=2&dateConsumption=25/11/2021",
        {
          method: "GET",
          headers: {
            Authorization: user.signInUserSession.accessToken.jwtToken,
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          setConsumptions((pointsOfSale) => [
            ...pointsOfSale,
            ...data["body"]["consumptions"],
          ])
        );
    } catch (err) {
      console.log(err);
    }
    return () => (isSubscribed = false);
  }

  return (
    <>
      <h3> Consumptions component. Acceso privado</h3>
       <DataGrid
        rows={consumptions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

      <Button component={Link} to="/consumptions/new" variant="contained">
        Nuevo
      </Button>
    </>
  );
}
