Ext.define('fcab.Container.HomeAdministrador', {
    extend: 'Ext.Panel',
    xtype: 'homeAdmin',
    itemId: 'homeAdmin',
    border: null,
    width : '100%',
    padding: 30,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    listeners: {
        beforerender: function() {
            cargarConteoMensualHomeAdmin();
            refreshCargarConteoMensualHomeAdmin();
        }
    },
    scrollable: false,
    items: [{
        border: false,
        layout: {
            type: 'hbox',
        },
        width: '100%',
        padding: '10',
        items: [{
            width: '50%',
            padding: '0',
            html: '<h1>Resumen Novedades Mensual</h1>',
            border:false,
        },{
            width: '50%',
            padding: '0',
            itemId: 'pnlFecha',
            html: '',
            border:false,
        },]
    
    },{
        layout: 'hbox',
        border: false,
        items: [{
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            hidden: (ROL == 'RRLL'),
            items:[{
                html: '<h3 style="color: #25709e;">Ingresos</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlIngreso',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        },{
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            hidden: (ROL == 'RRLL'),
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Salud</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlSalud',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            hidden: (ROL == 'RRLL'),
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">AFP</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlAFP',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            hidden: (ROL == 'RRLL'),
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Sindicato</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlSindicato',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            hidden: (ROL == 'RRLL'),
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Deposito Rem</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlDeposito',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        },{
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            hidden: (ROL == 'RRLL'),
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Cargo Renta</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlCargo',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            hidden: (ROL == 'RRLL'),
            items:[{
                html: '<h3 style="color: #25709e;">Finiquito</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlFiniquito',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
                
            
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            hidden: (ROL == 'RRLL'),
            items:[{
                html: '<h3 style="color: #25709e;">Bonos</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlBono',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Haber RRLL</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlHaberRRLL',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            items:[{
                html: '<h3 style="color: #25709e;">Desc. RRLL</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlDesRRLL',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
        }, {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            hidden: (ROL == 'RRLL'),
            items:[{
                html: '<h3 style="color: #25709e;">Otros</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlOtros',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
        },{
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            margin: '10px',
            border: false,
            hidden: (ROL == 'RRLL'),
            items:[{
                html: '<h3 style="color: #25709e;">Ausentismo</h3>',
                border: false
            },{
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                width: 75,
                height: 75,
                boder:false,
                margin: 0,
                padding: 0,
                style: "border: 5px solid #25709e; border-radius: 50px;",
                items: [{
                    itemId: 'pnlAusentismo',
                    border: false,
                    html: '<h2 style= "margin-top:15px; color: #25709e;">0</h2>'
                    
                }]
            }]
        }]
    }, {
        itemId: 'pnlProcesoInactivo',
        border: false,
        hidden: true,
        layout: {
            type: 'hbox',
        },
        width: '50%',
        padding: '50',
        items: [{
            width: '100%',
            height: 100,
            padding: '0',
            style: "border: 5px solid #e74c3c; border-radius: 50px;",
            bodyStyle: 'background-color: #e74c3c;',
            html: '<h1 style="text-align: center; color:white; margin:35 0 0 0">Proceso Mensual Inactivo</h1>',
            border:false,
        }]
    
    },{
        itemId: 'pnlProcesoActivo',
        border: false,
        hidden: true,
        layout: {
            type: 'hbox',
        },
        width: '100%',
        padding: '30',
        items: [{
            itemId: 'pnlProcesoActivo1',
            width: '50%',
            padding: '0',
            html: '<h1>Resumen Proceso Mensual</h1>',
            border:false,
        },{
            itemId: 'pnlProcesoActivo2',
            width: '50%',
            itemId: 'pnlEstado',
            padding: '0',
            html: '<h2 style="text-align: right; color:#e74c3c;">INACTIVO</h2>',
            border:false,
        },]
    
    },{
        border: false,
        layout: {
            type: 'hbox',
        },
        width: '100%',
        padding: '0 10 10 10',
        items: [{
            width: '25%',
            itemId: 'pnlTipo',
            html: '',
            border: false,
        },{
            width: '25%',
            itemId: 'pnlPeriodo',
            html: '',
            border: false,
        },{
            width: '25%',
            itemId: 'pnlInicio',
            html: '',
            border: false,
        },{
            width: '25%',
            itemId: 'pnlTermino',
            html: '',
            border: false,
        }]
    
    },{
        layout: 'hbox',
        border: false,
        itemId: 'pnlProceso',
        items: [ ]
    }, ]

});

var cargarConteoMensualHomeAdmin = function() {
    var pnlFecha = Ext.ComponentQuery.query('#homeAdmin #pnlFecha')[0];
    pnlFecha.setHtml('<h3 style= "text-align:right;"> '+obtenerMesAnio()+'</h3>'),

    storeCargarConteoMensual.load({
        params: {
            p_cod_emp : EMPRESA
        },
        callback: function(records, operation, success) {
            var pnlIngreso = Ext.ComponentQuery.query('#homeAdmin #pnlIngreso')[0];
            var pnlSalud = Ext.ComponentQuery.query('#homeAdmin #pnlSalud')[0];
            var pnlAFP = Ext.ComponentQuery.query('#homeAdmin #pnlAFP')[0];
            var pnlSindicato = Ext.ComponentQuery.query('#homeAdmin #pnlSindicato')[0];
            var pnlDeposito = Ext.ComponentQuery.query('#homeAdmin #pnlDeposito')[0];
            var pnlCargo = Ext.ComponentQuery.query('#homeAdmin #pnlCargo')[0];
            var pnlFiniquito = Ext.ComponentQuery.query('#homeAdmin #pnlFiniquito')[0];
            var pnlOtros = Ext.ComponentQuery.query('#homeAdmin #pnlOtros')[0];
            var pnlBono = Ext.ComponentQuery.query('#homeAdmin #pnlBono')[0];
            var pnlDesRRLL = Ext.ComponentQuery.query('#homeAdmin #pnlDesRRLL')[0];
            var pnlHaberRRLL = Ext.ComponentQuery.query('#homeAdmin #pnlHaberRRLL')[0];
            var pnlAusentismo = Ext.ComponentQuery.query('#homeAdmin #pnlAusentismo')[0];

            if(records != null && records.length > 0) {
                pnlIngreso.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.INGRESO+'</h2>');
                pnlSalud.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.SALUD+'</h2>');
                pnlAFP.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.AFP+'</h2>');
                pnlSindicato.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.SINDICATO+'</h2>');
                pnlDeposito.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.DEPOSITO+'</h2>');
                pnlCargo.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.CARGO+'</h2>');
                pnlFiniquito.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.FINIQUITO+'</h2>');
                pnlOtros.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.OTROS+'</h2>');
                pnlBono.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.BONO+'</h2>');
                pnlHaberRRLL.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.HABER_RRLL+'</h2>');
                pnlDesRRLL.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.DESCUENTO_RRLL+'</h2>');
                pnlAusentismo.setHtml('<h2 style= "margin-top:15px; color: #25709e;">'+records[0].data.AUSENTISMO+'</h2>')

                
            }else{
                pnlIngreso.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlSalud.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlAFP.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlSindicato.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlDeposito.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlCargo.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlFiniquito.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlOtros.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlBono.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlDesRRLL.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlHaberRRLL.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
                pnlAusentismo.setHtml('<h2 style= "margin-top:15px; color: #25709e;">0</h2>');
            }
            
        }
    });

    storeCargarProcesosMensualHome.load({
        params: {
            p_cod_emp : EMPRESA,
            p_estado : "EN ESPERA"
        },
        callback: function(records, operation, success) {
            console.log(records);
            var pnlEstado = Ext.ComponentQuery.query('#homeAdmin #pnlEstado')[0];
            var pnlTipo = Ext.ComponentQuery.query('#homeAdmin #pnlTipo')[0];
            var pnlPeriodo = Ext.ComponentQuery.query('#homeAdmin #pnlPeriodo')[0];
            var pnlInicio = Ext.ComponentQuery.query('#homeAdmin #pnlInicio')[0];
            var pnlTermino = Ext.ComponentQuery.query('#homeAdmin #pnlTermino')[0];
            var pnlProceso = Ext.ComponentQuery.query('#homeAdmin #pnlProceso')[0];
            var pnlProcesoInactivo = Ext.ComponentQuery.query('#homeAdmin #pnlProcesoInactivo')[0];
            var pnlProcesoActivo = Ext.ComponentQuery.query('#homeAdmin #pnlProcesoActivo')[0];
            pnlProceso.removeAll();
            if(records != null && records.length > 0) {
                pnlTipo.setHtml('<h4 style="text-align: left">Tipo: '+records[0].data.PK_TIPO+'</h4>');
                pnlPeriodo.setHtml('<h4 style="text-align: center">Periodo: '+records[0].data.PK_PROCESO+'</h4>');
                pnlInicio.setHtml('<h4 style="text-align: center">Inicio: ' +records[0].data.INICIO + '</h4>');
                pnlTermino.setHtml('<h4 style="text-align: right">Termino: '+records[0].data.TERMINO +'</h4>');
                pnlEstado.setHtml('<h2 style="text-align: right; color:#4cd385;">ACTIVO</h2>');
                pnlProcesoInactivo.hide();
                pnlProcesoActivo.show();
                storeCargarDetalleProcesoMensual.load({
                    params : {
                        p_cod_emp: EMPRESA,
                        p_anho: records[0].data.ANHO,
                        p_mes: records[0].data.MES,
                        p_tipo: records[0].data.PK_TIPO,
                    },
                    callback: function(records, operation, success) {
                        console.log(records);
                        if(records !== null && records.length > 0) {
                            pnlProceso.add(pnlProcesoItems(records[0].data.CC_ESPERA, records[0].data.CC_TERMINADO, records[0].data.PERSONA_ESPERA, records[0].data.PERSONA_TERMINADO));
                        }
                    }
                });

            }else{
                pnlEstado.setHtml('<h2 style="text-align: right; color:#e74c3c;">INACTIVO</h2>');
                pnlProceso.removeAll();
                pnlTipo.setHtml('');
                pnlPeriodo.setHtml('');
                pnlInicio.setHtml('');
                pnlTermino.setHtml('');
                pnlProcesoInactivo.show();
                pnlProcesoActivo.hide();
                
            }
            
        }
    })

};


var pnlProcesoItems = function (ccEsp, ccTer, traEsp, traTer){
    
    return [{
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    margin: '10px',
    padding: '10px',
    border: false,
    items:[{
        itemId: 'titCcEsp',
        html: '<h2 style="color: #e74c3c;">CC En Espera</h2>',
        border: false
    },{
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        width: 100,
        height: 100,
        boder:false,
        margin: 0,
        padding: 0,
        style: "border: 5px solid #e74c3c; border-radius: 50px;",
        items: [{
            border: false,
            html: '<h1 style= "margin-top:10px; color: #e74c3c;">'+ccEsp+'</h1>'
            
        }]
    }]
        
    
},{
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    margin: '10px',
    padding: '10px',
    border: false,
    items:[{
        html: '<h2 style="color: #4cd385;">CC Terminados</h2>',
        border: false
    },{
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        width: 100,
        height: 100,
        boder:false,
        margin: 0,
        padding: 0,
        style: "border: 5px solid #4cd385; border-radius: 50px;",
        items: [{
            border: false,
            html: '<h1 style= "margin-top:10px; color: #4cd385;">'+ccTer+'</h1>'
            
        }]
    }]
        
    
}, {
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    margin: '10px',
    padding: '10px',
    border: false,
    items:[{
        html: '<h2 style="color: #e74c3c;">Trabajadores En Espera</h2>',
        border: false
    },{
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        width: 100,
        height: 100,
        boder:false,
        margin: 0,
        padding: 0,
        style: "border: 5px solid #e74c3c; border-radius: 50px;",
        items: [{
            border: false,
            html: '<h1 style= "margin-top:10px; color: #e74c3c;">'+traEsp+'</h1>'
            
        }]
    }]
        
    
}, {
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    margin: '10px',
    padding: '10px',
    border: false,
    items:[{
        html: '<h2 style="color: #4cd385;">Trabajadores Terminados</h2>',
        border: false
    },{
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        width: 100,
        height: 100,
        boder:false,
        margin: 0,
        padding: 0,
        style: "border: 5px solid #4cd385; border-radius: 50px;",
        items: [{
            border: false,
            html: '<h1 style= "margin-top:10px; color: #4cd385;">'+traTer+'</h1>'
            
        }]
    }]
        
    
}];
}

var refreshCargarConteoMensualHomeAdmin = function(){
    setInterval(function(){
        cargarConteoMensualHomeAdmin();
    }, 120000);
};
