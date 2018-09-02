module.exports = function (app, fs) {
    app.get('/api/channels', (req, res) => {
      var channelObj;
      var channelString ='';
      fs.readFile('groupuser.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          res.send(false);
        } else {
            channelObj = JSON.parse(data);
          for (let i = 0; i < channelObj.length; i++) {
            channelString += (channelObj[i].channel + ',');
          }
          channelString = channelString.slice(0, -1);
          console.log(channelString);
          res.send(channelString);
          return;
          res.send(false);
        }
      });
    });
  }
  