const express = require( 'express' );
const router = new express.Router();

const announcementOp = require( '../models/announcement/operation/announcement_operation' );
// const model = require( '../models/ncku_csie/' );


// testing
router.get( '/main_test', async ( req, res ) => {
    const a = await announcementOp.get_test_data();
    console.log(a)
    res.status(200).json(a);
} );


// get articles by tag
router.get( '/get_articles_by_tag', async (req, res) => {
    let arr_tag_id = req.query.tag_id.split(',');
    let arr_tag_id_int = arr_tag_id.map((x) => { 
        return parseInt(x, 10); 
    });

    const get_res = await announcementOp.get_articles_by_tag(arr_tag_id_int, req.query.language);
    res.status(200).json(get_res);
} );

// get articles by tag and page
router.get( '/get_articles_by_tag_page', async (req, res) => {
    let arr_tag_id = req.query.tag_id.split(',');
    let arr_tag_id_int = arr_tag_id.map((x) => { 
        return parseInt(x, 10); 
    });
    const get_res = await announcementOp.get_articles_by_tag_page(arr_tag_id_int, req.query.language, req.query.page);
    res.status(200).json(get_res);
} );

// get latest hot articles
router.get( '/get_latest_hot', async (req, res) => {
    const get_res = await announcementOp.get_latest_hot(parseInt(req.query.article_num, 10), req.query.language);
    res.status(200).json(get_res);
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
