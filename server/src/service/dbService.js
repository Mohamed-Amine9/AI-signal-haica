const mysql = require('mysql2');
const config = require('../config/default');

const connection = mysql.createConnection({
    
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    jwtSecret:config.jwtSecret,
    jwtRefreshKey:config.jwtRefreshKey
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
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age INT ,
  gender ENUM('male', 'female', 'other') DEFAULT 'other',
  role ENUM('super_admin', 'admin', 'user') DEFAULT 'user',
  password VARCHAR(255) NOT NULL

)`;
const admin=`
CREATE TABLE IF NOT EXISTS admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) ,
  lastName VARCHAR(255) ,
  email VARCHAR(255) ,
  role ENUM('gerer_users','gerer_chaines&radios','consulter_signales') ,
  password VARCHAR(255) NOT NULL

)`;
const super_admin=`
CREATE TABLE IF NOT EXISTS super_admin (
  superAdmin_id INT AUTO_INCREMENT PRIMARY KEY,
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
  CREATE TABLE IF NOT EXISTS signals (
  signal_id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE ,
  description VARCHAR(255) )`;

  const post=`
  CREATE TABLE IF NOT EXISTS post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    description VARCHAR(255),
    imageUrl VARCHAR(255),
    videoUrl VARCHAR(255) )
    `;
  connection.query(user, (err, result) => {
    if (err) throw err;
    console.log('Table users created');
  });
  connection.query(admin, (err, result) => {
    if (err) throw err;
    console.log('Table admin created');
  });
  connection.query(super_admin, (err, result) => {
    if (err) throw err;
    console.log('Table super_admin created');
  });
  connection.query(radio, (err, result) => {
    if (err) throw err;
    console.log('Table radios created');
  });
  connection.query(chanel, (err, result) => {
    if (err) throw err;
    console.log('Table chanels created');
  });
  connection.query(post, (err, result) => {
    if (err) throw err;
    console.log('Table posts created');
  });
  connection.query(signals, (err, result) => {
    if (err) throw err;
    console.log('Table signal created');
  });
  

  module.exports=connection;