Ext.define('fcab.Container.HomeAdministrador', {
    extend: 'Ext.Panel',
    xtype: 'homeAdmin',
    itemId: 'homeAdmin',
    border: null,
    width : '100%',
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    listeners: {
        beforerender: function() {
            mostrarPanelesNovedades();
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
            itemId: 'pnlIngresoMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_ingreso_personal", "Ingresar Personal", "MainIngresoPersonal");
                },
                element: 'body'
            },
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
            itemId: 'pnlSaludMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_salud", "Cambiar Salud", "MainCambioSalud");
                },
                element: 'body'
            },
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
            itemId: 'pnlAFPMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_afp", "Cambiar AFP", "MainCambioAFP");
                },
                element: 'body'
            },
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
            border: false,
            itemId: 'pnlSindicatoMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_sindicato", "Cambiar Sindicato", "MainCambioSindicato");
                },
                element: 'body'
            },
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
            itemId: 'pnlDepositoMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_deposito", "Cambiar Deposito Rem", "MainCambioDeposito");
                },
                element: 'body'
            },
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
            itemId: 'pnlCargoMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_cargo_renta", "Cambiar Cargo Renta", "MainCambioCargoRenta");
                },
                element: 'body'
            },
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
            itemId: 'pnlFiniquitoMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_finiquito_personal", "Finiquitar Personal", "MainFiniquito");
                },
                element: 'body'
            },
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
            itemId: 'pnlBonoMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_bono", "Cambiar Bonos", "MainCambioBono");
                },
                element: 'body'
            },
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
            itemId: 'pnlHaberRRLLMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_ing_haber_rrll", "Haber RRLL", "MainIngHaberRRLL");
                },
                element: 'body'
            },
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
            itemId: 'pnlDesRRLLMain',
            hidden: true,
            border: false,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_ing_descuento_rrll", "Descuento RRLL", "MainIngDescuentoRRLL");
                },
                element: 'body'
            },
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
            itemId: 'pnlOtrosMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_cambio_otros", "Cambiar Otros", "MainCambioOtros");
                },
                element: 'body'
            },
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
            itemId: 'pnlAusentismoMain',
            hidden: true,
            style: 'cursor: pointer;',
            listeners: {
                dblclick: function() {
                    dblClickPanelNovedad("menu_ausentismo", "Ausentismo", "MainAusentismo");
                },
                element: 'body'
            },
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
        padding: '10',
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
        padding: '20 10',
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

var dblClickPanelNovedad = function (id, tituloTab, formulario) {
    addTab(id, tituloTab, "icon-listaTab", formulario, 1);
}

var mostrarPanelesNovedades = function() {
    ROL_ACCIONES.forEach(accion => {
        var estado = accion.ESTADO;
        var acc = accion.PFK_ACCION;
        var pantalla = accion.PFK_PANTALLA;

        var pnlIngreso = Ext.ComponentQuery.query('#homeAdmin #pnlIngresoMain')[0];
        var pnlSalud = Ext.ComponentQuery.query('#homeAdmin #pnlSaludMain')[0];
        var pnlAFP = Ext.ComponentQuery.query('#homeAdmin #pnlAFPMain')[0];
        var pnlSindicato = Ext.ComponentQuery.query('#homeAdmin #pnlSindicatoMain')[0];
        var pnlDeposito = Ext.ComponentQuery.query('#homeAdmin #pnlDepositoMain')[0];
        var pnlCargo = Ext.ComponentQuery.query('#homeAdmin #pnlCargoMain')[0];
        var pnlFiniquito = Ext.ComponentQuery.query('#homeAdmin #pnlFiniquitoMain')[0];
        var pnlOtros = Ext.ComponentQuery.query('#homeAdmin #pnlOtrosMain')[0];
        var pnlBono = Ext.ComponentQuery.query('#homeAdmin #pnlBonoMain')[0];
        var pnlDesRRLL = Ext.ComponentQuery.query('#homeAdmin #pnlDesRRLLMain')[0];
        var pnlHaberRRLL = Ext.ComponentQuery.query('#homeAdmin #pnlHaberRRLLMain')[0];
        var pnlAusentismo = Ext.ComponentQuery.query('#homeAdmin #pnlAusentismoMain')[0];

        if(pantalla == 'AUSENTISMO' && acc == 'VER' && estado == 'A'){
            pnlAusentismo.show();
        }

        if(pantalla == 'CAMBIO_AFP' && acc == 'VER' && estado == 'A'){
            pnlAFP.show();
        }

        if(pantalla == 'CAMBIO_BONO' && acc == 'VER' && estado == 'A'){
            pnlBono.show();
        }

        if(pantalla == 'CAMBIO_CARGO' && acc == 'VER' && estado == 'A'){
            pnlCargo.show();
        }

        if(pantalla == 'CAMBIO_DEPOSITO' && acc == 'VER' && estado == 'A'){
            pnlDeposito.show();
        }

        if(pantalla == 'CAMBIO_OTROS' && acc == 'VER' && estado == 'A'){
            pnlOtros.show();
        }

        if(pantalla == 'CAMBIO_SALUD' && acc == 'VER' && estado == 'A'){
            pnlSalud.show();
        }

        if(pantalla == 'CAMBIO_SINDICATO' && acc == 'VER' && estado == 'A'){
            pnlSindicato.show();
        }

        if(pantalla == 'FINIQUITO' && acc == 'VER' && estado == 'A'){
            pnlFiniquito.show();
        }

        if(pantalla == 'INGRESO_DESCUENTO_RRLL' && acc == 'VER' && estado == 'A'){
            pnlDesRRLL.show();
        }

        if(pantalla == 'INGRESO_HABER_RRLL' && acc == 'VER' && estado == 'A'){
            pnlHaberRRLL.show();
        }

        if(pantalla == 'INGRESO_PERSONAL' && acc == 'VER' && estado == 'A'){
            pnlIngreso.show();
        }
    });
}

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
                        p_rol: ROL,
                        p_usuario: NOMBRE
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
    style: 'cursor: pointer;',
    listeners: {
        dblclick: function() {
            ventanaDinamica("HomeAdministradorCC", "Detalle Centro de Costos (EN ESPERA)", "600", "", "HomeAdministradorCC", 1, 0, null, 'EN ESPERA');
        },
        element: 'body'
    },
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
    style: 'cursor: pointer;',
    listeners: {
        dblclick: function() {
            ventanaDinamica("HomeAdministradorCC", "Detalle Centro de Costos (TERMINADO)", "600", "", "HomeAdministradorCC", 1, 0, null, 'TERMINADO');
        },
        element: 'body'
    },
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
    style: 'cursor: pointer;',
    listeners: {
        dblclick: function() {
            ventanaDinamica("HomeAdministradorPerson", "Detalle Trabajadores (EN ESPERA)", "1000", "", "HomeAdministradorPerson", 1, 0, null, 'EN ESPERA');
        },
        element: 'body'
    },
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
    style: 'cursor: pointer;',
    listeners: {
        dblclick: function() {
            ventanaDinamica("HomeAdministradorPerson", "Detalle Trabajadores (TERMINADO)", "1000", "", "HomeAdministradorPerson", 1, 0, null, 'TERMINADO');
        },
        element: 'body'
    },
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
