var register = require('./models/register');
 
module.exports = {
  configure: function(app) {
    app.get('/register/', function(req, res) {
      register.get(res);
    });
 
    app.post('/register/', function(req, res) {
      register.create(req.body, res);
    });
 
    app.put('/register/:id/', function(req, res) {
      register.update(req.params.id, res);
    });
    //No design for deleting a project from Database (Optional)
    app.delete('/register/:id/', function(req, res) {
      register.delete(req.params.id, res);
    });
  }
};

// var projects = require('./models/projects');
 
// module.exports = {
//   configure: function(app) {
//     app.get('/projects/', function(req, res) {
//       projects.get(res);
//     });

//     app.get('/projects/:id/', function(req, res) {
//       projects.get(req.params.id, res);
//     });
 
//     app.delete('/projects/:id/', function(req, res) {
//       hackday.delete(req.params.id, res);
//     });
//   }
// };

// var grades = require('./models/grades');
 
// module.exports = {
//   configure: function(app) {
//     app.get('/register/', function(req, res) {
//       grades.get(res);
//     });
 
//     app.post('/register/', function(req, res) {
//       grades.create(req.body, res);
//     });
 
//     app.put('/register/:id/', function(req, res) {
//       grades.update(req.params.id, res);
//     });
 
//     app.delete('/register/:id/', function(req, res) {
//       grades.delete(req.params.id, res);
//     });
//   }
// };