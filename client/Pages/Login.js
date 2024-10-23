import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.name);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-5" style={{ width: '500px', borderRadius: '15px' }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} // Corrected here
                            className="form-control form-control-lg border-0 shadow-sm"
                            id="email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} // Corrected here
                            className="form-control form-control-lg border-0 shadow-sm"
                            id="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p className="text-secondary">Don't have an account? <a href="/register" className="text-primary fw-bold">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
