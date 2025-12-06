import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks ORDER BY id DESC").all();
  res.json(tasks);
});

// Create a task
router.post("/", (req, res) => {
  const { title, status } = req.body;
  const stmt = db.prepare("INSERT INTO tasks (title, status) VALUES (?, ?)");
  const info = stmt.run(title, status || "todo");
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(task);
});

// Update a task
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const stmt = db.prepare(
    "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
  );
  stmt.run(title, status, id);
  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  res.json(updated);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  res.json({ message: "Task deleted" });
});

export default router;
