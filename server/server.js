const express = require('express');
const app = express();
const path =require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname , '../dist/chat/')));
require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);
require('./routes/auth.js')(app, fs);
require('./routes/register.js')(app, fs);
require('./routes/chatrooms.js')(app, fs);
require('./routes/users.js')(app, fs);
require('./routes/addroom.js')(app, fs);
require('./routes/channels.js')(app, fs);
require('./routes/addchannel.js')(app, fs);
require('./routes/addusertogroup.js')(app, fs);