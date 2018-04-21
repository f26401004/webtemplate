// router for /student
const express = require( 'express' );
const router = express.Router();
const testDB = require ( './testDB' );

const query_handler = ( page_name ) => {
    return function(req, res, next){
        let objToSend = {page: req.query.page, annoucement_id: req.query.announcement_id, tag: req.query.tag, data_number: 0};

        if(objToSend.page == undefined) objToSend.page = 1;

        // tag correspond.
        switch (page_name){
            case '/course':
                objToSend.tag = 6;
                break;
            case '/college':
                objToSend.tag = 7;
                break;
            case '/master':
                objToSend.tag = 8;
                break;
            case '/phd':
				objToSend.tag = 9;
                break;
            case '/scholarship':
                objToSend.tag = 10;
                break;
			case '/international':
				objToSend.tag =11;
				break;
        }
        let data = {data_number: 1, content: testDB.find()};
        if(objToSend.announcement_id != undefined){
            res.render( 'student/detail', { announcement_id: objToSend.announcement_id} );
        }else{
            res.render( 'student/' + page_name, data);
        }
    }
}

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

module.exports = router;
