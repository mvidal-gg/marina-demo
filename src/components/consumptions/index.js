import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Consumptions() {
  
  return (
    <>
      <h3> Consumptions component. Acceso privado</h3>
      <Button component={Link} to="/consumptions/new" variant="contained">
        Nuevo
      </Button>
    </>
  );
}
