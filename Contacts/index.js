var express = require('express');
var cors = require('cors');
var mysql = require('mysql')
var url = require('url')

var app = express();


app.use(cors());


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '....',
	database: 'reactdb'
});

connection.connect();



app.get('/', function(req, res){

	var q = url.parse(req.url, true);
	var get_params = q.query;

	connection.query("select * from contacts where id=" + get_params.id , function(err, rows, fields){
		if(err) throw err;
		console.log(JSON.stringify(rows[0]));
		res.send(JSON.stringify(rows[0]));
	}); 	


});

app.listen(3000);