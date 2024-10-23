import express from 'express';
import cors from 'cors';
import connectToMongo from './config/db.js';
import router from './routes/blog.js';

const app = express();
const PORT = 8000;

connectToMongo();

app.use(cors());
app.use(express.json());

app.use(express.static("public/upload"));

app.get("/", (req, res) => {
    res.send("API is running..");
});

//API routes
app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
