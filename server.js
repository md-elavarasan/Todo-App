const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

              
app.use(cors());
app.use(bodyParser.json());

                       
const db = mysql.createConnection({
    host: 'localhost',          
    user: 'root',               
    password: 'jayanthi@1972', 
    database: 'todo_app'        
});



db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});


app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


app.post('/tasks', (req, res) => {
    const task = req.body.task;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, task });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(204);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
