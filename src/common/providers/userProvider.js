import React, { createContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
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
        setUserGroup(user.signInUserSession.idToken.payload["cognito:groups"]);
        setIsAuthenticated(true);
        setIsLoading(false)
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
    return () => isSubscribed = false
  }


  const confirmSignUp = (username, code ) =>
    Auth.confirmSignUp(username, code)
      .then((user) => {
        console.log('Confirmed user =>' + user)
        return true;
      })
      .catch((err) => {
        console.log('error confirming user:', err)
        return false;
      }
  );

  const signUp = (username, password, phone_number, email) =>
    Auth.signUp({username, password,
      attributes: {
          email,       
          phone_number
      }
    })
      .then((user) => {
        console.log('created user =>' + user)
        return true;
      })
      .catch((err) => {
        console.log('error signing up:', err)
        return false;
      }
   );

  const login = (email, password) =>
    Auth.signIn(email, password)
      .then((user) => {
        setUser(user);
        console.log(user);
        setUserGroup(user.signInUserSession.idToken.payload["cognito:groups"]);
        setIsAuthenticated(true);
        return user;
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
      setUser(null);
      setUserGroup(null);
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

  const values = { user, isAuthenticated, isLoading, userGroup, setIsAuthenticated, confirmSignUp, signUp, login, logout, sendConfirmationCode, setNewPassword };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
