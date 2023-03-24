const jwt = require("jsonwebtoken");
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'default'));
const {  getSessionByRefreshToken } = require('../Controllers/session');
const log = require(path.join(__dirname, '..', 'log', 'logger'));


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


  const requireSession = async (req, res) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }
  
    const token = authorization.split(' ')[1];
  
    try {
      const session = await getSessionByRefreshToken(token);
  
      if (!session) {
        return res.status(401).send('Unauthorized');
      }
  
      req.session = session;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };

  function logs(req){
    return log.info(`[${req.method} ${req.url}]`);
  }
  module.exports = {
    logs,
    requireSession,
    generateToken,
    generateRefreshToken,
  };