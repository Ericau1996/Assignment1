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
            if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == urole) {
              isUser = 1
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "superAdmin" && urole !="superAdmin" && urole != "delete user"){
              isUser = 2
              userObj[i].name="user updated";
              userObj[i].email="user updated";
              userObj[i].role="user updated";
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "groupAdmin" && urole != "groupAdmin" && urole != "delete user"){
              isUser = 2
              userObj[i].name="user updated";
              userObj[i].email="user updated";
              userObj[i].role="user updated";
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "user" && urole != "user" && urole != "delete user"){
              isUser = 2
              userObj[i].name="user updated";
              userObj[i].email="user updated";
              userObj[i].role="user updated";
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "delete user" && urole != "delete user"){
              isUser = 2
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role != "delete user" && urole == "delete user"){
              isUser = 2
              userObj[i].name="user deleted";
              userObj[i].email="user deleted";
              userObj[i].role="user deleted";
            }
          }
          if (isUser ==1) {
            res.send({ 'username': '', 'success': false });
          } else if (isUser == 2){
            userObj.push({ 'name': uname, 'email': uemail, 'role': urole });
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send({ 'username': uname, 'updated success': true });
            });
          } else if (isUser == 0){
            userObj.push({ 'name': uname, 'email': uemail, 'role': urole });
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send({ 'username': uname, 'Created success': true });
            });
          }
        }
      });
    });
  }
  