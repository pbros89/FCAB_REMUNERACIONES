var storeCagarSolicitudesCambioFicha=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/cagarSolicitudesCambioFicha',
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
                    msg: 'Problemas al cargar solicitudes',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCrearSolicitudCambioFicha=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/crearSolicitudCambioFicha',
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
                    msg: 'Problemas al crear solicitud',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCambiarEstadoEtapaSolCambioFicha=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/cambiarEstadoEtapaSolCambioFicha',
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
                    msg: 'Problemas al cambiar estado',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarPersonalVigentePorPrivilegioUsuario =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/cargarPersonalVigentePorPrivilegioUsuario',
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
                    msg: 'Problemas al cargar personal',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarRolesWFUsuario =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/cargarRolesWFUsuario',
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
                    msg: 'Problemas al cargar roles',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeAnularSolicitudCambioFicha =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/anularSolicitudCambioFicha',
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
                    msg: 'Problemas al cargar personal',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarEtapasCambiarficha =  Ext.create('Ext.data.Store', {

    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/cargarEtapasCambiarficha',
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
                    msg: 'Problemas al cargar etapas',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeValidarRolEtapa1 =  Ext.create('Ext.data.Store', {

    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/validarRolEtapa1',
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
                    msg: 'Problemas al validar rol',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});


var storeEnviarCorreoCambioEtapaWFCambioFicha =  Ext.create('Ext.data.Store', {

    proxy: {
        type:   'ajax',
        url:    JsonHost + 'WFModificarFicha/WFModificarFichaController/enviarCorreoCambioEtapaWFCambioFicha',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        timeout: 300000,
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











