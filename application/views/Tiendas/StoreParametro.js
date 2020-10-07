var storeCargarParametros =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametros',
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarTiposParam =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarTiposParam',
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
                    msg: 'Problemas al cargar tipos de parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: true
});

var storeCargarTiposParamFiltro =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarTiposParam',
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
                    msg: 'Problemas al cargar tipos de parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCrearParametro =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/crearParametro',
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
                    msg: 'Problemas al crear cargo',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeModificarParametro =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/modificarParametro',
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
                    msg: 'Problemas al modificar cargo',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_INE =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'INE',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_INSTITUCION_APV =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'INSTITUCION_APV',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_REGIMEN_APV =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'REGIMEN_APV',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_TIPO_CONTRATO=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CONTRATO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_JORNADA =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'JORNADA',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_AFP =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'AFP',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_SALUD =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'SALUD',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});



var storeCargarParam_SINDICATO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'SINDICATO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_ADHERIDO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'ADHERIDO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_SEXO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'SEXO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_BANCO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'BANCO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_ESTADO_CIVIL =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'ESTADO_CIVIL',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_NIVEL_EDUCACION =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'NIVEL_EDUCACION',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_FORMA_PAGO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'FORMA_PAGO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_CUENTA_AHORRO2 =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'CUENTA_AHORRO2',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_CAUSAL_DESPIDO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'CAUSAL_DESPIDO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_TIPO_CAMBIO_AFP =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CAMBIO_AFP',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_TIPO_CAMBIO_SALUD =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CAMBIO_SALUD',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_TIPO_CAMBIO_CARGO_R =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CAMBIO_CARGO_R',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_TIPO_CAMBIO_OTROS =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CAMBIO_OTROS',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});



var storeCargarParam_TIPO_CAMBIO_SINDICATO =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_CAMBIO_SINDICAT',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_TIPO_DESCUENTO_RRLL =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_DESCUENTO_RRLL',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_TIPO_HABER_RRLL =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'TIPO_HABER_RRLL',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_AUSENTISMO=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'AUSENTISMO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_GERENCIA =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'GERENCIA',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_DEPARTAMENTO=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'DEPARTAMENTO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_LUGAR_TRABAJO=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'LUGAR_TRABAJO',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_CIUDAD =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'CIUDAD',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_NACIONALIDAD =  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'NACIONALIDAD',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_COMUNA=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'COMUNA',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});

var storeCargarParam_PAIS=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'PAIS',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});


var storeCargarParam_INVALIDEZ=  Ext.create('Ext.data.Store', {
   
    proxy: {
        type:   'ajax',
        url:    JsonHost + 'parametro/ParametroController/cargarParametrosFiltro',
        extraParams: {
            p_tipo: 'INVALIDEZ',
            p_cod_emp: EMPRESA
        },
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
                    msg: 'Problemas al cargar parametros',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
            
        }
    },
    autoLoad: false
});








