const { json } = require('body-parser');
const path = require('path');
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const radios = require(path.join(__dirname, '..', 'Controllers', 'radios'));
const signals = require(path.join(__dirname, '..', 'Controllers', 'signals'));



exports.login = async (req, res) => {
    try {
      logs(req);
      const tables = [
          { name: "admin", sessionId: "admin_id" },
          { name: "super_admin", sessionId: "super_admin_id" },
      ];
      const user = await central.loginUser(req, res, tables);
     
      if (user !== null) {
        console.log(user.id)
        req.session.Id=user.id;
        req.session.token = user.token;
        req.session.status=200;
        req.session.userType = req.session.userType;
        const dataFetchers = {
          'admin': radios.getRadios,
          'super_admin': signals.getSignals,
        };
  
        if(dataFetchers[req.session.userType]) {
          const data = await dataFetchers[req.session.userType](req, res);
          req.session.data = data;
        } else {
          req.session.status=401;
          throw new Error('Invalid user type');
        }
      } else {
        req.session.status=401;
        throw new Error('Authentication failed');
      }
    } catch (error) {
      req.session.status=401;
      res.status(401).json({ error: 'Authentication failed' });
    }
  };



  exports.logOut=(req,res)=>{
    central.logOut(req,res);
    logs(req);
  };
  