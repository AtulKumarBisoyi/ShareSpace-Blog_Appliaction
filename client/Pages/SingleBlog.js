import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingleBlog = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchSingleBlog = async () => {
            const res = await axios.get(`http://localhost:8000/api/v1/get/blog/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            setBlog(res.data);
        };

        fetchSingleBlog();
    }, [id]);

    if (!blog) {
        return <div className="text-center mt-5"><h5>Loading...</h5></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <img src={`http://localhost:8000/${blog.thumbnail}`} alt={blog.title} className="card-img-top rounded" />
                <h3 className="text-primary mt-3">{blog.title}</h3>
                <p className="mt-3">{blog.description}</p>
                <button className="btn btn-primary" onClick={() => navigate("/")}>Go Back</button>
            </div>
        </div>
    );
};

export default SingleBlog;
