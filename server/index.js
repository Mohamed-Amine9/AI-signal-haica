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

//Routest
//post 
app.post("/users", (req, res) => {
    const { firstName,lastName,email,password } = req.body;
 
    const sql = "INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)";
    connection.query(sql, [firstName,lastName,email,password], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
  });



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
  
  app.post('/login',(req,res)=>{
   const {email,password}=req.body;
   const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
   connection.query(query, (err, results) => {
    if (err) throw err;
    const user = results[0];
  if(user){
  // generate access token 
  const accessToken=jwt.sign({id:user.id,isAdmin:user.isAdmin},'mySecretKey',{expiresIn:"15m"});
  res.json({
    userName:user.userName,isAdmin:user.isAdmin,accessToken})
  }else{
  res.status(400).json("username or parssword incorrect");
  }
})
  });

  app.post("/register", (req, res) => {
    let data = {firstName: req.body.fistName,lastName:req.body.lastName, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });