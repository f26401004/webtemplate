const express = require( 'express' );
const router = new express.Router();
const model = require( '../models/index.js' );

// route to /announcement/all
router.get( '/all', ( req, res ) => {
    model.Announcement.findAll( res.locals.condition )
        .then( ( posts ) => res.jsonp( {
            error: false,
            dataNumber: posts.length,
            data: posts,
        } ) )
        .catch( error => res.jsonp( {
            error: true,
            data: [],
            error: error,
        } ) );

    /*
    res.jsonp( announcement.findType(new Date(1997, 1, 1, 0, 0, 0),
        Date.now, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14) );
     */
} );

// route to /announcement/administrator
router.get( '/administrator', ( req, res ) => {

    model.Announcement.findAll( {
        where: { type: 1, },
    } );

} );


// route to /announcement/activity
router.get( '/activity', ( req, res ) => {

    model.Announcement.findAll( {
        where: { type: 2, },
    } );

} );

// route to /announcement/speech
router.get( '/speech', ( req, res ) => {

    model.Announcement.findAll( {
        where: { type: 3, },
    } );

} );

// route to /announcement/Erecruitment
router.get( '/Erecruitment', ( req, res ) => {

    model.Announcement.findAll( {
        where: { type: 4, },
    } );

} );

// route to /announcement/Drecruitment
router.get( '/Drecruitment', ( req, res ) => {

    model.Announcement.findAll( {
        where: { type: 5, },
    } );

} );


module.exports = router;
