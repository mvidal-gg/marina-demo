import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import withRole from "../../common/roles/withRole";

const RestrictedButton = withRole(['marina'])(Button)

export default function SalePoints() { 

  return (
    <>
      <h3> SalePoints component. Acceso privado</h3>  
      <RestrictedButton component={Link} to="/points-of-sale/new" variant="contained">
        Nuevo
      </RestrictedButton>  
    </>
  );
}
