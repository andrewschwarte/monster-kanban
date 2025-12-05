import Database from "better-sqlite3";

const db = new Database("./db/database.sqlite");

// Create a table for the tasks if it doesn’t exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'todo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

export default db;