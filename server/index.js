const express = require("express");
const path = require('path');
const helmet = require("helmet");
const app = express();
const cors=require("cors");
const bodyParser = require('body-parser');
const db = require(path.join(__dirname, 'src', 'config', 'default'));


let dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname, 'src', 'config', '.env')})


app.use(cors());
app.use(express.json());



app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://kit.fontawesome.com',
        'https://buttons.github.io',
      ],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      mediaSrc: ["'self'", "https://radio.shemsfm.net",
      "https://live.ifm.tn/radio/8000/ifmlive?1585267848",
    "https://stream.radiozitouna.tn/radio/8030/radio.mp3",
  "https://radio.mosaiquefm.net/mosalive",
"https://streaming2.toutech.net/jawharafm",
"http://rtstream.tanitweb.com/nationale",
"https://expressfm.ice.infomaniak.ch/expressfm-64.mp3",
"http://streaming.knoozfm.net:8000/knoozfm",
"http://rtstream.tanitweb.com/sfax",
"https://stream6.tanitweb.com/sabrafm",
"https://www.dailymotion.com/embed/video/x7va0xb?autoPlay=1"],
    },
  })
);



  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  const usersRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "userRoutes"
  ));
  const postsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "postsRoutes"
  ));
  const radiosRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "radiosRoutes"
  ));
  const chanelsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "chanelsRoutes"
  ));
  const signalsRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "signalsRoutes"
  ));
  const adminRoutes = require(path.join(__dirname, "src","Routes","adminRoutes"));
  const super_adminRoutes = require(path.join(
    __dirname,
    "src",
    "Routes",
    "super_adminRoutes"
  ));


  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname,'src' ,'views'));
  app.use(express.static(path.join(__dirname, 'src', 'assets')));


  app.use("/", usersRoutes);
  app.use("/", postsRoutes);
  app.use("/", radiosRoutes);
  app.use("/", chanelsRoutes);
  app.use("/", signalsRoutes);
  app.use("/", adminRoutes);
  app.use("/", super_adminRoutes);


     


  app.listen(process.env.PORT, () => {
    console.log("Server running on port ",process.env.PORT);
   });