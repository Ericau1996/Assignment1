module.exports = function (app, fs) {
    app.get('/api/addroom', (req, res) => {
      var isRoom = 0;
      var roomObj;
      var rname = req.query.roomname;
  
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              isRoom = 1
            }
          }
          if (isRoom > 0) {
            res.send(false);
          } else {
            roomObj.push({ 'room': rname, 'user': [], 'channel': [] });
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          }
        }
      });
    });
  }
  