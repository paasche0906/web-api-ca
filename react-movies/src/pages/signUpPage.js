import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import '../css/SignUpPage.css';

const SignUpPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState("");

    const register = () => {
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const validPassword = passwordRegEx.test(password);

        if (!validPassword) {
            setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
            return;
        }
        if (password !== passwordAgain) {
            setError("Passwords do not match.");
            return;
        }
        context.register(userName, password);
        setRegistered(true);
    };

    if (registered) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                <p className="signup-description">Register to access your account</p>
                {error && <p className="error-message">{error}</p>}
                <input
                    className="signup-input"
                    value={userName}
                    placeholder="User Name"
                    onChange={e => setUserName(e.target.value)}
                    aria-label="Enter your username"
                />
                <input
                    className="signup-input"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    aria-label="Enter your password"
                />
                <input
                    className="signup-input"
                    type="password"
                    value={passwordAgain}
                    placeholder="Confirm Password"
                    onChange={e => setPasswordAgain(e.target.value)}
                    aria-label="Confirm your password"
                />
                <button className="signup-button" onClick={register}>Register</button>
            </div>
        </div>
    );
};

export default SignUpPage;
