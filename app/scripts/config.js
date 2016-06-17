var required = {

    paths: {
        // Core
        'jquery': '../../public/packages/jquery/dist/jquery',
        'underscore': '../../public/packages/underscore/underscore',
        'backbone': '../../public/packages/backbone/backbone',
        'backbone.babysitter': '../../public/packages/backbone.babysitter/lib/' +
                               'backbone.babysitter',
        'backbone.historytracker': '../../public/packages/' +
                                   'backbone-historytracker/' +
                                   'backbone.historytracker',
        'backbone.routefilter': '../../public/packages/backbone.routefilter/' +
                                'src/backbone.routefilter',
        'backbone.wreqr': '../../public/packages/backbone.wreqr/lib/' +
                          'backbone.wreqr',
        'backbone.picky': '../../public/packages/backbone.picky/lib/amd/' +
                          'backbone.picky',
        'handlebars': '../../public/scripts/handlebars',
        'handlebars-intl': '../../public/packages/handlebars-intl/dist/handlebars-intl',
        'intl': '../../public/packages/intl/dist/Intl',
        'marionette': '../../public/packages/backbone.marionette/lib/core/' +
                      'backbone.marionette',
        'marionette.formview': '../../public/packages/marionette.formview/' +
                               'dist/FormView',
        'store': '../../public/packages/store.js/store',
        'cocktail': '../../public/packages/cocktail/Cocktail',
        'moment': '../../public/packages/moment/min/moment-with-langs',
        'bugsnag': '../../public/packages/bugsnag/src/bugsnag',
        // Compilation aliases
        'templates': '../../public/scripts/templates/compiled',
        // Framework
        'foundation': '../../public/packages/foundation/js/foundation/' +
                      'foundation',
        'foundation.dropdown': '../../public/packages/foundation/js/' +
                               'foundation/foundation.dropdown',
        'foundation.interchange': '../../public/packages/foundation/js/' +
                                  'foundation/foundation.interchange',
        'foundation.reveal': '../../public/packages/foundation/js/foundation/' +
                             'foundation.reveal',
        'foundation.topbar': '../../public/packages/foundation/js/foundation/' +
                             'foundation.topbar',
        // Plugins & Patches
        'i18n': '../../public/packages/requirejs-i18n/i18n',
        'text': '../../public/packages/requirejs-text/text',
        'base64': '../../public/packages/base64/base64',
        'console-shim': '../../public/packages/console-shim/console-shim',
        'jquery.cookie': '../../public/packages/jquery.cookie/jquery.cookie',
        'jquery.event.move': '../../public/packages/jquery.event.move/js/' +
                             'jquery.event.move',
        'jquery.event.swipe': '../../public/packages/jquery.event.swipe/js/' +
                              'jquery.event.swipe',
        'jquery.flexslider': '../../public/packages/jquery.flexslider/' +
                             'jquery.flexslider',
        'jquery.tabbable': '../../public/packages/jquery.tabbable/' +
                           'jquery.tabbable',
        'jquery.tabguard': '../../public/packages/jquery.tabguard/' +
                           'jquery.tabguard1.0',
        'jquery.transit': '../../public/packages/jquery.transit/jquery.transit',
        'jquery.visible': '../../public/packages/jquery.visible/jquery.visible',
        'jquery.tipsy': '../../public/packages/tipsy/src/javascripts/jquery.tipsy',
        'placeholders': '../../public/scripts/placeholders.jquery.min',
        'trmix': '../../public/packages/trmix/dist/trmix.min',
        // Dev Helpers
        'squire': '../../../test/lib/squire'
    },

    shim: {
        'backbone.historytracker': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'backbone.routefilter': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'bugsnag': {
            exports: 'Bugsnag'
        },
        'console-shim': {
            exports: 'console'
        },
        'foundation': {
            deps: ['jquery'],
            exports: 'Foundation'
        },
        'foundation.dropdown': {
            deps: ['foundation']
        },
        'foundation.interchange': {
            deps: ['foundation']
        },
        'foundation.reveal': {
            deps: ['foundation']
        },
        'foundation.topbar': {
            deps: ['foundation']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'handlebars-intl': {
            exports: 'HandlebarsIntl',
            deps: ['intl']
        },
        'intl': {
            exports: 'Intl'
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'jquery.flexslider': {
            deps: ['jquery']
        },
        'jquery.tabbable': {
            deps: ['jquery']
        },
        'jquery.tabguard': {
            deps: ['jquery']
        },
        'jquery.tipsy': {
            deps: ['jquery']
        },
        'placeholders': {
            exports: 'Placeholders',
            deps: ['jquery']
        },
        'store': {
            exports: 'store'
        },
        'underscore': {
            exports: '_'
        }
    }

};
