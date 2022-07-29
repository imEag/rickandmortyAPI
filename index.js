const express = require('express');
const models = require('./models');
const db = require('./config/db');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

app.set('port', 3000);

//CONNECT to MongoDB
db()
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
/* const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js'); 
app.use(webpackMiddleware(webpack(webpackConfig))); */
