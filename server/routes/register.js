module.exports = function (app, fs) {
    app.get('/api/reg', (req, res) => {
      var isUser = 0;
      var userObj;
      var uname = req.query.username;
      var uemail = req.query.email;
      var urole = req.query.role;
  
      fs.readFile('authdata.json', 'utf-8', function (err, data) {
        console.log(uname);
        console.log(uemail);
        console.log(urole);
        if (err) {
          console.log(err);
        } else {
          userObj = JSON.parse(data);
          for (let i = 0; i<userObj.length; i++) {
            if (userObj[i].name == uname) {
              isUser = 1
            }
          }
          if (isUser > 0) {
            res.send({ 'username': '', 'success': false });
          } else {
            userObj.push({ 'name': uname, 'email': uemail, 'role': urole });
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send({ 'username': uname, 'success': true });
            });
          }
        }
      });
    });
  }
  