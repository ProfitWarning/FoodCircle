/**
 * RecipeController
 *
 * @description :: Server-side logic for managing recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * RecipeController.create()
     */
    create: function (req, res) {
        var test = req.body;

        Recipe.create(req.body).exec(function (err, recipe) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If recipe created successfuly we return user and token as response
            if (recipe) {
                res.json(200, {
                    recipe: recipe
                });
            }
        });
    }
};
