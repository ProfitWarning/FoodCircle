/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/*global
    module
*/

module.exports = {

    attributes: {

        date: {
            type: 'date',
            require: true
        },

        info: {
            collection: 'EventInfo'
        },

        blogs : {
            collection: 'Blog',
            via: 'event'
        }
    }
};
