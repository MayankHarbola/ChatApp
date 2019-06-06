const express = require('express');
const authRoutes = require('./routes/authRoutes');
const keys = require('./utils/env');
const passportSetup = require('./Auth/passport-setup');
const cookieSession = require('cookie-session');
const socket = require("socket.io");
const ChatModel = require("./db/models/chatmodel");
const passport = require('passport');
const logger = require('./utils/logger');



const app = express();


logger.debug('Inside App.js ');
app.use(express.static("public"));


var server = app.listen(process.env.PORT || 1234,(err)=>{
	if(err){
			throw err;
	}
	else{
	console.log('Server Start............');
	}
})


// ***********auth code*****************
app.use(cookieSession({ // intialize a cookie for a day after searlizing 
    maxAge: 24*60*60*1000, // max time cookie will be saved (for a day)
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/',authRoutes);
logger.debug('Inside App.js After authRoutes');

// **********************************

//  ***************socket.io************************
var cnt = 0;
var io = socket(server);
var users = [];

io.sockets.on('connection', function (socket) {
 
logger.debug('**************BUG: inside io.sockets.on *********************');

var addedUser = false;

socket.on('add user',(data)=>{
	if(addedUser) return;

	socket.userObj = data;
	addedUser = true;
	
	var userObj = {
		username: socket.userObj.username,
		thumbnail: socket.userObj.thumbnail
	}

	users.push(userObj);

	socket.broadcast.emit('user joined',users);
});


socket.on('disconnect',()=>{
	if(addedUser){
	

		for (var i=0; i < users.length; i++) {
			if (users[i].username == socket.userObj.username && users[i].thumbnail == socket.userObj.thumbnail) {
				users.splice(i,1);
			}
		}
		socket.broadcast.emit('user left',users);	

	}
})




ChatModel.find({},(err, docs)=>{
   if(err) {
	   console.log(err);
   }
   else{
	socket.emit('data',docs); // sending saved chat 
	// console.log(docs);
   }
})



socket.on('send', function (data) {
	// console.log(data);
	io.sockets.emit('message', data); 
	
	
	ChatModel.create(data,(err)=>{  // adding data to db
		if(err)
		{
			console.log(err,'Error in Record Add');
			
		}
		else{
			console.log('Record Added..');
			
		}
	});
	
	
});
});
