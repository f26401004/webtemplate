const express = require( 'express' );
const router = new express.Router();

const announcementOp = require( '../models/announcement/operation/announcement_operation' );
// const model = require( '../models/ncku_csie/' );


// testing
router.get( '/mainTest', async ( req, res ) => {
    const a = await announcementOp.getAnnouncementPost([2, 3])
    res.status(200).json(a);
} );


// get articles by tag
router.get( '/getArticlesByTag', async (req, res) => {
    let arrTagId = req.query.tagId.split(',');
    let arrTagIdInt = arrTagId.map((x) => { 
        return parseInt(x, 10); 
    });

    const getRes = await announcementOp.getArticlesByTag(arrTagIdInt, req.query.language);
    res.status(200).json(getRes);
} );

// get articles by tag and page
router.get( '/getArticlesByTagPage', async (req, res) => {
    let arrTagId = req.query.tagId.split(',');
    let arrTagIdInt = arrTagId.map((x) => { 
        return parseInt(x, 10); 
    });
    const getRes = await announcementOp.getArticlesByTagPage(arrTagIdInt, req.query.language, req.query.page);
    res.status(200).json(getRes);
} );

// get latest hot articles
router.get( '/getLatestHot', async (req, res) => {
    console.log("test");
    const getRes = await announcementOp.getLatestHot(parseInt(req.query.articleNum, 10), req.query.language);
    res.status(200).json(getRes);
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
