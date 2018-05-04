const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const api = require( '../apis/urls' );

const router = new express.Router();

router.use( '/', home );

router.use( '/api', api );

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
