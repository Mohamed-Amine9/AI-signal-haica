const path = require('path');
const central = require(path.join(__dirname, 'centralController'));
const log = require(path.join(__dirname, '..', 'log', 'logger'));

const table={
name:"user"
};

exports.register=(req,res)=>{
  central.signUp(req, res, table.name);
};

exports.login=(req,res)=>{
    central.loginUser(req,res,table.name);
    log.info(`[${req.method} ${req.url}]`);
};

exports.logOut=(req,res)=>{
  central.logOut(req,res,table.name);
  log.info(`[${req.method} ${req.url}]`);
};

