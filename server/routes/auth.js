module.exports = function (app, fs) {
    app.get('/api/auth', (req, res) => {
      var uname = req.query.username;
      var userObj;
      var userRole;
      fs.readFile('authdata.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          userObj = JSON.parse(data);
          for (let i = 0; i < userObj.length; i++) {
            if (userObj[i].name == uname) {
              userRole = userObj[i].role;
              console.log(typeof userRole);
              res.send(userRole);
              return;
            }
          }
          res.send(false);
        }
      });
    });
  }
  