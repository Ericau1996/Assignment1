module.exports = function (app, fs) {
    app.get('/api/room', (req, res) => {
      var isUser = 0;
      var userObj;
      var uname = req.query.username;
      var userDeleted = false;
  
      fs.readFile('roomdata.json', 'utf-8', function (err, data) {
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
              userObj.splice(i, 1);
              isUser = 2
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "groupAdmin" && urole != "groupAdmin" && urole != "delete user"){
              userObj.splice(i, 1);
              isUser = 2
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "user" && urole != "user" && urole != "delete user"){
              userObj.splice(i, 1);
              isUser = 2
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role == "delete user" && urole != "delete user"){
              userObj.splice(i, 1);
              isUser = 0
            }else if (userObj[i].name == uname && userObj[i].email == uemail && userObj[i].role != "delete user" && urole == "delete user"){
              userObj.splice(i, 1);
              isUser = 4
            }else if (userObj[i].name == uname && userObj[i].email != uemail&& urole != "delete user") {
              isUser = 3
            }
          }
          if (isUser ==1) {
            res.send(false);
          } else if (isUser == 2){
            userObj.push({ 'name': uname, 'email': uemail, 'role': urole });
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          } else if (isUser == 0){
            userObj.push({ 'name': uname, 'email': uemail, 'role': urole });
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          }else if (isUser == 3){
            res.send(false);
          }else if (isUser == 4){
            var newdata = JSON.stringify(userObj);
            fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(false);
            });
          }
        }
      });
    });
  }
  