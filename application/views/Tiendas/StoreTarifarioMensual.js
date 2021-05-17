var storeCargarTarifasMensuales =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/cargarTarifasMensuales',
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
                    msg: 'Problemas al cargar las tarifas',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarValidacionErroresTarifario =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/cargarValidacionErroresTarifario',
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
                    msg: 'Problemas al validar',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeIniciarTarifarioMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/iniciarTarifarioMensual',
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
                    msg: 'Problemas al iniciar tarifario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeTraspasarTarifarioMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/traspasarTarifarioMensual',
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
                    msg: 'Problemas traspasar tarifario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeEliminarTarifarioMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/eliminarTarifarioMensual',
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
                    msg: 'Problemas al eliminar tarifario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeTerminarTarifarioMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/terminarTarifarioMensual',
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
                    msg: 'Problemas al terminar tarifario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeAnularTarifarioMensual =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/anularTarifarioMensual',
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
                    msg: 'Problemas al anular tarifario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});


var storeCargarTarifaMensualGuias =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/cargarTarifaMensualGuias',
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
                    msg: 'Problemas al cargar guias',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});


var storeCargarTarifaMensualDet =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'tarifarioMensual/TarifarioMensualController/cargarTarifaMensualDet',
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
                    msg: 'Problemas al cargar tarifas',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});


