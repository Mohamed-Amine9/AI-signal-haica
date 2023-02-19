const connection=require("../service/dbService");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');

//   app.post("/admin", (req, res) => {
//     const { userName,password,isAdmin } = req.body;
 
//     const sql = "INSERT INTO users (userName,password,isAdmin) VALUES (?,?,?)";
//     connection.query(sql, [userName,password,isAdmin], (err, result) => {
//       if (err) {
//         console.error(err.message);
//         return res.status(500).send("Error occurred while inserting data.");
//       }
//       res.send("Data inserted successfully.");
//     });
//   });