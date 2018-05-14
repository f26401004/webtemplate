const express = require( 'express' );

const announcement = require( './announcement' );

// const config = require( '../settings/server/config' );
const api = new express.Router();

api.use( '/announcement', announcement );

module.exports = api;
