// router for /home
const express = require( 'express' );

const router = new express.Router();

// route to root directory
router.get( '/', function ( req, res ) {
    let objToSend = {};

    objToSend.announcementId = req.query.announcementId;
    objToSend.tag = req.query.tag;
    objToSend.time = req.query.time;
    objToSend.announcementData = 'ask db';

    if( typeof objToSend.announcementId !== 'undefined' )

        // check if announcementId is valid
        res.render( 'announcement/detail', {
            announcementId: objToSend.announcementId, } );
    else if( typeof objToSend.tag !== 'undefined' ||
        typeof objToSend.time !== 'undefined' )

        // check if tag is valid
        // check if time is valid, if time == undefined -> no time filter
        res.render( 'search/search', objToSend );
    else
        res.render( 'home/index' );

} );

module.exports = router;
