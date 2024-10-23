import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCategory = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
    });
    const handleCategory = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/add/category",
                input,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            alert(res.data.message);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4 text-primary fw-bold">Add New Category</h3>
            <form onSubmit={handleCategory} className="shadow-lg p-5 bg-light rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        className="form-control"
                        id="name"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
