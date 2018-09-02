module.exports = function (app, fs) {
    app.get('/api/deleteroom', (req, res) => {
      var roomObj;
      var rname = req.query.roomname;
      var roomDeleted = false;
      
      fs.readFile('groupuser.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
            roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            if (roomObj[i].room == rname) {
                roomObj.splice(i, 1);
              console.log(roomObj);
              roomDeleted = true;
              break;
            }
          }
          var newdata = JSON.stringify(roomObj);
          if (roomDeleted == true) {
            fs.writeFile('groupuser.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          } else {
            res.send(false)
          }
        }
      });
    });
  }
  