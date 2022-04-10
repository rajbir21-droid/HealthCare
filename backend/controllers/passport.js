// passport is what we will use for authentication
module.exports = function(app, mongoose, User) {
  const passport = require('passport');
  const dotenv = require("dotenv");
  const path = require('path');
  dotenv.config({path:'../config.env'});
  // a middleware which sets up sessions
  const session = require('express-session');
  const MongoStore = require('connect-mongo');
  const Emitter = require('events')
  // this allows us to create an authentication system
  // with a username and password
  const LocalStrategy = require('passport-local');

  // we name our mongoose connection
  // const db = mongoose.connection;

  // // log an error if there's an error
  // db.on('error', console.error.bind(console, 'connection error:'));

  // // log a message to the terminal when database connection is "open"
  // db.once('open', function() {
  //   console.log('You are connected!');
  // });
  mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
    })
  const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on("message",function(message) {
    console.log(message.content);
});
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter);
  // set session secret used to sign session ID cookie
  app.use(
    session({
      secret: 'french toast',
      resave: false,
      store:MongoStore.create({
         client: connection.getClient(),
         touchAfter: 24 * 3600,
         autoRemove: 'disabled'
      }),
      saveUninitialized: true,
      //cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!(user.password === password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  return passport;
}