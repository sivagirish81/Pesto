var express = require('express');
var cors = require('cors');
var url = require('url');
var mysql = require('mysql');
var app = express();
app.use(cors());

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '....',
	database: 'pesto'
});

connection.connect();



app.get('/', function (req, res) {
    console.log("Received Request");
    let q = url.parse(req.url, true);
    var qdata = q.query;
    console.log(qdata.name);

	connection.query("select pestos from user_pestos where username=\"" + qdata.name + "\"" , function(err, rows, fields){
		if(err) throw err;
		console.log(JSON.stringify(rows[0]));
		res.send(JSON.stringify(rows[0]));
	}); 

;})


var server = app.listen(2000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("app listening at http://%s:%s", host, port);
})
