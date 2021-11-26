import React, { createContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    let isSubscribed = true;
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        setUserRole(
          user.signInUserSession.idToken.payload["cognito:groups"][0]
        );
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    return () => (isSubscribed = false);
  }

  const confirmSignUp = (username, code, codeTemp) =>
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

  const signUp = (
    username,
    password,
    phone_number,
    email,
    pointOfSale = "",
    role = ""
  ) =>
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

  const login = (email, password, newPassword = "") =>
    Auth.signIn(email, password)
      .then((user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          console.log("Esta cuenta requiere cambiar el password");
          Auth.completeNewPassword(user, newPassword);
          login(user.challengeParam.userAttributes.email, newPassword);
        } else {
          setUser(user);
          console.log(user);
          setUserRole(
            user.signInUserSession.idToken.payload["cognito:groups"][0]
          );
          setIsAuthenticated(true);
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

  const logout = () =>
    Auth.signOut().then((data) => {
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
      return data;
    });

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

  const values = {
    user,
    isAuthenticated,
    isLoading,
    userRole,
    setIsAuthenticated,
    confirmSignUp,
    signUp,
    login,
    logout,
    sendConfirmationCode,
    setNewPassword,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
