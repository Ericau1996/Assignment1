module.exports = function (app, fs) {
    app.get('/api/addroom', (req, res) => {
      var isRoom = 0;
      var roomObj;
      var rname = req.query.roomname;
  
      fs.readFile('roomdata.json', 'utf-8', function (err, data) {
        console.log(rname);
        if (err) {
          console.log(err);
        } else {
          roomObj = JSON.parse(data);
          for (let i = 0; i<roomObj.length; i++) {
            if (roomObj[i].room == rname) {
              isRoom = 1
            }
          }
          if (isRoom ==1) {
            res.send(false);
          } else if (isRoom == 0){
            roomObj.push({ 'room': rname });
            var newdata = JSON.stringify(roomObj);
            fs.writeFile('roomdata.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          }
        }
      });
    });
  }
  