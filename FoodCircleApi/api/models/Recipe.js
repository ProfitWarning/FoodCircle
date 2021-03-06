/**
 * Recipe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/*global
    module
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

        events: {
            collection: 'Event',
            via: 'recipes'
        },

        recipeowner : {
            model: 'User',
            required: true
        },

        // We don't wan't to send back encrypted password either
        toJSON: function () {
            'use strict';

            var obj = this.toObject();
            delete obj.token;
            return obj;
        }
    },

    beforeCreate: function (values, next) {
        'use strict';
        delete values.token;
        next();
    },

    afterDestroy: function (destroyedRecords, next) {
        'use strict';
        var async = require("async");

        async.each(destroyedRecords, function (record, callback) {
            // Call an asynchronous function, often a save() to DB
            Image.destroy({forrecipe: record.id}).exec(function deleteCB(err, delRecords) {

                callback();
            });
        },
          // 3rd param is the function to call when everything's done
            function (err) {
            // All tasks are done now
                next();
            });






    }
};
