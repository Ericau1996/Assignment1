module.exports = function (app, fs) {
    app.get('/api/chat', (req, res) => {
      var uroom = req.query.room;
      var roomObj;
      fs.readFile('roomdata.json', 'utf8', function (err, data) {
      });
    });
  }
  