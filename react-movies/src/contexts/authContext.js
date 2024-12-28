import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result.token) {
        setToken(result.token);
        setIsAuthenticated(true);
        setUserName(username);
      } else {
        throw new Error(result.message || "Invalid username or password.");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return result.code === 201;
  };

  const signout = () => {
    setTimeout(() => {
      setIsAuthenticated(false);
      setAuthToken(null);
      setUserName("");
      localStorage.removeItem("token");
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
