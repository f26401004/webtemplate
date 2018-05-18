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
const data = {}

async function getAllData( language, tags, stepOver )
{
    [
        data.announcement,
        data.announcementTag,
        data.announcementTagI18n,
        data.announcementDetail,
        data.announcementFile,
        data.announcementImage,
        data.announcementUrl
    ] = await Promise.all ([
        tables.announcement.findAll( {} ),
        tables.announcementTag.findAll( {
            where: { 
                tag_id: {
                    [Sequelize.Op.in]: tags,
                }, 
            },
            group: ['announcement_id'],
            having: Sequelize.literal(`count( distinct tag_id ) = ${tags.length}`),
        } )
        .then(result => {
            result = result.map(x => x.announcement_id);
            return tables.announcementTag.findAll( {
                where: { 
                    "announcement_id": {
                        [Sequelize.Op.in]: result,
                    },
                },
                limit: postNumberPerPage,
                offset: stepOver
            })
        }),
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
}



module.exports = {
    async getAnnouncementPost ( tags, language = 'ZH-TW', page = 1 ) {
        const stepOver = (page - 1) * postNumberPerPage;
        await getAllData( language, tags, stepOver );
        return [...new Set(data.announcementTag
            .map( target => target.announcement_id ))]
            .map ( announcement_id => ({
                title: data.announcementDetail
                    .find( target => target.announcement_id === announcement_id)
                    .title,
                content: data.announcementDetail
                    .find( target => target.announcement_id === announcement_id )
                    .content.slice(0, contentMaxLength),
                tagId: data.announcementTag
                    .filter(target => target.announcement_id === announcement_id )
                    .map(target => target.tag_id)
        } ) );
    },
    
};
