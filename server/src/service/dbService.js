const mysql = require('mysql2');
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'default'));


const connection = mysql.createConnection({
    
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    jwtSecret:config.jwtSecret,
    jwtExpiration:config.jwtExpiration,
    jwtRefresh:config.jwtRefresh,
    jwtRefreshExpiration:config.jwtRefreshExpiration
  });

  connection.connect((err) => {
    
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

  const user=`
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) ,
  lastName VARCHAR(255) ,
  email VARCHAR(255) ,
  age INT ,
  gender ENUM('male', 'female', 'other') DEFAULT 'other',
  password VARCHAR(255),
  refresh_token VARCHAR(255)

)`;
const admin=`
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) ,
  lastName VARCHAR(255) ,
  email VARCHAR(255) ,
  role ENUM('gerer_users','gerer_chaines&radios','consulter_signales') ,
  password VARCHAR(255) NOT NULL

)`;
const super_admin=`
CREATE TABLE IF NOT EXISTS super_admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) ,
  lastName VARCHAR(255) ,
  email VARCHAR(255) ,
  age INT ,
  gender ENUM('male', 'female', 'other') DEFAULT 'other',
  password VARCHAR(255) NOT NULL

)`;



const radio=`
CREATE TABLE IF NOT EXISTS radio(
  radio_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255) ) 
  `;

  const chanel=`
CREATE TABLE IF NOT EXISTS chanel (
  chanel_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255) NOT NULL)`;

  const signals=`
  CREATE TABLE IF NOT EXISTS Signals(
  signal_id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(255) ,
  description VARCHAR(255) )`;

  const post=`
  CREATE TABLE IF NOT EXISTS post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    description VARCHAR(255),
    imageUrl VARCHAR(255),
    videoUrl VARCHAR(255) )
    `;
   const session=`
   CREATE TABLE IF NOT EXISTS session (
    session_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    super_admin_id INT,
    refresh_token VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE,
    FOREIGN KEY (super_admin_id) REFERENCES super_admin(id) ON DELETE CASCADE
  );`;
  connection.query(user, (err, result) => {
    if (err) throw err;
    
  });
  connection.query(admin, (err, result) => {
    if (err) throw err;
   
  });
  connection.query(super_admin, (err, result) => {
    if (err) throw err;
    
  });
  connection.query(radio, (err, result) => {
    if (err) throw err;
   
  });
  connection.query(chanel, (err, result) => {
    if (err) throw err;
   
  });
  connection.query(post, (err, result) => {
    if (err) throw err;
   
  });
  connection.query(signals, (err, result) => {
    if (err) throw err;
    
  });
  connection.query(session, (err, result) => {
    if (err) throw err;
   console.log('🔥🔥')
  });
  

  module.exports=connection;