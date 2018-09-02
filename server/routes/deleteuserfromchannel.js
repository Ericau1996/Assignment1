module.exports = function (app, fs) {
    app.get('/api/deleteuserfromchannel', (req, res) => {
      var roomObj;
      var rname = req.query.roomname;
      var uname = req.query.username;
      var cname = req.query.channelname;
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
                  for (let j = 0; j < roomObj[i].channel.length; j++) {
                    if (roomObj[i].channel[j].channel == cname) {
                      for (let x = 0; x < roomObj[i].channel[j].user.length; x++) {
                        if (roomObj[i].channel[j].user[x] == uname) {
                            roomObj[i].channel[j].user.splice(x, 1);
                          userDeleted = true;
                          console.log('user deleted from channel: ' + roomObj[i].channel[j].channel)
                          break;
                        }
                      }
                    }
                  }   
                }
              }
            }
          }
          if (userDeleted == true) {
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              console.log('user deleted from channel')
              res.send(true);
            });
          } else {
            res.send(false);
          }
        }
      });
    });
  }
  