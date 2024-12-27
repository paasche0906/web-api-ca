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
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let validationErrors = {};

        // Username validation
        if (userName.length < 5) {
            validationErrors.userName = "Username must be at least 5 characters long.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
            validationErrors.userName = "Username can only contain letters, numbers, and underscores.";
        }

        // Password validation
        let passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegEx.test(password)) {
            validationErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
        }

        // Confirm password validation
        if (password !== passwordAgain) {
            validationErrors.passwordAgain = "Passwords do not match.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const register = () => {
        if (validateInputs()) {
            context.register(userName, password);
            setRegistered(true);
        }
    };

    if (registered) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="signup-container">
            <div className="signup-box signup-box-framed">
                <h2 className="signup-title">Sign Up</h2>
                <p className="signup-description">Register to access your account</p>
                {errors.userName && <p className="error-message">{errors.userName}</p>}
                <input
                    className={`signup-input ${errors.userName ? 'input-error' : ''}`}
                    value={userName}
                    placeholder="User Name"
                    onChange={e => setUserName(e.target.value)}
                    aria-label="Enter your username"
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                <input
                    className={`signup-input ${errors.password ? 'input-error' : ''}`}
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    aria-label="Enter your password"
                />
                {errors.passwordAgain && <p className="error-message">{errors.passwordAgain}</p>}
                <input
                    className={`signup-input ${errors.passwordAgain ? 'input-error' : ''}`}
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
