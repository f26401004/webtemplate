const express = require( 'express' );
const router = new express.Router();

const announcementOp = require( '../models/announcement/operation/announcement_operation' );
// const model = require( '../models/ncku_csie/' );

// get post by tag and page
router.get( '/getAnnouncementPostTotalNumber', async ( req, res ) => {
    let tags = req.query.tags;
    const language = req.query.language || 'ZH-TW';
    if (tags !== undefined) {
        tags = tags.split(',');    
        const tagsInt = tags.map( (x) => parseInt(x, 10) );
        const data = await announcementOp.getAnnouncementPostTotalNumber( tagsInt, language );
        res.status(200).json(data);
    } else {
        const data = await announcementOp.getAnnouncementPostTotalNumber( [], 'ZH-TW' );
        res.status(200).json(data);
    }

} );

// get post by tag and page
router.get( '/getAnnouncementPost', async ( req, res ) => {
    let tags = req.query.tags;
    const language = req.query.language || 'ZH-TW';
    const page = req.query.page || 1;
    if (tags !== undefined) {
        tags = tags.split(','); 
        const tagsInt = tags.map( (x) => parseInt(x, 10) );
        const data = await announcementOp.getAnnouncementPost( tagsInt, language, page );
        res.status(200).json(data);
    } else {
        const data = await announcementOp.getAnnouncementPost( [], 'ZH-TW', page );
        res.status(200).json(data);
    }
} );





// route to /announcement/administrator
router.get( '/administrator', ( req, res ) => {
    console.log("TEST");
    res.send("Test");
} );


// route to /announcement/activity
router.get( '/activity', ( req, res ) => {

} );

// route to /announcement/speech
router.get( '/speech', ( req, res ) => {


} );

// route to /announcement/Erecruitment
router.get( '/Erecruitment', ( req, res ) => {

} );

// route to /announcement/Drecruitment
router.get( '/Drecruitment', ( req, res ) => {

} );

module.exports = router;
