const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fileType = require('file-type');
const app = express();
const port = process.env.PORT || 5000;
var mysql = require('mysql');
//var session = require('express-session');
var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, 'assets')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: ""
});

const imagepath = __dirname + '/assets/';

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

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
app.get('/api/images', (req, res, next) => {
	con.connect(function(err) {
       if (err) return res.status(500).end('Cannot connect to database');
       con.query("SELECT * FROM guns", function (err, result, fields) {
         if (err) throw err;
         var imageList = [];
         result.forEach((imgData) => {
         	imgData.Pathname = imagepath + imgData.Pathname
          //
          if (fs.existsSync(imgData.Pathname)){
            var img = fs.readFileSync(imgData.Pathname);
            var image = new Buffer(img, "binary").toString("base64");
            var mime = fileType(img).mime;
            meta = {mime: mime, encoding: "base64"};
            imageList.push({image:image, meta: meta, imgData:imgData});
          }
         })
         res.json({imageList: imageList});
    });
});
	//res.send({image: IMAGES});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
