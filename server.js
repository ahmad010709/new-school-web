const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection Configuration
const dbConfig = {
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'school'
};

// Create Connection
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database "school".');
});

// Post Route to handle form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Please provide name, email, and message.');
    }

    const sql = 'INSERT INTO contect (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Signup Route
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    // Simple username generation from email for now, or you could add a username field to the signup form
    const username = email.split('@')[0];

    if (!email || !password) {
        return res.status(400).send('Please provide email and password.');
    }

    // In a real app, hash the password here (e.g., using bcrypt)
    const sql = 'INSERT INTO account (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Email already exists');
            }
            return res.status(500).send('Server error');
        }
        res.status(200).send('Account created successfully!');
    });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password.');
    }

    const sql = 'SELECT * FROM account WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Scholarship Application Route
app.post('/api/scholarship', (req, res) => {
    const { name, father_name, email, phone, class: studentClass, marks } = req.body;

    if (!name || !father_name || !email || !phone || !studentClass || !marks) {
        return res.status(400).send('Please fill all fields.');
    }

    const sql = 'INSERT INTO scholarships (name, father_name, email, phone, class, marks) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, father_name, email, phone, studentClass, marks], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Scholarship application submitted!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
