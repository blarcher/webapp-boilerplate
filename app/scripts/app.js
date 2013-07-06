define([
    'backbone',
    'handlebars',
    'templates/compiled/main'
], function (Backbone, Handlebars, MainTemplate) {
    return Backbone.View.extend({
        el: '#main',
        model: new Backbone.Model({foo: 'Hello'}),
        initialize: function() {
            this.render();
        },
        template: MainTemplate,
        render: function(){
            this.el.innerHTML = this.template(this.model.attributes);
        }
    });
});
