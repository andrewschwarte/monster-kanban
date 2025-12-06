import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // your Vite dev URL
    })
);

app.use(express.json());

// Mount routes
app.use("/api/tasks", tasksRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));