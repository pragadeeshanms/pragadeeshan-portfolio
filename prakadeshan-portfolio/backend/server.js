import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/", (_req, res) => res.send("Pragadeeshan MS portfolio API is running."));
app.get("/api/projects", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, category, description, tech_stack, project_url FROM projects ORDER BY sort_order, id"
    );
    res.json(rows);
  } catch (error) {
    console.error("Projects error:", error.message);
    res.status(500).json({ message: "Could not load projects." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject = "", message } = req.body ?? {};
  if (
    typeof name !== "string" || !name.trim() || name.trim().length > 100 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150 ||
    typeof message !== "string" || !message.trim() || message.trim().length > 5000
  ) {
    return res.status(400).json({ message: "Please enter valid contact details." });
  }
  try {
    await pool.execute(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim(), String(subject).trim().slice(0, 180), message.trim()]
    );
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact error:", error.message);
    res.status(500).json({ message: "Could not send your message right now." });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running at http://localhost:${port}`));
