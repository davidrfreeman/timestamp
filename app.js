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
  let date = req.params.date;

  if(!date) {
    date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  else if (isNaN(date) && new Date(date).toDateString() !== "Invalid Date") {
    date = new Date(date);
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  else if(isNaN(date) === false && new Date(Number(date)).toDateString() !== "Invalid Date") {
    date = new Date(Number(date));
    res.json({
      unix: date.getTime(),
      utc: date.toDateString()
    });
  }

  else {
    res.json({
      unix: "null",
      utc: "null"
    });
  }

});



// listen for requests :)
app.listen(PORT, function () {
  console.log('Your app is listening on port', PORT);
});
