const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );
const api = require( '../apis/urls' );

const config = require( '../settings/server/config' );

const router = new express.Router();

const static_path = config.staticUrl();

<<<<<<< HEAD
const urlSettings = ( req, res, next ) => {
    res.locals.static = static_path;
    // read the number from the database.
    // if the client is at index html, then add the number and store the number in database.
    res.locals.visitNumber = 0;
    next();
};


router.use( '/', urlSettings, home );
// route to pages belongs to /student
router.use( '/student', urlSettings, student );
// route to pages belongs to /about
router.use( '/about', urlSettings,  about );
// route to pages belongs to /research
router.use( '/research', urlSettings, research );
// route to pages belongs to /announcement
router.use( '/announcement', urlSettings, announcement );
// route to pages belongs to /resource
router.use( '/resource', urlSettings, resource );
router.use( '/api', api );
=======
// resolve URL /student
router.use( '/student', student );

// resolve URL /about
router.use( '/about', about );

// resolve URL /research
router.use( '/research', research );

// resolve URL /announcement
router.use( '/announcement', announcement );

// resolve URL /resource
router.use( '/resource', resource );
>>>>>>> b52206b4cae27575cfbc6448c8a1d5b7ff862ad6

module.exports = router;
