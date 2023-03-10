const jwt = require("jsonwebtoken");
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'default'));

function generateToken(user) {
    const payload = {
      sub: user.user_id,
      email: user.email
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
    return token;
};


function generateRefreshToken(user) {
    const payload = {
      sub: user.user_id,
      email: user.email
    };
     const refreshToken = jwt.sign(payload, config.jwtRefresh, { expiresIn: config.jwtRefreshExpiration });

    return refreshToken;
  }
  
  module.exports = {
    generateToken,
    generateRefreshToken,
  };