var express = require('express');
const React = require('react');
const ReactDOM = require('react-dom');
var cookieParser = require('cookie-parser');

var app = express();
var lp = require('./public/js/loginprocess');
var mysql = require('mysql');

app.use(cookieParser());
app.use(express.static('public'));

app.get('/1234', function (req, res){
	console.log("login");
});



app.get('/urlprocess', function (req, res) {
	var magiclink = req.query.magiclink;
	var role = req.query.role;
	var email = "";

	var connection = lp.mysql_login(mysql);

	var callback = function(email) {
		if(email == -1){
			console.log("invalid magiclink");
		} else {
			res.cookie('email',email,{maxAge:800000, httpOnly:true});
			console.log(email + "successfully login");
			res.redirect('/home.html?' + email);
		}
	}

	if(role == "p"){
	    connection.query('SELECT * from participant where magiclink = \''+ magiclink +'\';', function (error, rows, fields) {
	    if (error){
          console.log(error);
          callback(0);
        }

	    if (rows.length == 1){
	      connection.end();
	      email = rows[0].email;
	      callback(email);
	    } else {
	      connection.end();
	      res.redirect('/message.html?err='+ 'invalid magiclink');
	    }
	    });
	} else {
	    connection.query('SELECT * from judge where magiclink = \''+ magiclink +'\';', function (error, rows, fields) {
	    if (error){
          console.log(error);
          callback(0);
        }

	    if (rows.length == 1){
	      connection.end();
	      email = rows[0].email;
	      callback(email);
	    } else {
	      connection.end();
	     res.redirect('/message.html?err='+ 'invalid magiclink');
	    }
	  });
	}
});

app.get('/post_gradelist', function (req, res){
	console.log(req.query.email);
	if(req.query.email){
		console.log(req.query.email);
		res.send(JSON.stringify(1));
		return;
	}else{
		console.log("invalid");
		res.send(JSON.stringify(0));
		return;
	}
});

app.get('/setcookie', function (req, res){
	res.cookie('email','hierifer@hotmail.com',{maxAge:800000, httpOnly:true});
	res.redirect('/grade.html?email=hierifer@hotmail.com');
});

app.get('/getcookie', function (req, res){
	res.send(req.cookies.email);
	res.end();
});

app.get('/logprocess', function (req, res){
	var role = "p";

	if(req.query.role){
		role = req.query.role;
	}

	if(!req.query.email){
		console.log("shdiuagfhboewuhgbfoiwehnbogihnbwohegnegpiew");
		res.redirect("/index.html?err=bad_login");
		return 0;
	}
	console.log("already in");
	var user = {
		email : req.query.email,
		magiclink : lp.auto_generator_magiclink(),
		role : role,
	};

	var callback = function(result) {
	    if(result == 1){
	      if(lp.email_generator(user) == 0){
	        console.log('failed');
	        res.redirect('/message.html?err='+ 'emailsender_fail');
	        return;
	      }else{
	        console.log('send');
	        res.redirect('/message.html?message='+ 'Email Already Sent');
	        return;
	      }
	    }else if(result == 0){
	      console.log('failed');  
	      res.redirect('/message.html?err='+ 'mysql_fail');  
	      return;  
	    }else if(result == -1){
	      console.log('failed');
	      res.redirect('/index.html?err='+ 'judge_Need_Permission_From_Your_Admin');
	      return;
	    }
	}

	//Login to DB
	var connection = lp.mysql_login(mysql);

	if(user.role == "p"){
      connection.query('SELECT * from participant where email = \''+user.email+'\';', function (error, rows, fields) {
        if(error){
          console.log(error);
          callback(0);
        }

        if (rows.length != 0){
          connection.query('UPDATE participant SET magiclink= \''+user.magiclink+'\' WHERE email=\''+user.email+'\';', function (error, results, fields) {
          if(error){
            console.log(error);
            callback(0);
          }
          console.log(user.email + ' Login');
          connection.end();
          callback(1);
          });
        } 
        else {
          connection.query('INSERT INTO participant (email,magiclink) values (\''+user.email+'\', \''+user.magiclink+'\');', function (error, results, fields) {
          if(error){
            console.log(error);
            callback(0);
          }
          console.log(user.email + ' signin');
          connection.end();
          callback(1);
          });
        }
      });
    }
    else {
        connection.query('SELECT * from judge where email = \''+user.email+'\';', function (error, rows, fields) {
        if (error){
          console.log(error);
          callback(0);
        }

        if (rows.length != 0){
          connection.query('UPDATE participant SET magiclink= \''+user.magiclink+'\' WHERE email=\''+user.email+'\';', function (error, results, fields) {
            if (error){
              console.log(error);
              callback(0);
            }
            console.log(user.email + ' Login');
            connection.end();
            callback(1);
          });
        }
        else{
          callback(-1);         
        }
      });
    }
});

app.post('/post_register', function (req, res){
	var emails = req.query.email;
	var parsed_emails = emails.split(", ")
	//TODO CONDITIONAL IF THE DATA IS ALREADY EXIST (UPDATE)
	for(var i = 0; i < parsed_emails.length ; i++){
		connection.query('INSERT INTO pp (email,title) values (\''+parsed_emails[i]+'\', \''+req.query.title+'\');', function (error, results, fields) {
          	if(error){
            	console.log(error);
          	}
          	connection.end();
          //callback(1);
          	});
	}
	connection.query('INSERT INTO project (title,description,video,repo,demo,creativity,impact,viability) values (\''+req.query.title+'\', \''+req.query.description+'\', \''+req.query.video+'\', \''+req.query.repo+'\', \''+req.query.demo+'\', \'0\',\'0\',\'0\');', function (error, results, fields) {
          if(error){
            console.log(error);
          }
          connection.end();
          //callback(1);
          });
});

app.get('/get_register', function(req, res, next){
	var title_get = req.query.title;

	//fetch from mysql
	var datalist = [];
	var connection = lp.mysql_login(mysql);
	var callback = function(){
		res.send(JSON.stringify(datalist));
		res.end();
		return;		
	}
	//TODO PUTTING EMAILS INTO THE FORM BY GRABBING FROM PP TABLE
	//should be for HOME
	// connection.query('SELECT * from pp where email = \''+ email_get +'\' AND title = \''+ title_get +'\';', function (error, rows, fields) {
	// 	if(error){
	// 		err[0] = '/message.html?err='+ 'mysql_fail_on_grading';
	// 		res.send(JSON.stringify(err));
	// 		res.end();
	// 		return;
	// 	}	

	for(var i = 0; i < rows.length ; i++){

	    	connection.query('SELECT * from project where title = \''+ title_get +'\';', function (error, rows, fields) {
			    if(error){
					err[0] = '/message.html?err='+ 'mysql_fail_on_taking_registration';
					res.send(JSON.stringify(err));
					res.end();
					return;
				}
				
	    		datalist[datalist.length] = rows[0].title;
	    		datalist[datalist.length] = rows[0].description;
	    		datalist[datalist.length] = rows[0].video;
	    		datalist[datalist.length] = rows[0].repo;
	    		datalist[datalist.length] = rows[0].demo;

	    		if(datalist.length == rows.length  * 5){
	    			callback();
	    		}
	    		});
	    }

	}); 
});

app.get('/get_gradelist', function(req, res, next){
	var email_get = req.query.email;
	var email_cookie = "hierifer@hotmail.com";
    var err = [];
	// check cookie is correct set
	if(email_cookie == ""){
		err[0] = '/index.html?err=not_login';
		res.send(JSON.stringify(err));
		res.end();
		return;
	}

    
	// check the consistent of get and cookie
	if(email_cookie != email_get){
		err[0] = '/message.html?err=bad_url --'+email_get;
		res.send(JSON.stringify(err));
		res.end();
		return;
	}

	//fetch from mysql
	var datalist = [];
	var connection = lp.mysql_login(mysql);
	var callback = function(){
		res.send(JSON.stringify(datalist));
		res.end();
		return;		
	}

	connection.query('SELECT title from grading where email = \''+ email_get +'\' AND status = \'v\';', function (error, rows, fields) {
		if(error){
			err[0] = '/message.html?err='+ 'mysql_fail_on_grading';
			res.send(JSON.stringify(err));
			res.end();
			return;
		}	

	    for(var i = 0; i < rows.length ; i++){

	    	connection.query('SELECT * from project where title = \''+ rows[i].title +'\';', function (error, rows2, fields) {
			    if(error){
					err[0] = '/message.html?err='+ 'mysql_fail_on_grading';
					res.send(JSON.stringify(err));
					res.end();
					return;
				}
				
	    		datalist[datalist.length] = rows2[0].title;
	    		datalist[datalist.length] = rows2[0].description;
	    		datalist[datalist.length] = rows2[0].video;
	    		datalist[datalist.length] = rows2[0].repo;
	    		datalist[datalist.length] = rows2[0].demo;

	    		if(datalist.length == rows.length  * 5){
	    			callback();
	    		}
	    		
	    	});
	    }

	}); 
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.write("404: NOT FOUND");
  res.end();
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
