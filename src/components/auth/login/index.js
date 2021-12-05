import React from "react";
import { LoginForm } from "./forms/loginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h3>Introduce tu contraseña para iniciar sesión</h3>
      <LoginForm />
      <br />
      <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      <br />
      <Link to="/activate-account">¿Necesitas activar tu cuenta?</Link>
    </>
  );
}
export default Login;
