const express = require( 'express' );
const announcement = require( './announcement' );
const config = require( '../settings/server/config' );
const api = express.Router();

// generate the announcement condition before route to the next router.
const announcementUrlSettings = ( req, res, next ) => {
    res.locals.condition = {};
    Object.defineProperty(res.locals.condition, {
        'where': {
            value: {},
            writable: true,
        }
    });
    Object.defineProperty(res.locals.condition.where, {
        'tags': {
            value: {},
            writable: true
        }
    });
    for (let iter of req.query.tags) {
        Object.defineProperty(res.locals.condition.where.tags, {
            '[OP.or]': {
                value: iter,
                writable: false
            }
        })
    }

}

// route to announceent api
api.use( '/announcement', announcementUrlSettings, announcement );

module.exports = api;
