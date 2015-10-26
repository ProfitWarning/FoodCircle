
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('config.translate', ['pascalprecht.translate']).config(['$translateProvider', function ($translateProvider) {

        $translateProvider.useSanitizeValueStrategy('sanitizeParameters')
            .registerAvailableLanguageKeys(['en', 'de'], {
                'en_*': 'en',
                'de_*': 'de'
            })
            .fallbackLanguage('de')
            .determinePreferredLanguage();

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
                    recipe: {
                        editimage: ' Bilder bearbeiten',
                        addingrediant: ' hinzufügen',
                        addrecipe: '',
                        saveeditimage: ' Speichern / Bilder bearbeiten'
                    },
                    save: ' Speichern'

                },
                label: {
                    recipe: {
                        name: 'Name',
                        description: 'Zubereitung',
                        ingredients: 'Zutaten',
                        addrecipe: 'Rezept hinzufügen'
                    },
                    event: {
                        title: 'Titel',
                        description: 'Beschreibung',
                        eventstart: 'Terminbeginn',
                        eventend: 'Terminende',
                        timestart: 'Beginn',
                        timeend: 'Ende'
                    }
                },
                placeholder: {
                    name: 'Name',
                    description: 'Zubereitung',
                    amount: 'Menge',
                    ingredient: 'Zutat'
                },
                validation: {
                    required: {
                        recipe: {
                            amount: 'Menge wird benötigt',
                            name: 'Name wird benötigt',
                            description: 'Zubereitung wird benötigt',
                            unit: 'Einheit wird benötigt'
                        },

                        event: {
                            description: 'Beschreibung wird benötigt',
                            title : 'Titel wird benötigt',
                            date: 'Datum wird benötigt'
                        }
                    }
                }
            },
            profile: {
                label: {
                    headline: 'Dein Profil',
                    myrecipes: 'Meine Rezepte',
                    myevents: 'Meine Zirkeltermine'
                }
            },
            home: {
                headline: {
                    latestrecipes: 'Neuste Rezepte'
                }
            }
        });

        $translateProvider.translations('en', {
            nav: {
                link: {
                    home: 'Home',
                    recipes: 'Recipes',
                    about: 'About',
                    impressum: 'Impressum'
                },
                dropdown: {
                    signout: ' Sign out',
                    signin: ' Sign in',
                    profile: ' Profile',
                    addrecipe: ' Recipe',
                    calendar: ' Calendar',
                    addevent: ' Event',
                    myrecipes: ' My Recipes'
                }
            },
            login: {
                headline: 'Sign in'
            },
            recipe: {
                name: '',
                description: 'Preparation',
                ingrediants: 'Ingredients',
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
                    recipe: {
                        editimage: ' Edit images',
                        addingrediant: ' add',
                        addrecipe: ''
                    },
                    save: ' Save'

                },
                label: {
                    recipe: {
                        name: 'Name',
                        description: 'Preperation',
                        ingredients: 'Ingredients',
                        addrecipe: 'Add recipe'
                    },
                    event: {
                        title: 'Titel',
                        description: 'Description',
                        eventstart: 'Event start',
                        eventend: 'Event end',
                        timestart: 'Start',
                        timeend: 'End'
                    }
                },
                placeholder: {
                    name: 'Name',
                    description: 'Preperation',
                    amount: 'Amount',
                    ingredient: 'Ingredient'
                },
                validation: {
                    required: {
                        recipe: {
                            amount: 'Amount is required',
                            name: 'Name is required',
                            description: 'Description is required',
                            unit: 'Unit is required'
                        },

                        event: {
                            description: 'Description is required',
                            title : 'Title is required',
                            date: 'Date is required'
                        }
                    }
                }
            },
            profile: {
                label: {
                    headline: 'Your profile',
                    myrecipes: 'My recipes',
                    myevents: 'My events'
                }
            },
            home: {
                headline: {
                    latestrecipes: 'Latest recipes'
                }
            }
        });

    }]);
}());
