(function () {
    'use strict';

    angular.module('foodCircle').config(['$stateProvider', '$urlRouterProvider', 'sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL', 'localStorageServiceProvider',
        function ($stateProvider, $urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL, localStorageServiceProvider) {

            $urlRouterProvider.when('', '/home');

            $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    controller: 'MainCtrl as vm',
                    templateUrl: 'views/main.html',
                    resolve: {
                        recipeList: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getRecipeList({where: {id: {'!': ''}}, imit: 6, sort: 'updatedAt DESC'}).$promise.then(function (recipeList) {
                                return recipeList;
                            });
                        }]
                    }
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('impressum', {
                    url: '/impressum',
                    templateUrl: 'views/impressum.html'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html'
                })
                .state('logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl'
                })
                .state('editrecipe', {
                    url: '/editrecipe',
                    controller: 'RecipeEditorCtrl as vm',
                    templateUrl: 'views/editRecipe.html'
                })
                .state('myrecipes', {
                    url: '/myrecipes',
                    templateUrl: 'views/myRecipes.html',
                    resolve: {
                        authorize: ['authorization', function (authorization) {
                            return authorization.authorize();
                        }]
                    }
                })
                .state('myrecipes.list', {
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
                .state('myrecipes.create', {
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
                .state('myrecipes.edit', {
                    url: '/:id',
                    views: {
                        'display': {
                            controller: 'RecipeEditorCtrl as vm',
                            templateUrl: 'views/myrecipe.create.html'
                        }
                    },
                    resolve: {
                        recipeToEdit: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getById($stateParams.id).$promise.then(function (recipe) {
                                return recipe;
                            });
                        }]
                    }
                })
                .state('user', {
                    url: '/user',
                    template: '<ui-view/>',
                    abstract: true
                })
                .state('user.detail', {
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
                .state('recipes', {
                    url: '/recipes',
                    controller: 'RecipesCtrl as vm',
                    templateUrl: 'views/recipes.html',
                    resolve: {
                        recipes: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getRecipeList({where: {id: {'!': ''}}, sort: 'updatedAt DESC'}).$promise.then(function (recipes) {
                                return recipes;
                            });
                        }]
                    }
                })
                .state('recipe.detail', {
                    url: '/:id',
                    controller: 'RecipeDetailCtrl as vm',
                    templateUrl: 'views/myRecipe.detail.html',
                    resolve: {
                        recipeDetail: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                            return recipeService.getRecipeList({where: {id: {'!': ''}}, imit: 6, sort: 'updatedAt DESC'}).$promise.then(function (recipeList) {
                                return recipeList;
                            });
                        }]
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
        .run(['$rootScope', '$location', '$state', '$auth', 'AUTH_EVENTS', 'authorization', 'alert', function ($rootScope, $location, $state, $auth, AUTH_EVENTS, authorization, alert) {
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

            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.message === AUTH_EVENTS.notAuthorized) {
                    event.preventDefault(); // stop current execution
                    $auth.logout();
                    $state.go('login'); // go to login
                    alert('warning', 'Not authorized!');
                }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                event.preventDefault();
                $auth.logout();
                $state.go('login'); // go to login
                alert('warning', 'Not authorized!');
            });

            $rootScope.$on('$sailsSocketError', function () {

            });
        }]);
}());
