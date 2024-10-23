import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/register", input);
            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-5" style={{ width: '500px', borderRadius: '15px' }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="form-control form-control-lg border-0 shadow-sm"
                            id="username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="form-control form-control-lg border-0 shadow-sm"
                            id="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100">Register</button>
                </form>
                <div className="text-center mt-3">
                    <p>Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
