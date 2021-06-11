require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controllers/controller');
// const mongoose = require('mongoose'); // if using mongo
// const MONGOURI = process.env.MONGODB_URI; //if using mongo
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());
app.use('/', controller);

// ======================================================================================
//                                  MONGO MIDDLEWARE
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    show(err.message);
});

mongoose.connection.on('disconnected', () => {
    show('Hey I got disconnected');
});

mongoose.connection.once('open', () => {
    show('Connected to MONGO')
});



// ======================================================================================
//                                  LISTENING
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

app.listen(PORT, () => {
    show('On Port: ', PORT);
});
