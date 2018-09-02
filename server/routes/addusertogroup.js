module.exports = function (app, fs) {
    app.get('/api/addusertogroup', (req, res) => {
      var isGroup = 0;
      var roomObj;
      var rname = req.query.roomname;
      var uname = req.query.username;
      var userAdded = false;
      var isUser = 0;
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              for (let k = 0; k < roomObj[i].user.length; k++) {
                if (roomObj[i].user[k] == uname) {
                  isUser = 1
                  break;
                }
              }
              if (isUser > 0) {
                console.log('user already exist in group');
              } else {
                roomObj[i].user.push(uname);
                userAdded = true;
                break;
              }
            } 
          }
          if (userAdded == true) {
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          } else {
            res.send(false);
          }
        }
      });
    });
  }
  