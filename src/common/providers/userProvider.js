import React, { createContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, [user, isAuthenticated]);

  async function onLoad() {
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const login = (usernameOrEmail, password) =>
    Auth.signIn(usernameOrEmail, password)
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        return user;
      })
      .catch((err) => {
        if (err.code === "UserNotFoundException") {
          err.message = "Invalid username or password";
        }
        throw err;
      });

  const logout = () =>
    Auth.signOut().then((data) => {
      setUser(null);
      setIsAuthenticated(false);
      return data;
    });

  const values = { user, isAuthenticated, setIsAuthenticated, login, logout };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
