const express = require('express');
const models = require('./models');
const db = require('./config/db');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use( cors() );
app.set('port', 4000);

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


// headers and cors setup
/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); */

// WEBPACK
/* const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js'); 
app.use(webpackMiddleware(webpack(webpackConfig))); */
