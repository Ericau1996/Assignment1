module.exports = function (app, fs) {
    app.get('/api/deleteuserfromgroup', (req, res) => {
      var roomObj;
      var rname = req.query.roomname;
      var uname = req.query.username;
      var userDeleted = false;
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              for (let k = 0; k < roomObj[i].user.length; k++) {
                if (roomObj[i].user[k] == uname) {
                  console.log('in if statement');
                  for (let j = 0; j < roomObj[i].channel.length; j++) {
                    console.log('in room');
                    for (let x = 0; x < roomObj[i].channel[j].user.length; x++) {
                      console.log('in channel');
                      if (roomObj[i].channel[j].user[x] == uname){
                        roomObj[i].channel[j].user.splice(x,1);
                        console.log('Remove user on channel: ' + roomObj[i].channel[j].channel )
                      } else {
                        console.log('user name:'+roomObj[i].channel[j].user[x]);
                      }
                    }
                  }
                  roomObj[i].user.splice(k, 1);
                  userDeleted = true;
                  break;
                }
              }
            }
          }
          if (userDeleted == true) {
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              console.log('user deleted from channels')
              res.send(true);
            });
          } else {
            res.send(false);
          }
        }
      });
    });
  }
  