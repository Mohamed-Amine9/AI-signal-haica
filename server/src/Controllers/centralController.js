const connection=require("../service/dbService");
const message=require("../config/messages")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config=require('../config/default')
const log=require("../log/logger")
const { createSession, deleteSessionById, getSessionByRefreshToken } = require("./session");
const { generateToken, generateRefreshToken } = require("../middlware/auth");

exports.getAll = (req, res, table) => {
    const query = "SELECT * FROM " + table;
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        log.logger.log('error','Error finding customers')
        return res.status(500).send(message.error.serverError);
      }
      if (!rows) {
        console.error(message.error.notFound+" "+ table);
       // log.logger.log(req.method,req.url,'info', 'Successfully got list of customers')
        return res.status(404).send(message.error.notFound);
      }
      log.info(`[${req.method} ${req.url}]`)
      res.status(200).json(rows);
    })
  };



  exports.getById=(req,res,table,Id)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where "+Id+"=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      res.status(400).json(rows);
    })
};



exports.getByEmail=(req,res,table,capt)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where email=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      
      res.status(400).json(rows);
    })
};

exports.signUp = (req, res, table) =>{
  const { firstName,lastName,email,password } = req.body;
  
  const query = "SELECT * FROM "+table+" where email=?";
  connection.query(query,[email], (err, rows) => {
    if (rows.length > 0) { 
      return res.status(200).json(rows[0]);
    }
      return register(req, res, table);
  });
};
exports.getByName=(req,res,table,capt)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where name=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      res.status(400).json(rows);
    })
};

exports.deleteByName=(req,res,table)=>{

    const {input} = req.params;
    const sql = "DELETE FROM "+table+" WHERE name = ?";
    connection.query(sql, [input],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
        }
        if (result.affectedRows === 0) {
        return res.status(404).send(message.error.notFound+" "+table);
        }
        res.send(message.success.delete);
        });
};


exports.deleteById=(req,res,table,Id)=>{
    
    const { input } = req.params;
    const sql = "DELETE FROM "+table+" WHERE "+Id+"= ?";
    connection.query(sql, [input],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
        }
        if (result.affectedRows === 0) {
        return res.status(404).send(message.error.notFound+" "+table);
        }
        res.send(message.success.delete);
        });
};

exports.deleteByEmail=(req,res,table)=>{

    const {input} = req.params;
    const sql = "DELETE FROM "+table+" WHERE email= ?";
    connection.query(sql, [input],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
        }
        if (result.affectedRows === 0) {
        return res.status(404).send(message.error.notFound+" "+table);
        }
        res.send(message.success.delete);
        });
};

/*exports.register = (req, res) => {
    const { firstName,lastName,email,password } = req.body;
   
    // Check if user already exists
    const selectQuery = 'select * from '+table+' where email=?';
    connection.query(selectQuery,[email], (error, results) => {
      if (error) {
        console.error(error.message);
      return  res.status(500).json({ message: 'Error checking for user' });
      } else {
        if (results.length > 0) {
         return res.status(400).json({ message: 'User already exists' });
        } else {
          // Insert user into database
          const insertQuery = 'INSERT INTO '+table+' (firstName,lastName,email,password) VALUES (?,?,?,?)';
          connection.query(insertQuery,[firstName,lastName,email,password], (error, results) => {
            if (error) {
                console.error(error.message);
              return res.status(500).json({ message: 'Error registering '+table });
            } else {
              // Create JWT tokens
              const accessToken = jwt.sign({ email }, 'mySecretKey', { expiresIn: '15m' });
              const refreshToken = jwt.sign({ email }, 'myRefreshKey', { expiresIn: '1d' });
              // Save refresh token to database
              const updateQuery = 'UPDATE '+table+' SET refresh_token = '+refreshToken+' WHERE email =?';
              connection.query(updateQuery,[email],(error, results) => {
                if (error) {
                    console.error(error.message);
                 return res.status(500).json({ message: 'Error saving refresh token' });
                } else {
                    console.error(error.message);
                 return res.json({ message: 'User registered', accessToken, refreshToken });
                }
              });
            }
          });
        }
      }
    });
  };
  */



function register (req, res,table) {
    const { firstName,lastName,email,password } = req.body;
    
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, config.bcryptSaltRounds, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }
    
          const query = "INSERT INTO "+table+" (firstName,lastName,email, password) VALUES (?,?,?,?)";
          connection.query(query, [firstName,lastName,email, hash], (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            const userId = result.insertId;
            const refreshToken = generateRefreshToken({ id: userId, email });
    
            createSession(userId, refreshToken)
              .then((sessionId) => {
                const token = generateToken({ id: userId, email });
                resolve({ id: userId, email, token, refreshToken, sessionId });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      });
    }

    /*exports.register = async (req, res, table) => {
      const { firstName, lastName, email, password } = req.body;
    
      try {
        const hash = await bcrypt.hash(password, config.bcryptSaltRounds);
        const query = "INSERT INTO "+table+" (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
        const values = [ firstName, lastName, email, hash];
        const result = await connection.execute(query, values,(err,resultat)=>{
          const userId = resultat.insertedId;
          console.log(userId)
        });
        
        const refreshToken = generateRefreshToken({ id: userId, email });
        const sessionId = await createSession(userId, refreshToken);
        const token = generateToken({ id: userId, email });
        return { id: userId, email, token, refreshToken, sessionId };
      } catch (err) {
        throw err;
      }
    };*/
    function getUserByEmail(email,table) {
      return new Promise((resolve, reject) => {
        const query ="SELECT * FROM "+table+" WHERE email = ?";
        connection.query(query, [email], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
    
          if (results.length === 0) {

            resolve(null);
            return;
          }
          const user = results[0];
          resolve(user);
        });
      });
    }
    function getUserIDByEmail(email,table) {
      return new Promise((resolve, reject) => {
        const query ="SELECT id FROM "+table+" WHERE email = ?";
        connection.query(query, [email], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
    
          if (results.length === 0) {

            resolve(null);
            return;
          }
          const user_id = results[0];
          resolve(user_id);
        });
      });
    }

exports.loginUser=(req,res,table) =>{
  const { email,password } = req.body;

      return new Promise((resolve, reject) => {
        getUserByEmail(email,table)
          .then((user) => {
            if (!user) {
              resolve(null);
              return;
            }
            
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                reject(err);
                return;
              }
    
              if (!result) {
                resolve(null);
                return;
              }
    
              const token = generateToken({ id: user.id, email });

              const refreshToken = generateRefreshToken({ id: user.id, email });

              createSession(user.id, refreshToken)
                .then((sessionId) => {
                  resolve({
                    id: user.id,
                    email: user.email,
                    token,
                    refreshToken,
                    sessionId,
                  });
                })
                .catch((err) => {
                  reject(err);
                });
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
exports.logOut=(req,res,table)=>{
  const refreshToken = req.body.refreshToken;
  getUserByEmail(email,table)
  .then((user) => {
    if (!user) {
      resolve(null);
      return;
    }

    deleteSessionById(user.id)
    .then(() => {
      res.status(200).send({ message: 'Logout successful' });
    })
    .catch((err) => {
      console.error(`Error during logout: ${err}`);
      res.status(500).send({ error: 'Internal server error' });
    });
  })}
