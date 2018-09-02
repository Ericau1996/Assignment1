module.exports = function (app, fs) {
  app.get('/api/channels', (req, res) => {
    var roomObj;
    var channelString = '';
    fs.readFile('groupuser.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        roomObj = JSON.parse(data);
        for (let i = 0; i < roomObj.length; i++) {
          for (let k = 0; k < roomObj[i].channel.length; k++) {
            channelString += (roomObj[i].room+ ',' + roomObj[i].channel[k].channel + ',');
          }
        }
        channelString = channelString.slice(0, -1);
        res.send(channelString);
        return;
        res.send(false);
      }
    });
  });
}
