import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const existingToken = localStorage.getItem("token");
  const existingUserId = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(existingUserId);

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);

      if (result.success && result.token) {
        setToken(result.token);
        setIsAuthenticated(true);
        setUserName(username);
      } else {
        throw new Error(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error('Login failed. Please try again.');
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
      setUserId(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
        userName,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
