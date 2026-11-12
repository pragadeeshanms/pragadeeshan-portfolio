# Pragadeeshan MS — Full-stack Portfolio

A React + Vite frontend with an Express API and MySQL database.

## Requirements
- Node.js 20+
- MySQL Server 8+
- VS Code

## 1. Database
Open MySQL Workbench and run `database.sql`.

## 2. Backend
Open a terminal:
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`, then enter your own MySQL password in `DB_PASSWORD`.
```bash
npm run dev
```
Backend runs at http://localhost:5000

## 3. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (normally http://localhost:5173).

## Important
- Do not share your MySQL password or `.env` file.
- This is a development starter. Before public deployment, add rate limiting, stronger server-side validation, HTTPS, and spam protection.
- The contact form writes to MySQL through the backend API.
