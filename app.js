const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();

let PORT = process.env.PORT || 3000;

app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateVal = req.params.date_string;

  let date,
      UTCDate,
      UNIXDate;
  if(Number(dateVal)) {
    UNIXDate = Number(dateVal);
    date = new Date(dateVal);
    UTCDate = date.toUTCString();

  } else {
    UNIXDate = Number(new Date());
    UTCDate =new Date().toUTCString();
  }

  res.json({unix: UNIXDate, utc: UTCDate});
});

app.listen(PORT, () => {
  console.log('Your app is running on port', PORT);
});
