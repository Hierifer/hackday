var express = require('express');
const React = require('react');
const ReactDOM = require('react-dom');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/loginprocess', function (req, res) {

  var lp = require('./public/js/loginprocess')
  var role = "p";

  if(req.query.role){
    role = req.query.role;
  }

  var user = {
    email:req.query.email,
    role: role,
    magiclink: lp.auto_generator_magiclink(),
  };

  if(lp.mysql_signin(user) != 0){
    if(lp.email_generator(user) != 0){
      res.write("email already sent");
      res.end();
    }else{
      res.write("email generator failed");
      res.end();
    }
  }else{
      res.write("mysql failed in sigin");
      res.end();    
  }
})

app.get('/urlprocess', function (req, res) {
  var lp = require('./public/js/loginprocess')
  var key = req.query.key;
  var email = "";
  var mysql = require('mysql');
  var connection = lp.mysql_login(mysql);
  var callback = function(email) {
      user = {
        email: email,
        key: key,
      };
      if(user.email == -1){
        console.log("invalid magiclink");
      } else {
        res.cookie(user.email);
        console.log(user.email+"successful");
        res.redirect('http://127.0.0.1:8081/home');
      }
  }

  connection.query('SELECT * from users where magiclink = \''+key+'\';', function (error, rows, fields) {
    if (error) console.log(error);

    if (rows.length == 1){
      connection.end();
      email = rows[0].email;
      callback(email);
    } else {
      connection.end();
      console.log("invalid key");
      res.write("invalid key");
      res.end();
      email = -1;
    }
  });
})

app.get('/grade', function(req, res){
  res.sendFile( __dirname + "/" + "grade.html" );
})

app.get('/home', function(req, res){
  res.sendFile( __dirname + "/" + "home.html" );
})

app.get('/hackathon', function(req, res){
  res.sendFile( __dirname + "/" + "hackathon.html" );
})

app.get('/winner', function(req, res) {
  res.sendFile( __dirname + "/" + "winner.html" );
})

app.get('/admin', function(req, res) {
  res.sendFile( __dirname + "/" + "admin.html" );
})

app.get('/register', function (req, res, next) {
	res.sendFile( __dirname + "/" + "register.html" );
})

app.get('/home_table', function (req, res, next) {

	var email = req.query.email;
	var mysql      = require('mysql');
  var connection = mysql_login(mysql);
  
  connection.query('SELECT * from users where email = \''+email+'\';', function (error, rows, fields) {
    if (error){
    	console.log('commentline error' + err.stack); 
    	return 0;
    }

    if (rows.length == 1){
    	res.write("<table>");
    	for(var i = 0; i < rows.length; i++){
    		res.write("<tr><td><b>" + rows[i].email + "</b></td>");
  		res.write("<td>" + rows[i].role + "</td></tr>");
    	}
    	res.write("</table>")
  	res.end();
    }
    connection.end();
  });

})
app.get('/user_table', function (req, res, next) {

  var email = req.query.email;


  var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '138.68.46.165',
        user     : 'usf',
        password : 'usfca',
        database : 'hackday'
    });

    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return 0;
        }
    })

    console.log(email);

    connection.query('SELECT * from users', function (error, rows, fields) {
      if (error){
        console.log('commentline error' + err.stack); 
        return 0;
      }

      if (rows.length == 1){
        res.write("<table>");
        res.write("<tr><th>Email</th><th>MagicLink</th><th>Role</th><th>Project Host</th><th>Project Memo</th></tr>");
        for(var i = 0; i < rows.length; i++){
          res.write("<tr><td>" + rows[i].email + "</td>");
          res.write("<td>" + rows[i].magiclink + "</td>");
          res.write("<td>" + rows[i].role + "</td>");
          res.write("<td>" + rows[i].project_host + "</td>");
          res.write("<td>" + rows[i].project_mem + "</td></tr>");
        }
        res.write("</table>")
      res.end();
      }
      connection.end();
    });
    
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.write("404: NOT FOUND THIS PAGE");
  res.end();
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
