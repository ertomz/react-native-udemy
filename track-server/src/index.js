require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

// Represents entire application
const app = express(); 

// Parse json so we can handle it
app.use(bodyParser.json());
// Connect request handlers to app
app.use(authRoutes);
app.use(trackRoutes);

// Connect to mongo instance (reconnect every 8 hours)
const mongoUri = 'mongodb+srv://admin:emilytomz@cluster0.pedvb.mongodb.net/<dbname>?retryWrites=true&w=majority'
// Connect mongoUri to mongoose, settings prevent termianl errors/warnings
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
// Successfully connect to mongo
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
// Unsuccessfully connect to mongo
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
});

// Route handler, anytime someone makes a get type http request to root route of app, run this function
// Function gets called with a request and response object
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

// Listen to port on local machine, callback function
app.listen(3000, () => {
    console.log('Listening on port 3000');
});