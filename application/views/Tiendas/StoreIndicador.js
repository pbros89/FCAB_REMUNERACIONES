var storeCargarConteoMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'indicador/IndicadorController/cargarConteoMensual',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
            }
            
            
        }
    },
    autoLoad: false
});
