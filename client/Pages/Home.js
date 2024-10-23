import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            const res = await axios.get("http://localhost:8000/api/v1/get/allblogs", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            setBlogs(res.data);
        };
        fetchAllBlogs();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary fw-bold">Latest Blogs</h2>
            <div className="row">
                {blogs && blogs.length > 0 ? (
                    blogs.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="card shadow-sm" style={{ width: '100%', height: '470px' }}>
                                <img
                                    src={`http://localhost:8000/${item.thumbnail}`}
                                    className="card-img-top"
                                    alt={item.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column justify-content-between" style={{ height: 'calc(100% - 200px)' }}>
                                    <h5 className="card-title text-center" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                        {item.title}
                                    </h5>
                                    <p className="card-text text-center" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                                        {item.description}
                                    </p>
                                    <Link to={`/blog/${item._id}`} className="btn btn-primary w-100">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </div>
    );
};

export default Home;
