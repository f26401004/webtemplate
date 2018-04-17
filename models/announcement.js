const config = require('../settings/server/config');

module.exports = function(sequelize) {
    const Post = sequelize.define( 'Post', {
        //the content of post table columns.
    });
    Post.associate = (models) => {
        // the associations can be defined here
    }
    return Post;
}

/*
   module.exports.findType = function (from = new Date(1970, 1, 1, 0, 0, 0), to = Date.now, page = 1, type = 1, ...tags) {
// check the from and to
if (to !== Date.now) {
to = Date.now
}
// check tags

// get the data from database according to from & to & tag
return [{"tag": [1], "title": 'Feed me plz', "time": '2018-2-2 | 15:30',  "content": 'Eat Eat Fat Fat' }, 
{"tag": [1, 2], "title": 'Feed me plz', "time": '2018-2-2 | 15:30',  "content": 'Eat Eat Fat Fat' }];
}

module.exports.findDetail = function (id) {
return {"tag": [1], "title": 'Feed me plz', "date": '2018-02-02', "time": '15:30', "author":"Iris",  "content": 'Eat Eat Fat Fat', "picture": [`${config.static}/images/hamburger.jpg`], "file": [undefined] };
}
 */

