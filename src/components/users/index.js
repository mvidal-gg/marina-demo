import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Users() {
  return (
    <>
      <h3> Users component. Acceso privado</h3>
      <Button component={Link} to="/users/new" variant="contained">
        Nuevo
      </Button>
    </>
  );
}
