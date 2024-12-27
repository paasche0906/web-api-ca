import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
import '../css/LoginPage.css';

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = async () => {
        if (!userName || !password) {
            setErrorMessage("Username and password cannot be empty.");
            return;
        }

        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        try {
            await context.authenticate(userName, password);
        } catch (error) {
            setErrorMessage(error.message || "Invalid username or password.");
        }
    };

    let location = useLocation();

    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login to your account</h2>
                <p className="login-subtitle">
                    In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations, you will need to log in to your account. If you do not have an account, registering for an account is free and simple. <Link to="/signup" className="login-link">Click here</Link> to get started.
                </p>

                {errorMessage && <p className="login-error">{errorMessage}</p>}

                <label htmlFor="username" className="login-label">Username:</label>
                <input
                    className="login-input"
                    id="username"
                    placeholder="Enter your username"
                    onChange={(e) => {
                        setUserName(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <label htmlFor="password" className="login-label">Password:</label>
                <input
                    className="login-input"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <button className="login-button" onClick={login}>Login</button>
                <p className="login-footer">
                    <Link to="/reset-password" className="login-link">Reset password</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
