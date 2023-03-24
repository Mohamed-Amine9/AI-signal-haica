const express = require("express");
const path = require('path');
const helmet = require("helmet");
const app = express();
const cors=require("cors");
const bodyParser = require('body-parser');
const db = require(path.join(__dirname, 'src', 'config', 'default'));


//const jwt=require('jsonwebtoken');

let dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname, 'src', 'config', '.env')})


app.use(cors());
app.use(express.json());
app.use(helmet());


  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  const usersRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "userRoutes"
  ));
  const postsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "postsRoutes"
  ));
  const radiosRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "radiosRoutes"
  ));
  const chanelsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "chanelsRoutes"
  ));
  const signalsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "signalsRoutes"
  ));
  const adminRoutes = require(path.join(__dirname, "src","Routes","adminRoutes"));
  const super_adminRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "super_adminRoutes"
  ));

  app.use("/", usersRoutes);
  app.use("/", postsRoutes);
  app.use("/", radiosRoutes);
  app.use("/", chanelsRoutes);
  app.use("/", signalsRoutes);
  app.use("/", adminRoutes);
  app.use("/", super_adminRoutes);


  //Routest
//post 
// app.post("/users", (req, res) => {
//     const { firstName,lastName,email,password } = req.body;
 
//     const sql = "INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)";
//     connection.query(sql, [firstName,lastName,email,password], (err, result) => {
//       if (err) {
//         console.error(err.message);
//         return res.status(500).send("Error occurred while inserting data.");
//       }
//       res.send("Data inserted successfully.");
//     });
//   });



//delete
/*app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    connection.query(sql, [id],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("User not found.");
        }else{
        res.send("Data deleted successfully.");
        }
        });
        });*/
        const verify =(req,res,next)=>{
          const authHerader=req.headers.authorization;
          if (authHerader){
          const token =authHerader.split(" ")[1];
          jwt.verify(token,"mySecretKey",(err,user)=>{
            if (err){
              return res.status(403).json("token is not valid!");
            }
           req.user=user;
           next();  
            });
            }else{
            res.status(401),json("you are no authenticated!");
            }
          };
app.delete('/users/:id',verify,(req,res)=>{
   if(req.user.id===req.params.id || req.user.isAdmin){
  res.status(200).json("user has been deleted");
  }else{
  res.status(403).json("you are not allowed to delete this user")
  }
});
  


  app.post("/register", (req, res) => {
    let data = {firstName: req.body.fistName,lastName:req.body.lastName, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


  app.listen(process.env.PORT, () => {
    console.log("Server running on port ",process.env.PORT);
   });