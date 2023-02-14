const express = require("express");
const app = express();
const cors=require("cors");
const connection=require("./Model/db")
const jwt=require('jsonwebtoken');


app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    console.log("Server running on port 5000.");
  });

//put user
  app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
  
    const sql = "UPDATE users SET description = ?";
    connection.query(sql, [description, id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while updating data.");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found.");
      }
      res.send("Data updated successfully.");
    });
  });