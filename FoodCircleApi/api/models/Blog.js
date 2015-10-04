/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/*global
    module, require
*/

var slugger = require('slugger');

module.exports = {

    attributes: {

        title: {
            type: 'string',
            required: true,
            unique: true
        },

        slug: {
            type: 'string'
        },

        summary: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string',
            required: true
        },

        event: {
            model: 'Event'
        }
    },

    beforeCreate: function (values, next) {
        'use strict';

        values.slug = slugger(values.title, {maintainCase: true});
        next();
    }
};
