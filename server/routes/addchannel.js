module.exports = function (app, fs) {
    app.get('/api/addchannel', (req, res) => {
      var isChannel = 0;
      var channelObj;
      var cname = req.query.channelname;
  
      fs.readFile('channels.json', 'utf-8', function (err, data) {
        console.log(cname);
        if (err) {
          console.log(err);
        } else {
        channelObj = JSON.parse(data);
          for (let i = 0; i<channelObj.length; i++) {
            if (channelObj[i].channel == cname) {
                isChannel = 1
            }
          }
          if (isChannel ==1) {
            res.send(false);
          } else if (isChannel == 0){
            channelObj.push({ 'channel': cname });
            var newdata = JSON.stringify(channelObj);
            fs.writeFile('channels.json', newdata, 'utf-8', function (err) {
              if (err) throw err;
              res.send(true);
            });
          }
        }
      });
    });
  }
  