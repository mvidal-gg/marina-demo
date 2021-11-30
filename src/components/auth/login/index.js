import React, { useState } from "react";
import { useUser } from "../../../common/hooks/useUser";
import { useSnackbar } from "notistack";
import { UserValidatedForm } from "./forms/UserValidatedForm";
import { Link } from "react-router-dom";
import { UserNotValidatedForm } from "./forms/UserNotValidatedForm";

function Login() {
  const [isUserValidated, setIsUserValidated] = useState(true);

  if (isUserValidated) {
    return (
      <>
        <h3>Introduce tu contraseña para iniciar sesión</h3>
        <UserValidatedForm setIsUserValidated={setIsUserValidated} />
        <br />
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        <br />
        <Link to="/activate-account">¿Necesitas activar tu cuenta?</Link>
      </>
    );
  } else {
    return (
      <>
        <h3>
          Introduce tu código de verificación que has recibido por correo para
          iniciar sesión
        </h3>
        <UserNotValidatedForm setIsUserValidated={setIsUserValidated} />
      </>
    );
  }
}
export default Login;
