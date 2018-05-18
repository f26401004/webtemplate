// router for /student
const express = require( 'express' );
const router = new express.Router();
const testDB = require ( './testDB' );

const queryHandler = ( pageName ) => {
    return function ( req, res, next ) {
        let objToSend = { page: req.query.page,
            announcementId: req.query.announcementId,
            tag: req.query.tag, dataNumber: 0, };

        if( typeof objToSend.page === 'undefined' ) objToSend.page = 1;

        // tag correspond.
        switch ( pageName ) {
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
            objToSend.tag = 11;
            break;
        }
        let data = { dataNumber: 1,
            content: testDB.find(), };
        if( typeof objToSend.announcementId !== 'undefined' )
            res.render( 'student/detail', {
                announcementId: objToSend.announcementId, } );
        else
            res.render( 'student/' + pageName, data );

    };
};

// resolve URL /student/course
router.get( '/course', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/course.html` );
} );

// resolve URL /student/college
router.get( '/college', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/college.html` );
} );

// resolve URL /student/master
router.get( '/master', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/master.html` );
} );

// resolve URL /student/phd
router.get( '/phd', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/phd.html` );
} );

// resolve URL /student/scholarship
router.get( '/scholarship', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/scholarship.html` );
} );

// resolve URL /student/international
router.get( '/international', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/international.html` );
} );

module.exports = router;
