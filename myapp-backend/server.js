require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!["customer", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)";
        
        db.query(sql, [firstName, lastName, email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error registering user" });
            }
            res.json({ message: `${role} registered successfully` });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/admin-login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length === 0) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not allowed to login from here" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
