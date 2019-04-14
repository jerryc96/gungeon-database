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
var upload = multer({ dest: path.join(__dirname, 'assets')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Eaglemust8",
  database: "Gungeon"
});

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

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// multer, image file paths to data, pass it to client
app.get('/app/images', (req, res, next) => {
	con.connect(function(err) {
       if (err) return res.status(500).end('Cannot connect to database');
       con.query("SELECT * FROM guns", function (err, result, fields) {
         if (err) throw err;
         var imageList = [];
         result.forEach((imgData) => {
          imageList.push(imgData);
         });
         con.end();
         res.json({imageList: imageList});

    });
  });
});

app.post('/app/login', sanitizeBody('username').escape(), sanitizeBody('password').escape(),
 (req, res, next) => {
  console.log(req.body);
  // sanitize username and password
  var username = req.body.username;
  var password = req.body.password;
  con.connect(function(err){
    con.query("SELECT max(AdminID) as max from Admin", function(err, result, fields){
      if (err) {
        con.end();
        return res.status(500).end("Cannot issue: SELECT max(AdminID) from Admin" + err);
      }
      else {
        var maxval = result[0].max + 1;
        var salt = generateSalt();
        var query = "INSERT INTO Admin (AdminID, Username, Pw, salt) VALUES ?"
        var queryVal = [[maxval, username, password, salt]];
        console.log(queryVal);
        con.query(query, [queryVal],
         function(err, result, fields){
          // if insert is successful, create a cookie and session for user.
          if (err) {
            return res.status(500).end("Cannot issue: INSERT INTO Admin values" + err);
          };
          console.log("Number of records inserted: " + result.affectedRows);
          con.end();
          res.json("successful login");
         });
      }
    });
  });
});

var https = require('https');

app.listen(port, function (err) {
    if (err) console.log(err);
    else console.log("Listening on http://localhost:%s", port);
});