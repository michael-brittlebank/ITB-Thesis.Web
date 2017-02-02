/*
 this follows the namespacing pattern listed here https://addyosmani.com/blog/essential-js-namespacing/
 */

var app = {

    //libraries (highest level for ease of use)
    ajax: {},
    animations: {},
    handlebars: {},
    helpers: {},
    mediaQueries: {},

    //services
    services: {
        data: {}
    },

    //templates
    views: {
        homepage:{},
        error404:{},
        error500:{}
    },

    //functions
    init: function(){
        var views = app.views;

        //services
        app.handlebars.applyHelpers();

        //errors
        views.error404.init();
        views.error500.init();

        //views
        views.homepage.init();
    }
};

//wait for the dom to load
$(function(){
    app.init();
});