const connection=require("../service/dbService");
const jwt=require('jsonwebtoken');
const centralController = require('./centralController');
const table="users";
const bcrypt = require('bcrypt');
const mysql = require('mysql');




// Register user
exports.register = (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const selectQuery = `SELECT * FROM users WHERE email = '${email}'`;
  connection.query(selectQuery, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error checking for user' });
    } else {
      if (results.length > 0) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        // Insert user into database
        const insertQuery = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;
        connection.query(insertQuery, (error, results) => {
          if (error) {
            res.status(500).json({ message: 'Error registering user' });
          } else {
            // Create initial access token
            const accessToken = jwt.sign({ email }, 'jwtSecretKey', { expiresIn: '15m' });
            // Create initial refresh token
            const refreshToken = jwt.sign({ email }, 'jwtRefreshKey', { expiresIn: '1d' });
            // Save refresh token to database
            const updateQuery = `UPDATE users SET refresh_token = '${refreshToken}' WHERE email = '${email}'`;
            connection.query(updateQuery, (error, results) => {
              if (error) {
                res.status(500).json({ message: 'Error saving refresh token' });
              } else {
                res.json({ message: 'User registered', accessToken, refreshToken });
              }
            });
          }
        });
      }
    }
  });
};





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