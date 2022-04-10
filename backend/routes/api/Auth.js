const router = require("express").Router();
const passport = require('passport');


module.exports = function(passport, User){
  router.get('/', (req, res, next) => {
      res.json('req.user is: ' + req.user);
    });
    
    router.post(
      '/login',
      passport.authenticate('local'),
      (req, res) => {
        console.log(req.user)
        res.json({message: "The user is logged in", userId: req.user._id})
      } 
    );
    
    router.post('/logout', (req, res) => {
      req.logout();
      res.json("signed out");
    });
    

    router.post('/signup', async(req, res) => {
      try{
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
      }
  
    catch (err) {
      res.status(500).json(err);
    }
    });

  return router;
}