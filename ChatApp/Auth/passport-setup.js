const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("../utils/env");
const logger = require('../utils/logger');



passport.serializeUser((user,done)=>{  //serializeUser() is called when the user logs in; it decides what is stored in the cookie 
    logger.debug('inside serializeUser function');
    console.log(user);
    done(null,user); // storing in cookie
});


passport.deserializeUser((id,done)=>{  //deserializeUser() is called on each request; it loads user data based on cookie's contents
logger.debug('inside derializeUser function');

// console.log(id);
// if(id){
        done(null,id); // reterving cookie
    // }
    
});


passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   
    logger.debug('inside callback function');
      return done(null, profile);
    
  }
));


passport.use(new FacebookStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: "http://localhost:1234/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
  
},
function(accessToken, refreshToken, profile, done) {
  
  console.log("hey buddy.......");
  // console.log(profile);
  return done(null, profile);
}
));