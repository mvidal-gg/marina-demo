import { Auth } from "aws-amplify";

const confirmSignUp = (username, code, codeTemp) => {
  Auth.confirmSignUp(username, code, {
    clientMetadata: { codeTemp: codeTemp },
  })
    .then((user) => {
      console.log("Confirmed user =>" + user);
      return true;
    })
    .catch((err) => {
      console.log("error confirming user:", err);
      return false;
    });
};

const signUp = (
  username,
  password,
  phone_number,
  email,
  pointOfSale = "",
  role = ""
) => {
  Auth.signUp({
    username,
    password,
    attributes: {
      email,
      phone_number,
      "custom:point-of-sale": pointOfSale,
      "custom:role": role,
    },
  })
    .then((user) => {
      console.log("created user =>" + user);
      return true;
    })
    .catch((err) => {
      console.log("error signing up:", err);
      return false;
    });
};

//TODO: REVISAR CUANDO EL USUARIO ACTIVA SU CUENTA Y PONE NUEVO PASS,
//A VECES FALLA CON MENSAJE DE LOGIN INCORRECT USERNAME OR PASSWORD
const login = (email, password, newPassword) => {
  return Auth.signIn(email, password)
    .then((user) => {
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        Auth.completeNewPassword(user, newPassword);
        login(user.challengeParam.userAttributes.email, newPassword);
      } else {
        console.log(user);
        return user;
      }
    })
    .catch((err) => {
      if (err.code === "UserNotFoundException") {
        err.message = "Correo y/o contraseña inválidos";
      }
      if (err.code === "UserNotConfirmedException") {
        err.message = "Usuario pendiente de validación";
      }
      throw err;
    });
};

const logout = () => {
  Auth.signOut().then((data) => data);
};

const sendConfirmationCode = (email) => {
  Auth.forgotPassword(email)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const setNewPassword = (email, code, new_password) => {
  Auth.forgotPasswordSubmit(email, code, new_password)
    .then((data) => data)
    .catch((err) => err);
};

const authService = {
  confirmSignUp,
  signUp,
  login,
  logout,
  sendConfirmationCode,
  setNewPassword,
};

export default authService;
