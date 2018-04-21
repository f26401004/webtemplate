// including public module
const express = require( 'express' );
const config = require( './settings/server/config' );
const routes = require( './routes/urls' );
const apis = require( './apis/urls' );

// start server
const server = express();
<<<<<<< HEAD

//server.use( bodyParser.json() );
//server.use( bodyParser.urlencoded( { extended: true } ) );

=======
>>>>>>> b52206b4cae27575cfbc6448c8a1d5b7ff862ad6
server.listen( config.port );

// set render engine
server.set( 'view engine', 'pug' );
<<<<<<< HEAD
server.use( config.root, routes );
server.use( config.static, express.static( 'static/dist' ) );
=======
server.use( express.static( 'static/dist' ) );
server.use( '/', routes );
>>>>>>> b52206b4cae27575cfbc6448c8a1d5b7ff862ad6
