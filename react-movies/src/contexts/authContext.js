import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
      // Re-throwing the error to allow the calling component to handle it
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const register = async (username, password) => {
    try {
      const result = await signup(username, password);
      if (result.code === 201) {
        return true;
      } else {
        throw new Error(result.message || "Registration failed.");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed. Please try again.");
    }
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
        userName,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
