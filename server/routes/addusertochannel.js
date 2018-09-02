module.exports = function (app, fs) {
    app.get('/api/addusertochannel', (req, res) => {
      var roomObj;
      var rname = req.query.roomname;
      var uname = req.query.username;
      var cname = req.query.channelname;
      var userAdded = false;
      var isUser = 0;
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              for (let k = 0; k < roomObj[i].channel.length; k++) {
                if (roomObj[i].channel[k].channel == cname) {
                  for (let j = 0; j < roomObj[i].channel[k].user.length; j++) {
                    if (roomObj[i].channel[k].user[j] == uname) {
                      isUser = 1
                      break;
                    }
                  }
                  if (isUser > 0) {
                    console.log('user already exist in channel');
                  } else {
                    roomObj[i].channel[k].user.push(uname);
                    userAdded = true;
                    break;
                  }
                }
              }
            }
          }
          if (userAdded == true) {
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              console.log('user added to channel')
              res.send(true);
            });
          } else {
            res.send(false);
          }
        }
      });
    });
  }
  