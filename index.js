var express = require('express');
// var cors = require('cors')
var url = require('url')

var app = express();
// app.use(cors);

app.get('/', function (req, res) {
    console.log("Received Request");
    let q = url.parse(req.url, true);
    var qdata = q.query;
    console.log(qdata.name);
;})


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port);
})
