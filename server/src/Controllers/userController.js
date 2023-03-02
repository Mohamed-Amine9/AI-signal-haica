const connection=require("../service/dbService");
const jwt = require('jsonwebtoken');
const central = require('./centralController');
const bcrypt = require('bcrypt');


const table={
name:"user"
}

exports.register=(req,res)=>{
  central.signUp(req, res, table.name);
};

exports.login=(req,res)=>{
    central.loginUser(req,res,table.name);
}

// Register user

 /*exports.login=(req,res)=>{
  const {email,password}=req.body;
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
   if (err) throw err;
   const user = results[0];
 if(user){
 // generate access token 
 const accessToken=jwt.sign({id:user.id,isAdmin:user.isAdmin},'mySecretKey',{expiresIn:"15m"});
 res.json({
   email:user.email,isAdmin:user.isAdmin,accessToken})
 }else{ 
 res.status(400).json("email or parssword incorrect");
 }
})
 };  */


  
  /*

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    const { email, password } = user;

    connection.query('INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)', [firstName,lastName,email,password], (error, results, fields) => {
      if (error) {
        console.error('Error inserting data into MySQL: ' + error.stack);
        reject('Error inserting data into MySQL');
        return;
      }

      resolve({ id: results.insertId, email: email });
    });
  });
};





// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send({ message: 'Email and password are required' });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await userService.getUserByEmail(email);
//     if (existingUser) {
//       return res.status(409).send({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = {
//       email: email,
//       password: hashedPassword
//     };
//     const newUser = await userService.createUser(user);

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser.id }, config.auth.jwtSecret, { expiresIn: '1d' });

//     res.status(201).send({ message: 'User created', token: token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error creating user' });
//   }
// });
*/