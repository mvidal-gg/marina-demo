import React, { useState } from "react";
import { ForgotPasswordForm } from "./forms/forgotPasswordForm";
import { ForgotPasswordSubmitForm } from "./forms/forgotPasswordSubmitForm";

function ForgotPassword(props) {
  const [isConfirmationSend, setIsConfirmationSend] = useState(false);
  const [username, setUsername] = useState(null);

  if (!isConfirmationSend) {
    return (
      <div>
        <h3>Confirma tu correo electrónico</h3>
        <p>
          Enviaremos un email a tu dirección de correo electrónico para que
          puedas recuperar tu contraseña. Si no recibes el correo, consulta tu
          carpeta de spam
        </p>
        <ForgotPasswordForm
          setUsername={setUsername}
          setIsConfirmationSend={setIsConfirmationSend}
        />
      </div>
    );
  } else {
    return (
      <>
        <h3>Introduce tu nueva contraseña</h3>
        <ForgotPasswordSubmitForm username={username}/>
      </>
    );
  }
}

export default ForgotPassword;
