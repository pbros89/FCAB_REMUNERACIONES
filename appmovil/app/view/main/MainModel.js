/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('appmovil.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'appmovil',
        letras: 'Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas.'
    },
    
    stores:{
        storeMenuUsuario: {
            type: 'storeMenuUsuario'
        }
    }

});
