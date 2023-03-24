const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));

function createSession(userId, refreshToken,sessionId) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const createdAt = now.toISOString().slice(0, 19).replace("T", " ");
      const updatedAt = createdAt;

     
       const query="INSERT INTO session ("+sessionId+", refresh_token, created_at, updated_at) VALUES (?, ?, ?, ?)";
      
     console.log(query)
      connection.query(query, [userId, refreshToken, createdAt, updatedAt], (err, result) => {
        
        if (err) {
          
          reject(err);
          return;
        }
        console.log("d5alna")
        resolve(result.insertId);
      });
    });
  }

  function deleteSessionById(id,sessionId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM session WHERE "+sessionId+" = ?";
      connection.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(result.affectedRows);
      });
    });
  }
  
  function getSessionByRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM session WHERE refresh_token = ?";
      connection.query(query, [refreshToken], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
  
        if (results.length === 0) {
          resolve(null);
          return;
        }
  
        const session = results[0];
        resolve(session);
      });
    });
  }
  
  module.exports = {
    createSession,
    deleteSessionById,
    getSessionByRefreshToken,
  };