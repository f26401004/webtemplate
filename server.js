// including public module
const express = require( 'express' );
const config = require( './settings/server/config' );
const routes = require( './routes/urls' );
const apis = require( './apis/urls' );

// start server
const server = express();

// server.use( bodyParser.json() );
// server.use( bodyParser.urlencoded( { extended: true } ) );

server.listen( config.port );

// set render engine
server.set( 'view engine', 'pug' );
server.use( config.root, routes );
server.use( config.static, express.static( 'static/dist' ) );
