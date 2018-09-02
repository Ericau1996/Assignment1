module.exports = function (app, fs) {
  app.get('/api/users', (req, res) => {
    var userObj;
    var userRole;
    var userString ='';
    fs.readFile('authdata.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        userObj = JSON.parse(data);
        for (let i = 0; i < userObj.length; i++) {
          userString += (userObj[i].name + ',');
        }
        userString = userString.slice(0, -1);
        console.log(userString);
        res.send(userString);
        return;
        res.send(false);
      }
    });
  });
}
