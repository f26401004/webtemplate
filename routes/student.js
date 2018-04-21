// router for /student
const express = require( 'express' );
const router = express.Router();
const testDB = require ( './testDB' );

const query_handler = ( page_name ) => {
    return function(req, res, next){
        let obj_to_send = {page: req.query.page, annoucement_id: req.query.announcement_id, tag: req.query.tag, data_number: 0};

        if(obj_to_send.page == undefined) obj_to_send.page = 1;

        // tag correspond.
        switch (page_name){
            case '/course':
                obj_to_send.tag = 6;
                break;
            case '/college':
                obj_to_send.tag = 7;
                break;
            case '/master':
                obj_to_send.tag = 8;
                break;
            case '/phd':
				obj_to_send.tag = 9;
                break;
            case '/scholarship':
                obj_to_send.tag = 10;
                break;
			case '/international':
				obj_to_send.tag =11;
				break;
        }
        let data = {data_number: 1, content: testDB.find()};
        if(obj_to_send.announcement_id != undefined){
            res.render( 'student/detail', { announcement_id: obj_to_send.announcement_id} );
        }else{
            res.render( 'student/' + page_name, data);
        }
    }
}

<<<<<<< HEAD
// route to /student/course
router.get( '/course', query_handler('/course'));

// route to /student/college
router.get( '/college', query_handler('/college'));

// route to /student/master
router.get( '/master', query_handler('/master'));

// route to /student/phd
router.get( '/phd', query_handler('/phd'));

// route to /student/scholarship
router.get( '/scholarship',query_handler('/scholarship'));

// route to /student/international
router.get( '/international', query_handler('/international'));
=======
// resolve URL /student/course
router.get( '/course', function ( req, res ) {
    res.render( 'student/course' );
} );

// resolve URL /student/college
router.get( '/college', function ( req, res ) {
    res.render( 'student/college' );
} );

// resolve URL /student/master
router.get( '/master', function ( req, res ) {
    res.render( 'student/master' );
} );

// resolve URL /student/phd
router.get( '/phd', function ( req, res ) {
    res.render( 'student/phd' );
} );

// resolve URL /student/scholarship
router.get( '/scholarship', function ( req, res ) {
    res.render( 'student/scholarship' );
} );

// resolve URL /student/international
router.get( '/international', function ( req, res ) {
    res.render( 'student/international' );
} );
>>>>>>> b52206b4cae27575cfbc6448c8a1d5b7ff862ad6

module.exports = router;
