const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars').create({});
const routes = require('./controllers')
const path = require('path')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;

// add code for sessions here

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});


