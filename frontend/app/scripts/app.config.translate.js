
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('config.translate', ['pascalprecht.translate']).config(['$translateProvider', function ($translateProvider) {

        $translateProvider.preferredLanguage('de');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        $translateProvider.translations('de', {
            nav: {
                link: {
                    home: 'Home',
                    recipes: 'Rezepte',
                    about: 'About',
                    impressum: 'Impressum'
                },
                dropdown: {
                    signout: ' Sign out',
                    signin: ' Sign in',
                    profile: ' Profil',
                    addrecipe: ' Rezept',
                    calendar: ' Kalender',
                    addevent: ' Termin',
                    myrecipes: ' Meine Rezepte'
                }
            },
            login: {
                headline: 'Sign in'
            }

        });

    }]);
}());
