/**
 * Recipe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },

        description: {
            type: 'string'
        },

        ingredients: {
            collection: 'ingredient',
            via: 'forrecipe'
        },

        images: {
            collection: 'image',
            via: 'forrecipe'
        },

        recipeowner : {
            model: 'User',
            required: true
        },
        // We don't wan't to send back encrypted password either
        toJSON: function () {
            var obj = this.toObject();
            delete obj.token;
            return obj;
        }
    },
    beforeCreate: function (values, next) {
        delete values.token;
        next();
    }
};
