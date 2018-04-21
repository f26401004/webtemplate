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

const staticPath = config.staticUrl();

const urlSettings = ( req, res, next ) => {
    res.locals.static = staticPath;

    // read the number from the database.
    // if the client is at index html,
    // then add the number and store the number in database.
    res.locals.visitNumber = 0;
    next();
};

router.use( '/home', home );

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

module.exports = router;
