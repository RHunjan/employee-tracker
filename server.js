const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
    const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '!Apple@SQL',
    database: 'company'
  },
  console.log('Connected to the company database.')
);

//Query showing department names and department ids

app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

db.query(sql, (err, rows) => {
    if (err){
        res.status(500).json({error: err.message});
        return;
    }
  res.json({
    message: 'sucess',
    data: rows
      });
    });
});





//Query to add department
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = ['Marketing'];

    db.query(sql, params, (err, result) => {
        if (err){
            console.log(err)
        } 
       // console.log(result);
    });

//Query to delete a department
db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
    if (err){
        console.log(err);
    } 
   // console.log(result);
});

//query to view all roles
db.query(`SELECT * FROM roles`, (err, rows) => {
  //  console.log(rows);
});



// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//bottom of file
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

