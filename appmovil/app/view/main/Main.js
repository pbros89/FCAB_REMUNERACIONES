/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */

Ext.define('appmovil.view.main.Main', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Menu',
        'appmovil.view.main.MainController',
        'appmovil.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',
    xtype: 'app-main',
    itemId: 'mainGen',
    shadow: false,
    padding: 20,
    scrollable: true,
    items: []
});