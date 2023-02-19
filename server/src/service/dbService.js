const mysql = require('mysql2');
const config = require('../config/default');

const connection = mysql.createConnection({
    
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    jwtSecret:config.jwtSecret
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

  const users=`
CREATE TABLE IF NOT EXISTS users (
  users_id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age INT ,
  gender ENUM('male', 'female', 'other') NOT NULL DEFAULT 'other',
  role ENUM('super_admin', 'admin', 'user') NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL

)`;
const admins=`
CREATE TABLE IF NOT EXISTS admins (
  users_id INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

)`;
const super_admin=`
CREATE TABLE IF NOT EXISTS super_admin (
  users_id INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender ENUM('male', 'female', 'other') NOT NULL DEFAULT 'other',
  role ENUM('super_admin', 'admin', 'user') NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL

)`;



const radios=`
CREATE TABLE IF NOT EXISTS radios (
  radios_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255) NOT NULL) 
  `;

  const chanels=`
CREATE TABLE IF NOT EXISTS chanels (
  chanels_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255) NOT NULL)`;

  const signals=`
CREATE TABLE IF NOT EXISTS signals (
  signals_id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  description VARCHAR(255) NOT NULL)`;

  const posts=`
  CREATE TABLE IF NOT EXISTS posts (
    posts_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    description VARCHAR(255),
    imageUrl VARCHAR(255),
    videoUrl VARCHAR(255) )
    `;
  connection.query(users, (err, result) => {
    if (err) throw err;
    console.log('Table users created');
  });
  connection.query(admins, (err, result) => {
    if (err) throw err;
    console.log('Table admin created');
  });
  connection.query(super_admin, (err, result) => {
    if (err) throw err;
    console.log('Table super_admin created');
  });
  connection.query(radios, (err, result) => {
    if (err) throw err;
    console.log('Table radios created');
  });
  connection.query(chanels, (err, result) => {
    if (err) throw err;
    console.log('Table chanels created');
  });
  connection.query(posts, (err, result) => {
    if (err) throw err;
    console.log('Table posts created');
  });
  connection.query(signals, (err, result) => {
    if (err) throw err;
    console.log('Table NEWSnotifications created');
  });
  

  module.exports=connection;