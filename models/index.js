const announcement = require( '../models/announcement' );
const Sequelize = require( 'sequelize' );

// create a sequlize instance to communicate with database.
const sequelize = new Sequelize( 'database', 'username', 'password', {
    host: 'IP address',
    dialect: 'mysql',
    oparetorAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
} );

// test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

module.exports = {
    Announcement: announcement(sequelize)
}
