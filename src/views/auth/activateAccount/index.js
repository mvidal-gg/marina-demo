import React, { useState } from "react";
import { UserValidatedForm } from "../../../components/auth/activateAccount/forms/userValidatedForm";
import { UserNotValidatedForm } from "../../../components/auth/activateAccount/forms/userNotValidatedForm";

function ActivateAccount() {
  const [isUserValidated, setIsUserValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [codeTemp, setCodeTemp] = useState("");

  if (isUserValidated) {
    return (
      <>
        <h3>
          Cuenta activada correctamente. Establezca un password para terminar la
          activación de la cuenta
        </h3>
        <UserValidatedForm
          email={email}
          codeTemp={codeTemp}
          setIsUserValidated={setIsUserValidated}
        />
      </>
    );
  } else {
    return (
      <>
        <h3>
          Introduce el correo de la cuenta a activar y tu código de verificación
          que has recibido por correo para iniciar sesión
        </h3>
        <UserNotValidatedForm
          setIsUserValidated={setIsUserValidated}
          setEmail={setEmail}
          setCodeTemp={setCodeTemp}
        />
      </>
    );
  }
}
export default ActivateAccount;
