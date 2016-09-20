import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import uuid from 'node-uuid';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

import auth from './auth';
import schema from './data/schema'

const app = express();
const PORT = 3000;

app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret: 'silence is golden'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  rootValue: { user: req.user }
})));
app.use(bodyParser.json({ extended: true }) );
app.use(flash());

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }),
  function (req, res) {
    console.log('req user', req.body);
    console.log('after auth', req.user);
  }
);

app.get('/login', (req, res) => {
    console.log('Get login page');
    res.json({success: 'get login!'});
  }
);

app.get('/', (req, res) => {
    console.log('Get index page');
    res.json({success: 'get /index!'});
  }
);


let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});
