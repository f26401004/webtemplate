const express = require( 'express' );
const router = new express.Router();

const announcementOp = require( '../models/announcement/operation/announcement_operation' );
// const model = require( '../models/ncku_csie/' );

/*
// route to /announcement/all
router.get( '/announcement/', ( req, res ) => {
    const model_ann = require( '../models/ncku_csie/announcement' );
    const model_ann_tag = require( '../models/ncku_csie/announcement_tag' );


} );
*/

router.get( '/main_test', async ( req, res ) => {
    const a = await announcementOp.get_test_data();
    res.status(200).json(a);
} );


/*
// get top articles by tag
router.get( '/announcement/get_top', ( req, res ) => {
    const model_ann = require( '../models/ncku_csie/announcement' );
    const model_ann_tag = require( '../models/ncku_csie/announcement_tag' );

    get_ann_id = model_ann.findAll( {
        where: { tag_id: req.query.tag_id, },
    } ).then( result => {

        // result(model instance obj) to json
        return result.get( { plain: true, } );
    } );

    model_article.findAll( {
        where: {
            announcement_id: get_ann_id,
            langauge: req.query.language, // should be decided by user ip
        },
    } ).then( result => {

        // result(model instance obj) to json
        return result;
    } );

    // tags, time    join!!!!!
} );

// get articles by tag and page
router.get( '/announcement/get_articles', ( req, res ) => {
    const model_ann = require( '../models/ncku_csie/announcement' );
    const model_ann_tag = require( '../models/ncku_csie/announcement_tag' );

    get_ann_ids = model_ann_tag.findAll( {
        where: { tag_id: req.query.tag_id, },
    } ).then( result => {
        return result.get( { plain: true, } );
    } );

    model_ann.findAll( {
        where: { tag_id: get_ann_ids, },
        order: [ [ 'createdAt', 'DESC', ], ],
        limit: ( 12 * ( req.query.page - 1 ) ),
    } ).then( result => {

        // result(model instance obj) to json
        return result;
    } );
} );

// get latest hit in page index
router.get( '/index/get_latest_hit', ( req, res ) => {
    const model_ann = require( '../models/ncku_csie/announcement' );
    const model_ann_tag = require( '../models/ncku_csie/announcement_tag' );

    model_ann.findAll( {
        order: [
            [ 'hit', 'DESC', ],
        ],
        limit: 4,
    } ).then( result => {

        // result(model instance obj) to json
        return result;
    } );
} );

// get latest articles in page index
router.get( '/index/get_latest', ( req, res ) => {
    const model_ann = require( '../models/ncku_csie/announcement' );

    model_ann.findAll( {
        limit: 4,
        order: [ [ 'createdAt', 'DESC', ], ],
	 } )
	 .then( result => {

	   // result(model instance obj) to json
	   return result;
	 } );
} );


*/
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
