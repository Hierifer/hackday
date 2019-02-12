var connection = require(‘../connection’);
 
function Register() {
	//GET #RETRIEVE DATA
	this.get = function(res) {
    	connection.acquire(function(err, con) {
      		con.query('select * from users where id = ?',[data.id] function(err, result) {
        		con.release();
        		res.send(result);
      		});
    	});
  	};

  	//CREATE / PUT # CREATE NEW TABLE ENTRY (NEW PROJECTS)
  	this.create = function(data, res) {
    	connection.acquire(function(err, con) {
      	con.query('insert into users set ?', data, function(err, result) {
        	con.release();
        	if (err) {
          	res.send({status: 1, message: 'TODO creation failed'});
        	} else {
          	res.send({status: 0, message: 'TODO created successfully'});
        	}
      	});
    	});
  	};

  	//UPDATE #MODIFY EXISTING DATA
  	this.update = function(data, res) {
    	connection.acquire(function(err, con) {
      		con.query('update users set ? where id = ?', [data, data.id], function(err, result) {
        		con.release();
        		if (err) {
          		res.send({status: 1, message: 'TODO update failed'});
        		} else {
          		res.send({status: 0, message: 'TODO updated successfully'});
        		}
      		});
    	});
  	};

  	//DELETE # DELETING DATA (OPTIONAL)
  	this.delete = function(id, res) {
    	connection.acquire(function(err, con) {
      		con.query('delete from users where id = ?', [id], function(err, result) {
        		con.release();
        		if (err) {
          		res.send({status: 1, message: 'Failed to delete'});
        		} else {
          		res.send({status: 0, message: 'Deleted successfully'});
        		}
      		});
    	});
  	};

}
module.exports = new Register();
