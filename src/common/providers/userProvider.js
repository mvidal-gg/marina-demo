import React, { createContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    let isSubscribed = true
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        setIsLoading(false)
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
    return () => isSubscribed = false
  }

  const login = (email, password) =>
    Auth.signIn(email, password)
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        return user;
      })
      .catch((err) => {
        if (err.code === "UserNotFoundException") {
          err.message = "Correo y/o contraseña inválidos";
        }
        throw err;
      });

  const logout = () =>
    Auth.signOut().then((data) => {
      setUser(null);
      setIsAuthenticated(false);
      return data;
    });

  const sendConfirmationCode = (email) => {
    Auth.forgotPassword(email)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const setNewPassword = (email, code, new_password) => {
    Auth.forgotPasswordSubmit(email, code, new_password)
    .then(data => data)
    .catch(err => err);
  }

  const values = { user, isAuthenticated, isLoading, setIsAuthenticated, login, logout, sendConfirmationCode, setNewPassword };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
