const express = require('express');
const models = require('./models');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

app.set('port', 3000);

//CONNECT to MongoDB
mongoose.Promise = global.Promise;

//.env file
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('No MongoDB URI');
}

mongoose.connect(MONGODB_URI)
.then(res => {
    console.log('Connection Succesful.');
    //creating server
    app.listen(app.get('port'), () => {
        console.log('server correctly running at localhost:' + app.get('port'));
    });
})
.catch(e => {
    console.log('Error: ', e)
});


//MIDDLEWARES
app.use('/', bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

// WEBPACK
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js'); 
/* app.use(webpackMiddleware(webpack(webpackConfig))); */
