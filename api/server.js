const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const eleveRoutes = require('./routes/eleve.routes');
const path = require('path');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({ extended: true })));
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});
app.use('/api/user', userRoutes);
app.use('/api/eleve', eleveRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
