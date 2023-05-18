const path = require('path');
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));

const table={
name:"user"
};


exports.login=  async(req,res)=>{
  try {
    logs(req);
    const t = await central.loginUser(req,res,table.name);
    console.log(t);
    res.json(t)

  } catch (error) {
    
    res.json(error)

  }
};

exports.logOut=(req,res)=>{
  central.logOut(req,res,table.name);
  logs(req);
};

