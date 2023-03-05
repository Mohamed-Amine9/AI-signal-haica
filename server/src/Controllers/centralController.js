const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const message = require(path.join(__dirname, '..', 'config', 'messages'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require(path.join(__dirname, '..', 'config', 'default'));
const log = require(path.join(__dirname, '..', 'log', 'logger'));
const { createSession, deleteSessionById, getSessionByRefreshToken } = require(path.join(__dirname, 'session'));
const { generateToken, generateRefreshToken } = require(path.join(__dirname, '..', 'middlware', 'auth'));



/* -------------------------------------------------------------------------- */
/*                               get all method                               */
/* -------------------------------------------------------------------------- */
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
      log.info(`[${req.method} ${req.url}]`);
      res.status(200).json(rows);
    })
  };

/* -------------------------------------------------------------------------- */
/*                              get by id method                              */
/* -------------------------------------------------------------------------- */

  exports.getById=(req,res,table,Id)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where "+Id+"=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      log.info(`[${req.method} ${req.url}]`);
      res.status(400).json(rows);
    })
};


/* -------------------------------------------------------------------------- */
/*                             get by email method                            */
/* -------------------------------------------------------------------------- */
exports.getByEmail=(req,res,table,capt)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where email=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      log.info(`[${req.method} ${req.url}]`);
      res.status(400).json(rows);
    })
};
/* -------------------------------------------------------------------------- */
/*        signUp method (that method used to check if the user exists)        */
/* -------------------------------------------------------------------------- */
exports.signUp = (req, res, table) =>{
  const { firstName,lastName,email,password } = req.body;
  
  const query = "SELECT * FROM "+table+" where email=?";
  connection.query(query,[email], (err, rows) => {
    if (rows.length > 0) { 
      return res.status(200).json(rows[0]);
    }
    log.info(`[${req.method} ${req.url}]`);
      return register(req, res, table);
  });
};
/* -------------------------------------------------------------------------- */
/*                             get by name method                             */
/* -------------------------------------------------------------------------- */
exports.getByName=(req,res,table,capt)=>{
    const { input } = req.params;
    const query = "SELECT * FROM "+table+" where name=?";
    connection.query(query,[input], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      log.info(`[${req.method} ${req.url}]`);
      res.status(400).json(rows);
    })
};
/* -------------------------------------------------------------------------- */
/*                            delete by name method                           */
/* -------------------------------------------------------------------------- */
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
        log.info(`[${req.method} ${req.url}]`);
        res.send(message.success.delete);
        });
};

/* -------------------------------------------------------------------------- */
/*                             delete by id method                            */
/* -------------------------------------------------------------------------- */
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
        log.info(`[${req.method} ${req.url}]`);
        res.send(message.success.delete);
        });
};

/* -------------------------------------------------------------------------- */
/*                           delete by email method                           */
/* -------------------------------------------------------------------------- */

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
        log.info(`[${req.method} ${req.url}]`);
        res.send(message.success.delete);
        });
};


/* -------------------------------------------------------------------------- */
/*                          register method                                   */
/* -------------------------------------------------------------------------- */


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


/* -------------------------------------------------------------------------- */
/*                          get user by email method                          */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                                login method                                */
/* -------------------------------------------------------------------------- */


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

 /* -------------------------------------------------------------------------- */
 /*                               logOut method                                */
 /* -------------------------------------------------------------------------- */
exports.logOut=(req,res,table)=>{
  const {email}=req.body;
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
