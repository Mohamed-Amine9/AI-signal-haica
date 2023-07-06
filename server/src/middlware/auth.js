const jwt = require("jsonwebtoken");
const path = require('path');
const express = require("express");
const app = express();
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
  

  function requireAuthSuperAdmin(req, res, next) {
    if (!req.session || !req.session.token || req.session.userType!=='super_admin') {
      return res.redirect('/login');
    }
    next();
  }
  function requireAuthAdmin(req, res, next) {
    console.log('-------------------'+req.session.userType)
    if (!req.session || !req.session.token || req.session.userType!=='admin') {
      return res.redirect('/login');
    }
    next();
  }
  function parseLine(line) {
    const parts = line.split(',');
    const date = parts[0];
    const description = parts.slice(1).join(',');
    return { date, description };
}

  module.exports = {
    logs,
    requireSession,
    generateToken,
    generateRefreshToken,
    requireAuthAdmin,
    requireAuthSuperAdmin,
    parseLine
  };