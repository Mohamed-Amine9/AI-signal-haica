const path = require('path');
//const cp = require('child_process');
const { spawn,cp } = require('child_process');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const message = require(path.join(__dirname, '..', 'config', 'messages'));
const table = {
  name:"radio",
  id:"radio_id"
}
const redirect=require('../middlware/auth');

//getAll method
exports.getRadios=async(req,res)=>{
  try {
    let radios = await central.getAll(req, res, table.name);
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the radios' });
  }
};  
   


//get By Name method
exports.getRadio=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.getByName(req,res,table.name);
  }
    return central.getById(req,res,table.name,table.id);
};  


exports.addRadio=(req,res)=>{
    const { name,description,url } = req.body;
    
    const sql = "INSERT INTO radio (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      console.log('--------------------------+++++++++++++++'+name)
      if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      logs(req);
      res.redirect('/radios');
    });
};

exports.deleteRadio=(req,res)=>{
  
  if(isNaN(req.params.input)){
    return central.deleteByName(req,res,table.name);
  }
  logs(req);
 return central.deleteById(req,res,table.name,table.id);
  
};

exports.updateRadio=(req, res) => {
  const { id } = req.params;
  const { name,description,url } = req.body;

  const sql = "UPDATE radio SET description=? ,name=?,url=? where radios_id=?";
  connection.query(sql, [name,description,url,id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(message.error.serverError);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send(message.error.notFound+" "+table);
    }
    logs(req);
    res.send(message.success.update);
  });
};

let recorderProcess = null;
exports.startRecording = (req, res) => {
  const outputPath = 'C:/Users/Mohamed/Desktop/liveStream/IFm_Live.mp3'; // update this to your preferred path

  recorderProcess = spawn('C:/Program Files/ffmpeg-2023-06-27-git-9b6d191a66-full_build/ffmpeg-2023-06-27-git-9b6d191a66-full_build/bin/ffmpeg', [
      '-y',
      '-i',
      'https://live.ifm.tn/radio/8000/ifmlive?1585267848',
      outputPath
  ]);

  if (recorderProcess) {
      recorderProcess.on('exit', code => {
          recorderProcess = null;
      });

      res.status(200).send({ status: 'Recording started.' });
  } else {
      res.status(500).send({ status: 'Error starting recording process.' });
  }
};


exports.stopRecording = function(req, res) {
  if (!recorderProcess) {
      console.error("No recording is in progress!");
      res.status(500).json({ error: 'No recording is in progress' });
      return;
  }

  recorderProcess.kill('SIGTERM');
  res.status(200).json({ message: 'Stopped recording' });
}