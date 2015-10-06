/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/*global
    module, require
*/

var moment = require('moment');

module.exports = {

    attributes: {

        date: {
            type: 'date',
            required: true
        },

        title: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string'
        },

        blogs : {
            collection: 'Blog',
            via: 'event'
        }
    }
};
