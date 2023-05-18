const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const message = require(path.join(__dirname, '..', 'config', 'messages'));
const bcrypt = require('bcrypt');
const { createSession, deleteSessionById, getSessionByRefreshToken } = require(path.join(__dirname, 'session'));
const { generateToken, generateRefreshToken,logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));



/* -------------------------------------------------------------------------- */
/*                               get all method                               */
/* -------------------------------------------------------------------------- */

exports.getAll = async (req, res, table) => {
  const query = "SELECT * FROM " + table;
  connection.query(query, (err, rows) => {
      if (err) { 
          console.error(err.message);
          return res.status(500).send(message.error.serverError);
      }
      if (!rows) {
          console.error(message.error.notFound+" "+ table);
          return res.status(404).send(message.error.notFound);
      }
      logs(req);
      console.log(rows)
      // Render the index.ejs template and pass data to the admins partial
      if(table==="signals"){
        return res.render('../views/index.ejs', { content: '../views/pages/signals', data: rows });
      }
      return res.render('../views/index.ejs', { content: '../views/pages/'+table+'s', data: rows });

     
  });
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
      logs(req);
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
      logs(req);
      res.status(400).json(rows);
    })
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
      logs(req);
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
        logs(req);
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
        logs(req);
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
        logs(req);
        res.send(message.success.delete);
        });
};



/* -------------------------------------------------------------------------- */
/*                          get user by email method                          */
/* -------------------------------------------------------------------------- */
function getUserByEmail(email,table) {
  console.log(email,table)
      return new Promise((resolve, reject) => {
        const query ="SELECT * FROM "+table+" WHERE email = ?";
        console.log(query)
        connection.query(query, [email], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          console.log(results)
          if (results.length === 0) {
            resolve(results)
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


exports.loginUser = (req, res, tables) => {
  const { email, password } = req.body;
  return new Promise(async (resolve, reject) => {
    let foundUser = null;
    let session=null;

    for (const table of tables) {
      try {
        const user = await getUserByEmail(email, table.name);
        if (user) {
          foundUser = user;
          session=table.sessionId;
          break;
        }
      } catch (err) {
        reject(err);
        return;
      }
    }
    if (!foundUser) {
      resolve(null);
      return;
    }

    bcrypt.compare(password, foundUser.password, (err, result) => {
      console.log(password+"========"+foundUser.password)
      console.log("=========="+result)
      if (err) {
        reject(err);
        return;
      }

      if (result) {
        resolve(null);
        return;
      }

      const token = generateToken({ id: foundUser.id, email });
      const refreshToken = generateRefreshToken({ id: foundUser.id, email });
      createSession(foundUser.id, refreshToken, session)
        .then((sessionId) => {
          resolve({
            id: foundUser.id,
            email: foundUser.email,
            token,
            refreshToken,
            sessionId,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

 /* -------------------------------------------------------------------------- */
 /*                               logOut method                                */
 /* -------------------------------------------------------------------------- */
exports.logOut=(req,res,table,session)=>{
  const {email}=req.body;
  console.log("first")
  getUserByEmail(email,table)
  .then((user) => {
    if (!user) {
      resolve(null);
      return;
    }

    console.log('hola');
    deleteSessionById(user.id,session)
    .then(() => {
      res.status(200).send({ message: 'Logout successful' });
    })
    .catch((err) => {
      console.error(`Error during logout: ${err}`);
      res.status(500).send({ error: 'Internal server error' });
    });
  })}
