import { useUser } from "../../common/hooks/useUser";
import { useHistory } from "react-router-dom";

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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
