//Import needed packages.
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// setup express object.
const app = express();

// setup PORT to read from our environment.
const PORT = process.env.PORT || 3001;

//handlebars object with helpers.
const hbs = exphbs.create({ helpers });

// session object that we'll use to set the session with express object.
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 3000000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

//tell express to use the session object we just created.
app.use(session(sess));     

//tell express to use the handlebars rendering engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware for our express object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//tell express object to use our routes.
app.use(routes);

//start the server with a sync on sequelize object
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

