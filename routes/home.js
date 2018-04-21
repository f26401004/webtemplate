// router for /home
const express = require( 'express' );

const router = new express.Router();

// route to root directory
router.get( '/', function( req, res ) {
    let objToSend = new Object();

    objToSend.announcement_id = req.query.announcement_id;
    objToSend.tag = req.query.tag;
    objToSend.time = req.query.time;
    objToSend.announcement_data = 'ask db';

    if(objToSend.announcement_id != undefined){
        // check if announcement_id is valid
        res.render( 'announcement/detail', {announcement_id : objToSend.announcement_id} );
    }else if(objToSend.tag != undefined || objToSend.time != undefined){
        // check if tag is valid
        // check if time is valid, if time == undefined -> no time filter
        res.render( 'search/search', objToSend );
    }else{
        res.render( 'home/index' );
    }
} );

module.exports = router;
