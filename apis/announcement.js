const express = require( 'express' );
const router = express.Router();
const announcement = require( '../models/announcement' );


// route to filter (announcement/)
router.get( '/course', (req, res) => {
    res.jsonp( announcement.findForIndex() );
} );

// route to /announcement/all
router.get( '/all', (req, res) => {
    res.jsonp( announcement.findType(new Date(1997, 1, 1, 0, 0, 0), Date.now, 1, 1, 
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14) );
} );

module.exports = router;
