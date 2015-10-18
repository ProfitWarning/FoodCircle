/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
/*global
    module, jwToken
*/

module.exports = function (req, res, next) {
    'use strict';

    var token, parts, scheme, credentials;

    if (req.headers && req.headers.authorization) {
        parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            scheme = parts[0];
            credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {
                err: 'Format is Authorization: Bearer [token]'
            });
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
        if (req.body.token) {
            delete req.body.token;
        }
    } else {
        return res.json(401, {
            err: 'No Authorization header was found'
        });
    }

    jwToken.verify(token, function (err, token) {
        if (err) {

            if (error.name === 'TokenExpiredError') {
                return res.json(401, {
                    error: err
                });
            }

            return res.json(401, {
                error: 'Invalid Token!'
            });
        }
        req.token = token; // This is the decrypted token or the payload you provided
        next();
    });
};
