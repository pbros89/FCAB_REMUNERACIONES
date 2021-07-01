var storeCargarReajustes =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/cargarReajustes',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al cargar reajuste',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCrearReajuste =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/crearReajuste',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al crear reajuste',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});



var storeCargarSimulacionReajuste =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/cargarSimulacionReajuste',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al cargar simulación',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeEliminarReajuste =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/eliminarReajuste',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al eliminar reajuste',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCrearReajusteIng =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/crearReajusteIng',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al crear ignorar',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeEliminarReajusteIng =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/eliminarReajusteIng',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al eliminar reajuste',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeEliminarReajusteIngAll =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/eliminarReajusteIngAll',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al eliminar reajuste',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarReajusteIgnorados =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'reajuste/ReajusteController/cargarReajusteIgnorados',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                Ext.MessageBox.show({
                    title: 'EXCEPCION',
                    msg: 'Problemas al cargar ignorados',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});





