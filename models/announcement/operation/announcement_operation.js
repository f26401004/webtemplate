const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );
const announcementDB = connect( 'announcement' );
const Sequelize = require('sequelize');
const tables = {
    announcement: announcementDB.import( '../tables/announcement' ),
    announcementTag: announcementDB.import( '../tables/announcement_tag' ),
    announcementTagI18n: announcementDB.import( '../tables/announcement_tag_i18n' ),
    announcementDetail: announcementDB.import( '../tables/announcement_i18n' ),
    announcementFile: announcementDB.import( '../tables/announcement_file_i18n' ),
    announcementImage: announcementDB.import( '../tables/announcement_image_i18n' ),
    announcementUrl: announcementDB.import( '../tables/announcement_url' ),
};

const postNumberPerPage = 6;
const contentMaxLength = 100;
// the tables that dynamically get from database.
const data = {}
// the array that store all tags.
const allTags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14];

async function getAllData( language, tags, stepOver, limit = postNumberPerPage )
{
    // destructuring to initialize the corresponding data table.
    // it will according to the language to select the correspond data table.
    [
        data.announcement,
        data.announcementTagI18n,
        data.announcementDetail,
        data.announcementFile,
        data.announcementImage,
        data.announcementUrl
    ] = await Promise.all ([
        tables.announcement.findAll( {} ),
        tables.announcementTagI18n.findAll( {
            where: {
                language: language
            },
        } ),
        tables.announcementDetail.findAll( {
            where: {
                language: language
            },
        } ),
        tables.announcementFile.findAll( {
            where: {
                language: language
            },
        } ),
        tables.announcementImage.findAll( {
            where: {
                language: language
            },
        } ),
        tables.announcementUrl.findAll( {} )
    ]);
    // if the tags restriction is empty, then select the all tags
    if (tags.length == 0) {
        data.announcementTag = await tables.announcementTag.findAll({
            where: {
                'tag_id' : {
                    [Sequelize.Op.or] : allTags
                }  
            },
            group: ["announcement_id"],
            having: Sequelize.literal('count( distinct tag_id) > 0')
        })
        .then(result => {
            // pick up the announcement_id
            result = result.map(x => x.announcement_id);
            // select the tags where announcement_id equal to the result, 
            // so we can now use map & filter function to get the tags array
            return tables.announcementTag.findAll( {
                where: { 
                    "announcement_id": {
                        [Sequelize.Op.in]: result,
                    },
                },
            })
        });
    // if the tags restriction is not empty, then select the tags
    } else {
        data.announcementTag = await tables.announcementTag.findAll({
            where: { 
                tag_id: {
                    [Sequelize.Op.in]: tags,
                }, 
            },
            group: ['announcement_id'],
            having: Sequelize.literal(`count( distinct tag_id ) = ${tags.length}`),
        })
        .then(result => {
            // pick up the announcement_id
            result = result.map(x => x.announcement_id);
            // select the tags where announcement_id equal to the result, 
            // so we can now use map & filter function to get the tags array
            return tables.announcementTag.findAll( {
                where: { 
                    "announcement_id": {
                        [Sequelize.Op.in]: result,
                    },
                },
            })
        });
    }
}

module.exports = {
    async getAnnouncementPostTotalNumber (tags, language = 'ZH-TW') {
        // get all data table according to language.
        await getAllData( language, tags, 0, );
        // if the there is tags restriction.
        if (tags.length > 0) {
            console.log(JSON.stringify(data.announcementTag));
            // then find the corresponding tags announcements size to client.
            return [...new Set(data.announcementTag.map(target => target.announcement_id))].length;
        } else {
            // return the size of announcmeent table.
            return data.announcement.length;
        }
            
    },
    async getAnnouncementPost ( tags, language = 'ZH-TW', page = 1 ) {
        const stepOver = (page - 1) * postNumberPerPage;
        await getAllData( language, tags, stepOver );
        const postData = [...new Set(data.announcementTag
            .map( target => target.announcement_id ))];
        // use Set to avoid the same data.
        return postData
            .map ( function(announcement_id) {

                try {
                    const post = {};
                    [
                        post.title,
                        post.content,
                        post.time,
                        post.tags
                    ] = [
                        // find title directly by using announcement_id
                        data.announcementDetail
                            .find( target => target.announcement_id === announcement_id)
                            .title,
                        // find content directly by using announcement_id
                        data.announcementDetail
                            .find( target => target.announcement_id === announcement_id )
                            .content.slice(0, contentMaxLength),
                        // find time directly by using announcement_id
                        data.announcement
                            .find( target => target.announcement_id === announcement_id )
                            .time,
                        // filt the announcement_id and map it to an tags array.
                        data.announcementTag
                            .filter(target => target.announcement_id === announcement_id )
                            .map(target => target.tag_id)
                    ]
                    return post;
                } catch (error) {
                    console.log(error);
                }


            } ).slice(stepOver, stepOver + postNumberPerPage);
    },
    
};
