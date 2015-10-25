
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('config.translate', ['pascalprecht.translate']).config(['$translateProvider', function ($translateProvider) {

        $translateProvider.preferredLanguage('de');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

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
            },
            recipe: {
                name: '',
                description: 'Zubereitung',
                ingrediants: 'Zutaten',
                units: {
                    g: 'g',
                    kg: 'kg',
                    litre: 'Liter',
                    pinch: 'Priese(n)',
                    small: 'kleine',
                    big: 'große',
                    tin: 'Dose',
                    squirt: 'Spritzer'
                }

            },
            edit: {
                action: {
                    save: ' Speichern',
                    editimage: ' Bilder bearbeiten',
                    addingrediant: ' hinzufügen'
                },
                label: {
                    name: 'Name',
                    description: 'Zubereitung',
                    ingredients: 'Zutaten'
                },
                placeholder: {
                    name: 'Name',
                    description: 'Zubereitung',
                    amount: 'Menge',
                    ingredient: 'Zutat'
                },
                validation: {
                    required: {
                        amount: 'Menge wird benötigt',
                        name: 'Name wird benötigt',
                        description: 'Zubereitung wird benötigt',
                        unit: 'Einheit wird benötigt'
                    }
                }
            }
        });

    }]);
}());
