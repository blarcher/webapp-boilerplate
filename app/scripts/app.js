define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',
    'utils'
], function (
    $,
    _,
    Backbone,
    Marionette,
    state,
    utils
) {
    'use strict';
    /**
     * The main application constructor.
     *
     * @class App
     * @constructor
     * @module main
     */

    var App = Marionette.Application.extend({
        initialize: function () {
            /**
             * Prepares the application for `start`, attaches callbacks to
             * router initialization, listens to application-level collections
             * for `sync`, and gets the boot process rolling by calling `fetch`.
             *
             * @method initialize
             */
            _.bindAll(this, 'start', 'onTenantDetermined');

            // this.addRegions({
            //     notificationTop: '#main-notification-top',
            //     warning: '#main-warning',
            //     titleNav: '#main-header .title-nav',
            //     mainNav: '#main-header .main-nav',
            //     userNav: '#main-header .user-nav',
            //     content: '#main-content',
            //     footer: '#main-footer',
            //     footerNav: '#footer .title-nav',
            //     copyright: '#footer .copyright',
            //     notificationBottom: '#main-notification-bottom',
            //     quickControls: '#main-quick-controls',
            //     mainModal: '#main-modal .content'
            // });

            // Notifications and quick controls must be listened for *before* the
            // app is started.
            // this.listenForNotificationRender();
            // this.listenForQuickControlsRender();
            //
            // this.addInitializers([
            //     this.listenForWarningRender,
            //     this.listenForNavigation,
            //     this.listenForContentRender,
            //     this.renderCopyright
            // ]);

            this.listenTo(this, {
                // 'zuora:response': this.onZuoraResponse,
                'app:routers:initialized': this.renderStaticNav
            });

            this.determineTenant();
        },
        fetch: function () {
            /**
             * Fetches application-level collections. When these collections
             * have been parsed, call `start` on the application.
             *
             * @method fetch
             */
            var search = utils.searchParamsToJSON();

            // if (search.country && search.time) {
            //     state.vent.trigger('country:set', search.country);
            //     state.vent.trigger('time:set', search.time);
            //
            //     state.vent.trigger('is:previewing:set', true);
            // }

            state.rootCollection.fetch();
            state.sectionCollection.fetch();
            // state.supportedLanguages.fetch();

            $.when(
                state.rootCollection.parsed,
                state.sectionCollection.parsed
                // state.supportedLanguages.parsed
            ).done(
                this.start
            );
        },
        determineTenant: function () {
            state.tenantModel.fetch({
                success: this.onTenantDetermined
            });
        },
        onTenantDetermined: function (attrs) {
            state.rootCollection.baseUrl = state.tenantModel.get('url');

            this.listenTo(
                state.rootCollection,
                'state:models:removed',
                this.renderRootNav
            );

            this.fetch();
        },
        start: function (options) {
            /**
             * Starts the application. In addition to calling out to the
             * prototype's `start`, this method initializes all application
             * routers and invokes `Backbone.history.start`.
             *
             * If the current route is not valid, display a page not found view.
             *
             * @method start
             * @param {Object} options An optional options object passed to
             * `Marionette.Application.prototype`.
             */
            var isValidRoute;

            Marionette.Application.prototype.start.call(this, options);

            state.vent.trigger('app:before:layout');

            this.initRootRouters();
            this.initAppRouters();

            isValidRoute = Backbone.history.start({pushState: true});

            if (!isValidRoute) {
                state.vent.trigger('error:invalid:route');
            }

            state.vent.trigger('app:started');
        },
        initRootRouters: function () {
            /**
             * Iterates through the global `rootCollection` and initializes a
             * router for each model contained within.
             *
             * @method initRootRouters
             */
            state.rootCollection.each(this.initRootRouter, this);
        },
        initRootRouter: function (model) {
            /**
             * Initialize a `RootRouter` for a model contained within the global
             * `rootCollection`.
             *
             * These routers are passed an associated controller, a method name
             * attached to the controller, and an array of slugs each router
             * will respond to. In most cases, this will be a single
             * first-segment slug (e.g. movies).
             *
             * As a convenience, attach each controller to the app object.
             *
             * @method initRootRouter
             * @param {Backbone.Model} model The model for which a router will
             * be generated.
             */
            var baseMethod = model.get('method');
            var slug = model.get('slug');
            // Special case home to also handle the empty route. For Clearleap
            // servers, also handle a request to the literal index.html file.
            var slugs = slug === 'home' ? [slug, '', 'index.html'] : [slug];
          }

    });

    return App;

});
