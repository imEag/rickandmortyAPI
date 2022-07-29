const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const expressGraphQL = require('express-graphql');
require('dotenv').config();

// WEBPACK
/* 
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js'); 
*/

const app = express();

//MIDDLEWARES
app.use('/', bodyParser.json());
/* app.use(webpackMiddleware(webpack(webpackConfig))); */
/* app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
})); */

//CONNECT to MongoDB
mongoose.Promise = global.Promise;
app.set('port', 3000);

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
