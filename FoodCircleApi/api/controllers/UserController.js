/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*global
    require, User, module, jwToken
*/


module.exports = {
    create: function (req, res) {
        'use strict';

        if (req.body.password !== req.body.confirmPassword) {
            return res.json(401, {
                err: 'Password doesn\'t match!'
            });
        }
        User.create(req.body).exec(function (err, user) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // payload is { id: user.id}
                res.json(200, {
                    user: user,
                    token: jwToken.issue({
                        id: user.id
                    })
                });
            }
        });
    }/*,

    profile: function (req, res) {
        User.findOne({id: req.param('id')}, function (err, user) {
            res.json(user);
        });
    }*/
};
