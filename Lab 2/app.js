var express = require('express')
var os = require("os");
var hostname = os.hostname();
var app = express()
var startTime = Date.now()

var delay = 10000 + Math.floor(Math.random() * 5000)

Array.prototype.choice = function () {
  return this[Math.floor(Math.random() * this.length)]
}

var quotes = [
  '“Run, Forrest! Run!” – Jenny', 
  '“You have to do the best with what God gave you.” – Mrs. Gump',
  '"Dear God, make me a bird. So I could fly far. Far far away from here." – Young Jenny', 
  '“Stupid is as stupid does.” – Forrest', 
  '"I\'m not a smart man. But I *know* what love is." – Forrest'
]

app.get('/', function(req, res) {
  res.send('Somebody lagging in ' + hostname + ' says: '+ quotes.choice() +'\n')
})

app.get('/healthz', function(req, res) {
  if ((Date.now() - startTime) > delay) {
    res.status(500).send({
      error: 'Timeout, Health check error!'
    })
  } else {
    res.send('OK!')
  }
})

app.listen(8080, function() {
  console.log('Sample app is listening on port 8080.')
})
