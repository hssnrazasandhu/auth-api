const express = require('express');
const cookieParser = require('cookie-parser');
const { signupHandler } = require('./controllers/signUpController');
const { loginHandler } = require('./controllers/loginController');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/signup', signupHandler);
app.post('/login', loginHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
