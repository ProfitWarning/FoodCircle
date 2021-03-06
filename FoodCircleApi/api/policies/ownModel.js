/*global
    module, jwToken
*/

function parseModel(req) {
    'use strict';
    return req.options.model || req.options.controller;
}

module.exports = function (req, res, next) {
    'use strict';


    if (req.method !== 'PUT' && req.method !== 'DELETE') {
        next();
        return;
    }


    var currentUserId = req.token.id,
        model = req.options.modelIdentity = parseModel(req),
        Model = req._sails.models[model],
        modelId = req.params.id;


    if (model.toLocaleLowerCase() === 'user') {
        if (modelId !== currentUserId) {
            return res.json(403, {error: 'You are not allowed to do that'});
        }
    }

    Model.findOne({id: modelId}).then(function (foundModel) {
        if (!_.isObject(foundModel)) {
            req.options.unknownModel = true;
        }


        var ownerid = foundModel[model.toLocaleLowerCase() + 'owner'];

        if (ownerid !== currentUserId) {
            return res.json(403, {error: 'You are not allowed to do that'});
        }

        next();
    })['catch'](next);
};
