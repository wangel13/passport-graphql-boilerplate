import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './data/DB';

passport.use('local', new LocalStrategy(
  function(username, password, cb) {
    User.getUserByLogin(username).then((data) => {
      if(data === null) {
        return cb(null, false, { message: 'Incorrect username.' });
      } else {
        User.checkPassword(username, password).then((checked) => {
          if (!checked) {
            return cb(null, false, { message: 'Incorrect password.' });
          }
          return cb(null, data);
        })
      }
    }).catch((err) => {
      return cb(err);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.getUserById(id).then((user) => {
    return cb(null, user);
  }).catch((error) => {
    console.log("ERROR:", error.message || error);
    return cb(error);
  });
});
