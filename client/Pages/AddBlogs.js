import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBlog = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
    });
    const [file, setFile] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fecthAllCategories = async () => {
            const res = await axios.get("http://localhost:8000/api/v1/get/categories",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            setCategories(res.data);
        };
        fecthAllCategories();
    }, [])

    //creating a form data
    const formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("category", input.category);
    formdata.append("description", input.description);
    formdata.append("thumbnail", file);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/add/blog", formdata, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            alert(res.data.message);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    }


    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4 text-primary fw-bold">Add New Blog</h3>
            <form onSubmit={handleSubmit} className="shadow-lg p-5 bg-light rounded">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        className="form-control"
                        id="title"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className='form-control'
                        name="category"
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}>
                        <option disabled>Select Category</option>
                        {categories && categories.map((item) => {
                            return <option value={item._id}>{item.title}</option>
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
                    <input
                        type="file"
                        name="thumbnail"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="form-control"
                        id="thumbnail"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
