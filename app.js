// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

let PORT = process.env.PORT || 3000;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp api endpoint
app.get("/api/timestamp/:date?", function (req, res) {
  if(Number(req.params.date)) {

    let date = new Date(parseInt(req.params.date));
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else if(req.params.date) {

    date = new Date(req.params.date);
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }

});



// listen for requests :)
app.listen(PORT, function () {
  console.log('Your app is listening on port ', PORT);
});
