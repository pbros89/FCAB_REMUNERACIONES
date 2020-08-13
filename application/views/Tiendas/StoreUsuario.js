var storeCargarUsuarios =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarUsuarios',
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
                    msg: 'Problemas al cargar usuarios',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarUsuariosIntranet =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarUsuariosIntranet',
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
                    msg: 'Problemas al cargar usuarios intranet',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCrearUsuario=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/crearUsuario',
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
                    msg: 'Problemas al crear usuario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeModificarUsuario=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/modificarUsuario',
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
                    msg: 'Problemas al modificar usuario',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCrearUsuarioCC=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/crearUsuarioCC',
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
                    msg: 'Problemas al crear usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});
var storeEliminarUsuarioCC=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/eliminarUsuarioCC',
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
                    msg: 'Problemas al eliminar usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarRoles=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarRoles',
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
                    msg: 'Problemas al eliminar usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: true
});

var storeCargarRolesFiltro=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarRoles',
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
                    msg: 'Problemas al eliminar usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeCargarCCUsuarioNo =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarCCUsuarioNo',
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
                    msg: 'Problemas al cargar usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeCargarCCUsuario=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarCCUsuario',
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
                    msg: 'Problemas al cargar usuario cc',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});


var storeCargarRolesWF =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarRolesWf',
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
                    msg: 'Problemas al cargar roles wf',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeCargarRolesWfUsuario =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarRolesWfUsuario',
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
                    msg: 'Problemas al cargar roles wf',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeCargarRolesWfUsuarioNo =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/cargarRolesWfUsuarioNo',
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
                    msg: 'Problemas al cargar roles wf',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeEliminarUsuarioRolWF =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/eliminarUsuarioRolWF',
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
                    msg: 'Problemas al eliminar rol',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});

var storeCrearUsuarioRolWF =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'usuario/UsuarioController/crearUsuarioRolWF',
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
                    msg: 'Problemas al asociar rol',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    autoLoad: false
});











