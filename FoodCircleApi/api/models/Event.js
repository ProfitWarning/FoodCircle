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
            required: true
        },

        startDate: {
            type: 'date'
        },

        endDate: {
            type: 'date'
        },

        title: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string'
        },

        blogs: {
            collection: 'Blog',
            via: 'event'
        },

        eventowner: {
            model: 'User',
            required: true
        },

        // We don't wan't to send back encrypted password either
        toJSON: function () {
            'use strict';

            var obj = this.toObject();

            return obj;
        }
    }
};
