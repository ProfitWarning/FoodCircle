
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').config(['$stateProvider', '$urlRouterProvider', 'sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL', 'localStorageServiceProvider',
        function ($stateProvider, $urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL, localStorageServiceProvider) {

            $urlRouterProvider.when('', '/');

            $stateProvider
                .state('main', {
                    abstract: true,
                    url: '',
                    controller: 'MainCtrl as vm',
                    templateUrl: 'views/main.html'
                })
            // HOME STATES AND NESTED VIEWS ========================================
                .state('main.home', {
                    url: '/',
                    controller: 'HomeCtrl as vm',
                    templateUrl: 'views/home.html',
                    resolve: {
                        recipeList: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getRecipeList({where: {id: {'!': ''}}, imit: 6, sort: 'updatedAt DESC'}).$promise.then(function (recipeList) {
                                return recipeList;
                            });
                        }]
                    }
                })
                // ABOUT PAGE  =================================
                .state('main.about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('main.impressum', {
                    url: '/impressum',
                    templateUrl: 'views/impressum.html'
                })
                // LOGIN PAGE =================================
                .state('main.login', {
                    url: '/login',
                    templateUrl: 'views/login.html'
                })
                .state('main.logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl'
                })
                .state('editrecipe', {
                    url: '/editrecipe',
                    controller: 'RecipeEditorCtrl as vm',
                    templateUrl: 'views/editRecipe.html'
                })
                .state('main.myrecipes', {
                    url: '/myrecipes',
                    templateUrl: 'views/myRecipes.html',
                    resolve: {
                        authorize: ['authorization', function (authorization) {
                            return authorization.authorize();
                        }]
                    }
                })
                .state('main.myrecipes.list', {
                    url: '/list',
                    views: {
                        'display' : {
                            controller: 'MyRecipesCtrl as vm',
                            templateUrl: 'views/listRecipes.html'
                        },
                        'tools': {
                            controller: 'RecipesToolsCtrl as vm',
                            templateUrl: 'views/myRecipes.tools.html'
                        }
                    }
                })
                .state('main.myrecipes.create', {
                    url: '/create',
                    views: {
                        'display': {
                            controller: 'RecipeEditorCtrl as vm',
                            templateUrl: 'views/myrecipe.create.html'
                        }
                    },
                    resolve: {
                        recipeToEdit: function () {}
                    }
                })
                .state('main.myrecipes.edit', {
                    url: '/:name',
                    views: {
                        'display': {
                            controller: 'RecipeEditorCtrl as vm',
                            templateUrl: 'views/myrecipe.create.html'
                        }
                    },
                    resolve: {
                        recipeToEdit: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getByName($stateParams.name).$promise.then(function (recipe) {
                                return recipe;
                            });
                        }]
                    }
                })
                .state('main.myrecipes.imageupload', {
                    url: 'upload/:name',
                    views: {
                        'display': {
                            controller: 'ImageuploadCtrl as vm',
                            templateUrl: 'views/myrecipe.fileupload.html'
                        }
                    },
                    resolve: {
                        recipeToEdit: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getByName($stateParams.name).$promise.then(function (recipe) {
                                return recipe;
                            });
                        }]
                    }
                })
                .state('main.user', {
                    url: '/user',
                    template: '<ui-view/>',
                    abstract: true
                })
                .state('main.user.detail', {
                    url: '/:id',
                    controller: 'UserCtrl as vm',
                    templateUrl: 'views/user.detail.html',
                    resolve: {
                        user: ['userService', '$stateParams', function (userService, $stateParams) {
                            return userService.getById($stateParams.id).$promise.then(function (user) {
                                return user;
                            });
                        }]
                    }
                })
                .state('main.recipe', {
                    url: '/recipe',
                    abstract: true,
                    templateUrl: 'views/recipes.html'
                })
                .state('main.recipe.list', {
                    url: '/list/:query',
                    resolve: {
                        recipes: ['recipeService', '$stateParams', 'queryService', function (recipeService, $stateParams, queryService) {
                            var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                            return recipeService.getRecipeList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query)).$promise.then(function (recipes) {
                                return recipes;
                            });
                        }]
                    },
                    views: {
                        'recipelist': {
                            controller: 'RecipesCtrl as vm',
                            templateUrl: 'views/listRecipes.html'
                        }
                    }
                })
                .state('main.recipe.detail', {
                    url: '/:name',
                    resolve: {
                        recipeDetail: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getByName($stateParams.name);
                        }]
                    },
                    views: {
                        'recipedetail': {
                            controller: 'RecipeDetailCtrl as vm',
                            templateUrl: 'views/myRecipe.detail.html'
                        }
                    }
                })
                .state('main.blog', {
                    url: '/blog',
                    templateUrl: 'views/blog.html',
                    abstract: true
                })
                .state('main.blog.detail', {
                    url: '/:name',
                    resolve: {
                        blog: ['BlogService', '$stateParams', function (BlogService, $stateParams) {
                            return BlogService.getBlogByName($stateParams.name);
                        }]
                    },
                    views: {
                        'blog': {
                            controller: 'BlogCtrl as vm',
                            templateUrl: 'views/blog.detail.html'
                        }
                    }
                })
                .state('main.blog.list', {
                    url: '/list/:query',
                    resolve: {
                        blogList: ['BlogService', '$stateParams', 'queryService', function (BlogService, $stateParams, queryService) {
                            var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                            return BlogService.getBlogList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query));
                        }]
                    },
                    views: {
                        'bloglist': {
                            controller: 'ListBlogCtrl as vm',
                            templateUrl: 'views/blog.list.html'
                        }
                    }
                })
                .state('404', {
                    url: '^*path',
                    templateUrl: '/404.html'
                });

            sailsResourceProvider.configuration = {
                verbose: true, // sailsResource will log messages to console
                //prefix: 'myapi', // apply a prefix to all routes
                //socket: io.connect('http://localhost:1337'), // provide your own socket instance,
                origin: 'http://localhost:1337' // change the socket origin
            };

            $authProvider.loginUrl = API_URL + 'auth/';
            $authProvider.signupUrl = API_URL + 'auth/register';

            $httpProvider.interceptors.push('authInterceptor');

            localStorageServiceProvider.setPrefix('ls');

        }])
        .constant('API_URL', 'http://localhost:1337/')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .run(['$rootScope', '$state', '$auth', 'AUTH_EVENTS', 'authorization', 'alert', function ($rootScope, $state, $auth, AUTH_EVENTS, authorization, alert) {
                                                        /*event, toState, toParams, fromState, fromParams*/
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                /*if (toState.name === 'home' ||
                        toState.name === 'login' ||
                        toState.name === 'impressum' ||
                        toState.name === 'home' ||
                        toState.name === 'myrecipes.detail' ||
                        toState.name === 'user.detail'
                        ) {
                    return; // no need to redirect
                }

                // now, redirect only not authenticated
                if (!$auth.isAuthenticated()) {
                    event.preventDefault(); // stop current execution
                    $state.go('login'); // go to login
                }*/
            });

            /*$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });*/

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.message === AUTH_EVENTS.notAuthorized) {
                    event.preventDefault(); // stop current execution
                    $auth.logout();
                    $state.go('main.login'); // go to login
                    alert('warning', 'Not authorized!');
                }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                event.preventDefault();
                $auth.logout();
                $state.go('main.login'); // go to login
                alert('warning', 'Not authorized!');
            });

            $rootScope.$on('$sailsSocketError', function () {

            });
        }]);
}());
