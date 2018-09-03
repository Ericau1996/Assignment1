module.exports = function (app, fs) {
    app.get('/api/addchannel', (req, res) => {
    var roomObj;
    var rname = req.query.roomname;
    var cname = req.query.channelname;
    var channelAdded = false;
    var isChannel = 0;
    fs.readFile('groupuser.json', 'utf-8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        roomObj = JSON.parse(data);
        for (let i = 0; i < roomObj.length; i++) {
          if (roomObj[i].room == rname) {
            for (let k = 0; k < roomObj[i].channel.length; k++) {
              if (roomObj[i].channel[k].channel == cname) {
                isChannel = 1
                break;
              }
            }
            if (isChannel > 0) {
              console.log('Channel already exist.');
            } else {
                roomObj[i].channel.push({ 'channel': cname, 'user': [] });
              channelAdded = true;
              break;
            }
          }
        }
        if (channelAdded == true) {
          var newdata = JSON.stringify(roomObj);
          fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
            if (err) throw err;
            console.log('channel added')
            res.send(true);
          });
        } else {
          res.send(false);
        }
      }
    });
  });
}