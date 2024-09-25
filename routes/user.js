// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to insert data
router.post('/add', (req, res) => {
    console.log(req.body)
    const { title, company_name, date, status} = req.body;
    const query = `INSERT INTO job (title, company_name, date, status ) VALUES (?, ?, ?, ?)`;
    db.query(query, [title, company_name, date, status ], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    });
});

// Route to get all Job
router.get('/get', (req, res) => {
    const query = 'SELECT * FROM job ORDER BY id ASC'; // Order by id in ascending order
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database retrieval failed' });
        }
        res.status(200).json(results);
    });
});


// Route to get one user by ID
router.get('/get/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM job WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve user' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
});

// Route to update a user by ID
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, company_name, date, status  } = req.body;
    const query = `UPDATE job SET title = ?, company_name = ?, date = ?, status = ?, updated_at = NOW() WHERE id = ?`;

    db.query(query, [title, company_name, date, status , id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});

// Route to delete a user by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM job WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
