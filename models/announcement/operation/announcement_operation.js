const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );
const announcement = connect( 'announcement' );
const table = {
    announcement_post : announcement.import( '../tables/announcement' ),
};

module.exports = {

    get_test_data : () => {
        return tables.announcement_post;
    }
}
