module.exports = function (app, fs) {
    app.get('/api/rooms', (req, res) => {
      var roomObj;
      var roomString ='';
      fs.readFile('roomdata.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          roomObj = JSON.parse(data);
          for (let i = 0; i < roomObj.length; i++) {
            roomString += (roomObj[i].room + ',');
          }
          roomString = roomString.slice(0, -1);
          console.log(roomString);
          res.send(roomString);
          return;
          res.send(false);
        }
      });
    });
  }
  