const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );
const announcement = connect( 'announcement' );
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const tables = {
    announcement_post : announcement.import( '../tables/announcement' ),
    announcement_tag : announcement.import('../tables/announcement_tag'),
    announcement_tag_i18n : announcement.import('../tables/announcement_tag_i18n'),
    announcement_post_detail : announcement.import('../tables/announcement_i18n'),
    announcement_file : announcement.import('../tables/announcement_file_i18n'),
    announcement_image : announcement.import('../tables/announcement_image_i18n'),
    announcement_url : announcement.import('../tables/announcement_url'),
};

const article_num_per_page = 6;

module.exports = {


    // for testing

    get_test_data : () => {
        return tables.announcement_post;
    },


    // get top articles by tag ids
    // this would select everything about the articles(title, content, file, ...)
    // which has all the tags requested

    get_articles_by_tag : (in_tag_id, in_language) => {

        // get announcement_ids by tag_ids
        get_ann_id = tables.announcement_tag.findAll( {
            where: { 
                tag_id: {
                    [Op.in]: in_tag_id,
                }, 
            },
            group: ['announcement_id'],
            having: Sequelize.literal(`count(tag_id) = ${in_tag_id.length}`),

        } ).then( result => {
            // result(model instance obj) to json
            let aid_arr = []
            for (let id of result){
                aid_arr.push(id.get('announcement_id'))
            }
            return aid_arr;

        } ).catch(
            err => {
                console.log(err)
                console.log('get_articles_by_tag - get_ann_id failed');
            }
        );

        // get announcement by announcement_id
        get_article = get_ann_id.then( ann_id => {

            // join tables
            tables.announcement_post.hasMany(tables.announcement_post_detail, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_file, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_image, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_url, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_tag, {foreignKey: 'announcement_id'});

            get_content = tables.announcement_post.findAll({
                where: {
                    announcement_id: ann_id,
                },
                include: [
                    {
                        model: tables.announcement_post_detail,
                        where: {
                            language: in_language
                        }
                    },{
                        model: tables.announcement_file
                    },{
                        model: tables.announcement_image
                    },{
                        model: tables.announcement_url
                    },{
                        model: tables.announcement_tag
                    }
                ],
                order: [['time',  'DESC']],

            }).then(  result => {
                let res_arr = []
                for( let item of result ){
                    res_arr.push(item.get({ plain: true }));
                }
                return res_arr;

            }).catch( err => {
                console.log(err)
                console.log('get_articles_by_tag - get_content failed')
            });
            return Promise.resolve(get_content);
        });

        return Promise.resolve(get_article)
    },

    // get articles by tag and page
    get_articles_by_tag_page : (in_tag_id, in_language, in_page) => {

        let step_over = (in_page - 1) * article_num_per_page;

        // get announcement_ids by tag_ids
        get_ann_id = tables.announcement_tag.findAll( {
            where: { 
                tag_id: {
                    [Op.in]: in_tag_id,
                }, 
            },
            group: ['announcement_id'],
            having: Sequelize.literal(`count(tag_id) = ${in_tag_id.length}`),

        } ).then( result => {
            // result(model instance obj) to json
            let aid_arr = []
            for (let id of result){
                aid_arr.push(id.get('announcement_id'))
            }
            return aid_arr;

        } ).catch(
            err => {
                console.log(err)
                console.log('get_articles_by_tag_page - get_ann_id failed');
            }
        );

        // get announcement by announcement_id
        get_article = get_ann_id.then( ann_id => {
            // join tables
            tables.announcement_post.hasMany(tables.announcement_post_detail, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_file, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_image, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_url, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_tag, {foreignKey: 'announcement_id'});

            get_content = tables.announcement_post.findAll({
                where: {
                    announcement_id: ann_id,
                },
                include: [{
                    model: tables.announcement_post_detail,
                    where: {
                        language: in_language
                    }
                },{
                    model: tables.announcement_file
                },{
                    model: tables.announcement_image
                },{
                    model: tables.announcement_url
                },{
                    model: tables.announcement_tag
                }],
                order: [['time',  'DESC']],
                offset: step_over,
                limit: article_num_per_page,

            }).then(  result => {
                let res_arr = []
                for( let item of result ){
                    res_arr.push(item.get({ plain: true }));
                }
                return res_arr;

            }).catch( err => {
                console.log(err)
                console.log('get_articles_by_tag_page - get_content failed')
            });
            return Promise.resolve(get_content);
        });

        return Promise.resolve(get_article)
    },


    // get latest hot articles
    get_latest_hot : (in_article_num, in_language) => {

        // get announcement_ids by time & hit
        get_ann_id = tables.announcement_post.findAll( {
            order: [['hit',  'DESC']],
            limit: in_article_num,

        } ).then( result => {
            // result(model instance obj) to json
            let aid_arr = []
            for (let id of result){
                aid_arr.push(id.get('announcement_id'))
            }
            return aid_arr;

        } ).catch(
            err => {
                console.log(err)
                console.log('get_latest_hot - get_ann_id failed');
            }
        );

        // get announcement by announcement_id
        get_article = get_ann_id.then( ann_id => {
            // join tables
            tables.announcement_post.hasMany(tables.announcement_post_detail, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_file, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_image, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_url, {foreignKey: 'announcement_id'});
            tables.announcement_post.hasMany(tables.announcement_tag, {foreignKey: 'announcement_id'});

            get_content = tables.announcement_post.findAll({
                where: {
                    announcement_id: ann_id,
                },
                include: [{
                    model: tables.announcement_post_detail,
                    where: {
                        language: in_language
                    }
                },{
                    model: tables.announcement_file
                },{
                    model: tables.announcement_image
                },{
                    model: tables.announcement_url
                },{
                    model: tables.announcement_tag
                }],
                order: [['time',  'DESC']],

            }).then(  result => {
                let res_arr = [];
                for( let item of result ){
                    res_arr.push(item.get({ plain: true }));
                }
                return res_arr;

            }).catch( err => {
                console.log(err);
                console.log('get_latest_hot - get_content failed');
            });

            return Promise.resolve(get_content).catch(err => {console.log('return get_content error')});

        }).catch( err => {
            console.log(err);
            console.log('get_latest_hot - get_article failed');
        } );

        return Promise.resolve(get_article).catch(err => {console.log('return get_article error')});
    },
}
