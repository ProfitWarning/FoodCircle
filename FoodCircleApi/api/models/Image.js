/**
 * File.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        filename: {
            type: 'string',
            unique: true
        },

        size: {
            type: 'integer'
        },

        type: {
            type: 'string'
        },

        fd: {
            type: 'string',
            maxLength: 1000
        },

        data: {
            type: 'binary'
        },

        base64: {
            type: 'text'
        },

        forrecipe: {
            model: 'recipe'
        }
    }
};
