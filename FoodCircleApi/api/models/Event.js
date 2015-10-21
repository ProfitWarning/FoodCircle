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

        allday: {
            type: 'boolean',
            defaultsTo: false
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

        recipeowner: {
            model: 'Recipe'
        },

        toJSON: function () {
            'use strict';

            var obj = this.toObject();

            return obj;
        }
    }
};
