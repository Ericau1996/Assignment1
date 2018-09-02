module.exports = function (app, fs) {
    app.get('/api/deletechannel', (req, res) => {
      var roomObj;
      var rname = req.query.roomname;
      var cname = req.query.channelname;
      var channelDeleted = false;
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              for (let k = 0; i < roomObj[i].channel.length; k++) {
                if (roomObj[i].channel[k].channel == cname) {
                  roomObj[i].channel.splice(k, 1);
                  channelDeleted = true;
                  break;
                }
              }
            }
          }
          var newdata = JSON.stringify(roomObj);
          if (channelDeleted == true) {
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              console.log('channel deleted: ' + cname)
              if (err) throw err;
              res.send(true);
            });
          } else {
            console.log('channel delete error')
            res.send(false)
          }
        }
      });
    });
  }
  