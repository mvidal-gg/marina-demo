import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { NewConsumptionForm } from "../../components/consumptions/forms/newConsumptionForm";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import consumptionsService from "../../services/consumptions.service";
import { useSelector } from "react-redux";

export default function NewConsumption() {
  const { user } = useSelector((state) => state.auth);
  const { token: userToken } = user;
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const { search } = useLocation();
  const qs = queryString.parse(search);

  const columns = [
    { title: "id", field: "id" },
    { title: "numCard", field: "numCard" },
    { title: "dateEdition", field: "dateEdition" },
    { title: "copies", field: "copies" },
    { title: "idPublication", field: "idPublication" },
  ];

  const [services, setServices] = useState([]);

  const [selection, setSelection] = useState([]);

  let consumptions = [];

  const isDisabled = selection && selection.length > 0 ? false : true;

  const handleDataSelection = (newSelection) => {
    setSelection(newSelection);
    consumptions = services.filter(service =>
      newSelection.includes(service.id)
    )
    console.log(JSON.stringify(consumptions));
  };

  const handleSaveConsumption = async () => {
    alert("Aquí añadiríamos los siguientes consumos: " + selection);
    console.log(userToken);
    consumptionsService.insert({
      token: userToken,
      consumptions: consumptions
    });
  };

  useEffect(() => {
    qs.cardNumber && setCardNumber(qs.cardNumber);
    qs.error && setError(qs.error);
  }, [qs.cardNumber, qs.error]);

  error &&
    enqueueSnackbar(
      "Ha ocurrido un error con el lector de tarjetas. Introduce el código manualmente.",
      {
        variant: "error",
      }
    );

  return (
    <>
      <h3>Nuevo consumo</h3>
      <NewConsumptionForm cardNumber={cardNumber} setServices={setServices} />
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handleDataSelection}
      />
      <Button
        onClick={handleSaveConsumption}
        variant="contained"
        disabled={isDisabled}
      >
        Guardar
      </Button>
    </>
  );
}
