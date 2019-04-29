const express = require('express');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fileType = require('file-type');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
var mysql = require('mysql');
var multer  = require('multer');
const crypto = require('crypto');
const cookie = require('cookie');
const asyncMiddleware = require('./utils/asyncMiddleware');
const pool = require('./utils/database')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imagepath = __dirname + '/assets/';

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    var username = (req.user)? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// get info about the images, push it to client
app.get('/app/images', asyncMiddleware(async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM guns');
    let imageList = [];
    result.forEach((imgData) => {
      imageList.push(imgData);
    });
    res.json({imageList: imageList});
  }
  catch (err){
    res.status(500).end(err);
  }
}));


app.post('/app/login', sanitizeBody('username').escape(), sanitizeBody('password').escape(),
 asyncMiddleware(async (req, res, next) => {
  // sanitize username and password
  try {
    const username = req.body.username;
    const password = req.body.password;
    const availID = await pool.query('SELECT max(AdminID) as max from Admin');
    let maxVal = availID[0].max;
    if (maxVal === null){
      maxVal = 0;
    }
    else {
      maxVal = maxVal + 1;
    }
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    const queryReq = 'INSERT INTO Admin (AdminID, Username, PwHash, salt) VALUES ?';
    const queryVal = [[maxVal.toString(), username, hash, salt]];
    const result = await pool.query(queryReq, [queryVal]);
    console.log(result);
    //console.log('Number of records inserted: ' + result.affectedRows);
    res.json('successful login');
  }
  catch (err){
    console.log(err);
    res.status(500).end(err);
  }
}));

var https = require('https');

app.listen(port, function (err) {
    if (err) console.log(err);
    else console.log("Listening on http://localhost:%s", port);
});