const router = require('express').Router();
const passport = require('passport');
const url = require('url');  
const logger = require('../utils/logger');

router.get('/logout',(req,res)=>{
    
    req.logOut();
    res.redirect('/');
    logger.debug('Logout called');
})


router.get('/google',passport.authenticate("google",{// 
    scope: ['profile']  // which info you need can add more 

}));

router.get('/facebook', passport.authenticate('facebook',{scope: ['email']}));

router.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{ // here passport.authenticalte act differntly rather that redirecting it see the code that is present in the url as when we get verified and genrate data from it and send it to callback function in passport-setup.js file 
    logger.debug('inside /auth/google callback');
    console.log("data is received " , req.user);

     
    res.redirect(url.format({
        pathname: "/chat.html",
        query: {
           "name": req.user.displayName,
           "thumbnail": req.user._json.picture,
           
         }
      }));
});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/chat',
                                      failureRedirect: '/' }));



router.get('/chat',(req,res)=>{
   
    console.log("shouting chal ja");
   console.log("apna time ayega***************************************",req.user);
    res.redirect(url.format({
        pathname: "/chat.html",
        query: {
           "name": req.user.displayName,
           "thumbnail": req.user.profileUrl,
           
         }
      }));

})                                      
const authCheck = (req,res,next)=>{//if user direclty hit an localhost:3000/profile without sign in then it should give error instead of that if we want to redirect them to new page which "please sign in"
   if(!req.user){
     // if user is not logged in
     res.redirect('/');
   }
   else{
       next();
   }
}
// inject middleware  -- >  how to redirect user based on thiere authentication status in node.js (google);  #18 tut
router.get('/chat.html',authCheck,(req,res)=>{
    req.redirect('/chat.html');
})

module.exports = router;