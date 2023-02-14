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

  app.post("/admin", (req, res) => {
    const { userName,password,isAdmin } = req.body;
 
    const sql = "INSERT INTO users (userName,password,isAdmin) VALUES (?,?,?)";
    connection.query(sql, [userName,password,isAdmin], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
  });