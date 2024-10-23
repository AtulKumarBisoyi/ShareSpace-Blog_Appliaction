import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-primary fw-bold" to="/">ShareSpace</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item me-3">
                                <Link className="nav-link text-secondary fw-bold" to="/">Home</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link text-secondary fw-bold" to="/add-blog">Add Blog</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link text-secondary fw-bold" to="/add-category">Add Category</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {token && token !== null ? (
                                <>
                                    <div className="d-flex align-items-center me-3">
                                        <button className='btn btn-secondary me-2'>Welcome: {username}</button>
                                        <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item me-3">
                                        <Link className="btn btn-outline-primary fw-bold" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary fw-bold" to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ paddingTop: '70px' }}></div> {/* Adjust the padding as needed */}
        </>
    );
}

export default Header;
