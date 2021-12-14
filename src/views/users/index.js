import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import withRole from "../../common/roles/withRole";

const RestrictedButton = withRole(['marina'])(Button)

export default function Users() {

  return (
    <>
      <h3> Users component. Acceso privado</h3>
      <RestrictedButton component={Link} to="/users/new" variant="contained">
        Nuevo
      </RestrictedButton>
    </>
  );
}
