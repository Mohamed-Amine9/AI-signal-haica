// const express = require("express");
// const app = express();
// const cors=require("cors");
// const connection=require("./Model/db")
// const jwt=require('jsonwebtoken');


// app.use(cors());
// app.use(express.json());
// app.listen(5000, () => {
//     console.log("Server running on port 5000.");
//   });

//   //get users
//     app.get("/users", (req, res) => {
//         const sql = "SELECT * FROM users";
//         connection.query(sql, (err, rows) => {
//           if (err) {
//             console.error(err.message);
//             return res.status(500).send("Error occurred while fetching data.");
//           }
//           res.send(rows);
//         });
//       });

      
//  //get user by id
//     app.get("/users/:id", (req, res) => {
//         const { id } = req.params;
//         const sql = "SELECT * FROM users WHERE id = ?";
//         connection.query(sql, [id], (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             return res.status(500).send("Error occurred while fetching data.");
//         }
//         if (!rows.length) {
//             return res.status(404).send("User not found.");
//         }
//         res.send(rows[0]);
//         });
//     });
// //delete user
// app.delete("/users/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = "DELETE FROM users WHERE id = ?";
//     connection.query(sql, [id],(err, result) => {
//         if (err) {
//         console.error(err.message);
//         return res.status(500).send("Error occurred while deleting data.");
//         }
//         if (result.affectedRows === 0) {
//         return res.status(404).send("User not found.");
//         }else{
//         res.send("Data deleted successfully.");
//         }
//         });
//         });