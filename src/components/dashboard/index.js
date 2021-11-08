import { useUser } from "../../common/hooks/useUser";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Auth from "@aws-amplify/auth";

export default function Dashboard() {
  const { logout } = useUser();
  const history = useHistory();

  async function handleLogout() {
    await logout();
    history.push("/login");
  }
  
  return (
    <>
      <h3> Dashboard component. Acceso privado</h3>
      <Button
        onClick={handleLogout}       
        variant="contained"
      >
        Logout
      </Button>
    </>
  );
}
