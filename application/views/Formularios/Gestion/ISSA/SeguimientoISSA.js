/**
  * Contenedor
  **/
 Ext.define('fcab.Container.ISSA.Seguimiento', {
    extend: 'Ext.tab.Panel',
    xtype: 'SeguimientoISSA',
    itemId: 'SeguimientoISSA',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            storeCargarConteoEnviosIssa.load();
            storeCargarConteoPMEnviosIssa.load();
            storeCargarSeguimientAsisIssa.load();
        }
    },
    //buttonAlign: 'center',
    defaults: {
        
        scrollable: true
    },
    layout: {
        align: "stretch",
        pack: 'center'
    },
    items: [{
        title: 'Novedades',
        items:[{
            xtype: 'SeguimientoISSAGrillaNovedades',
        }]
    }, {
        title: 'Proceso Mensual',
        items:[{
            xtype: 'SeguimientoISSAGrillaPM'
        }]
    }, {
        title: 'Solicitud Asistencia',
        items:[{
            xtype: 'SeguimientoISSAGrillaSolAsis'
        }]
    }],
    
});


Ext.define('fcab.Container.ISSA.Seguimiento.GrillaNovedades', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaNovedades',
    itemId: 'SeguimientoISSAGrillaNovedades',
    store: storeCargarConteoEnviosIssa,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex: 3,
            hidden: false,
        },{
            text     : 'Por Enviar',
            sortable : true,
            dataIndex: 'CONTAR',
            align: 'center',
            hidden: false,
            width:150,
            renderer : function(value, meta) {
                var contar = parseInt(value);
                if(contar > 0) {
                    meta.style = 'color:red; font-weight:bold;';
                    return value;
                    
                }else {
                    meta.style = 'color:green; font-weight:bold;';
                    return value;
                }
            }
        },

        {
            align: 'center',
            xtype: 'actioncolumn',
            text: 'Acción',
            items: [
                {
                    iconCls: 'icon-form-upload',
                    tooltip: 'Enviar',
                    text: 'Enviar',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        enviarNovedadIssa(rec.get('NOMBRE'));
                    }
                }
            ]
        }
        
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Enviar Todos',
            itemId: 'btnEnviarTodos',
            tooltip: 'Enviar Todos',
            iconCls: 'icon-form-upload',
            handler: function () {
                enviarTodasNovedadesIssa();
                
            }
        }, {
            text: "Descargar Log",
            itemId: "btnDescargarLog",
            tooltip: "Descargar Log",
            iconCls: "icon-form-download",
            handler: function() {
                ventanaDinamica("ExportarLogNovedadesISSA", "Exportar Log Novedades", "500", "", "ExportarLogNovedadesISSA", 1, 0, null, null);
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                storeCargarConteoEnviosIssa.load();
            }

        },]
    }],
    width : '100%',
    title: 'Seguimiento de novedades por enviar',
});

Ext.define('fcab.Container.ISSA.Seguimiento.GrillaPM', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaPM',
    itemId: 'SeguimientoISSAGrillaPM',
    store: storeCargarConteoPMEnviosIssa,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1,
            hidden: false,
            renderer : function(value, meta, record) {
                if(value === 'EN ESPERA')
                {
                    meta.style = 'color:red;';
                    return 'EN ESPERA';
                }else if(value === 'TERMINADO'){
                    meta.style = 'color:green;';
                    return 'TERMINADO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'COD_EMP',
            flex: 1,
            hidden: false,
        },
        {
            text     : 'Proceso',
            sortable : true,
            dataIndex: 'PROCESO',
            flex: 1,
            hidden: false,
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'TIPO',
            flex: 1,
            hidden: false,
        },
        {
            text     : 'Enviados',
            sortable : true,
            dataIndex: 'TERMINO',
            flex: 1,
            hidden: false,
            renderer : function(value, meta, record) {
                if(record.data.TERMINO != record.data.TOTAL_REGISTROS) {
                    meta.style = 'color:red; font-weight: bold;';
                    return value;
                }else{
                    meta.style = 'color:green; font-weight: bold;';
                    return value;
                }
            }
        },
        {
            text     : 'Total',
            sortable : true,
            dataIndex: 'TOTAL_REGISTROS',
            flex: 1,
            hidden: false,
        },

        {
            align: 'center',
            xtype: 'actioncolumn',
            text: 'Acción',
            items: [
                {
                    iconCls: 'icon-form-upload',
                    tooltip: 'Enviar',
                    text: 'Enviar',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        enviarPMISSA(rec.data, 0);
                    }
                }
            ]
        }
        
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: "Descargar Log",
            itemId: "btnDescargarLog",
            tooltip: "Descargar Log",
            iconCls: "icon-form-download",
            handler: function() {
                ventanaDinamica("ExportarLogPMISSA", "Exportar Log Proceso Mensual", "500", "", "ExportarLogPMISSA", 1, 0, null, null);
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                storeCargarConteoPMEnviosIssa.load();
            }

        },]
    }],
    width : '100%',
    title: 'Seguimiento de procesos mensuales por enviar',
});


Ext.define('fcab.Container.ISSA.SolAsistencia.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaSolAsis',
    itemId: 'SeguimientoISSAGrillaSolAsis',
    store: storeCargarSeguimientAsisIssa,
    width : '100%',
    title: 'Seguimiento solicitud asistencia',
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'PFK_COD_EMP',
            flex: 1,
            hidden: true,
        },
        {
            text     : 'Periodo',
            sortable : true,
            dataIndex: 'PK_PROCESO',
            flex: 1,
            hidden: false,
        },
        {
            text     : 'Carga API ISSA',
            sortable : true,
            dataIndex: 'CARGAR_DATA',
            flex: 1,
            hidden: false,
            renderer : function(value, meta, record) {
                if(value === 'OK')
                {
                    meta.style = 'color:green;';
                }else {
                    meta.style = 'color:red;';
                }
                return value;
            }
        },
        {
            text     : 'Importar a Proceso',
            sortable : true,
            dataIndex: 'IMPORTAR_PROCESO',
            flex: 1,
            hidden: false,
            renderer : function(value, meta, record) {
                if(value === 'OK')
                {
                    meta.style = 'color:green;';
                }else {
                    meta.style = 'color:red;';
                }
                return value;
            }
        },        
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: "Guardar Data ISSA",
            itemId: "btnCargaApi",
            tooltip: "Descargar Log",
            iconCls: "icon-form-upload",
            handler: function() {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    guardarDataSolAsisIssa(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: "Ver Data ISSA",
            itemId: "btnVerApi",
            tooltip: "Ver Data",
            iconCls: "icon-form-detail",
            handler: function() {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var width = Ext.getBody().getViewSize().width > 1300 ? 1300 : Ext.getBody().getViewSize().width;
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    var rec = grid.getStore();
                    var recRow = rec.getAt(rowIndex);
                    var p_periodo = recRow.data.PK_PROCESO.replace('/', '');
                    ventanaDinamica("SeguimientoISSAGrillaSolAsisData", "Data Asistencia ISSA", width, "", "SeguimientoISSAGrillaSolAsisData", 1, 0, null, p_periodo);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
                
            }
        },{
            text: "Importar a Proceso",
            itemId: "btnImportarProceso",
            tooltip: "Importar a Proceso",
            iconCls: "icon-form-upload",
            handler: function() {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    importarDataSolAsisIssaProc(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                storeCargarSeguimientAsisIssa.load();
            }
        },]
    }],
    
});


var enviarNovedadIssa = function(nombre) {

    Ext.MessageBox.confirm('Enviar Novedades', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
        if (btn === 'yes') {   
            Ext.MessageBox.show({
                msg: 'Enviando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });

            switch(nombre) {
                case 'CONCEPTOS FINIQUITO':
                    storeISSAEnviarConceptosFiniquito.load({
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CONCEPTOS INGRESO PERSONAL':
                    storeISSAEnviarConceptosIngPersonal.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO AFP':
                    storeISSAEnviarCambioAFP.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'FINIQUITO':
                    storeISSAEnviarFiniquito.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'AUSENTISMO':
                    storeISSAEnviarAusentismo.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO BONO':
                    storeISSAEnviarCambioBono.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO CARGO RENTA':
                    storeISSAEnviarCambioCargoRenta.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO DEPOSITO':
                    storeISSAEnviarCambioDeposito.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO OTROS':
                    storeISSAEnviarCambioOtros.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO SALUD':
                    storeISSAEnviarCambioSalud.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'CAMBIO SINDICATO':
                    storeISSAEnviarCambioSindicato.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'DESCUENTOS RRLL':
                    storeISSAEnviarIngDescuentoRRLL.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'HABER RRLL':
                    storeISSAEnviarIngHaberRRLL.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
                case 'INGRESO PERSONAL':
                    storeISSAEnviarIngPersonal.load({
                        params:{p_usuario: NOMBRE},
                        callback: function(records, operation, success) {
                            Ext.MessageBox.hide();
                            storeCargarConteoEnviosIssa.load();
                            if(records != null && records[0].data.r_obs == 'OK'){
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: 'Los datos se enviaron correctamente.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Servicio ISSA',
                                    msg: records[0].data.r_obs,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                    break;
            }
        }
    });
};

var enviarTodasNovedadesIssa = function(nombre) {
    var contar = 0;
    var msg = "";
    Ext.MessageBox.confirm('Enviar Novedades', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
        if (btn === 'yes') {   
            Ext.MessageBox.show({
                msg: 'Enviando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });

            storeISSAEnviarConceptosFiniquito.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CONCEPTOS FINIQUITO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                    
                }
            });
            
            storeISSAEnviarConceptosIngPersonal.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CONCEPTOS INGRESO PERSONAL:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioAFP.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO AFP:</b> " + records[0].data.r_obs + "<br>";
                    }

                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarFiniquito.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>FINIQUITO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarAusentismo.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>AUSENTISMO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioBono.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO BONO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioCargoRenta.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO CARGO RENTA:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioDeposito.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO DEPOSITO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioOtros.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO OTROS:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioSalud.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO SALUD:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarCambioSindicato.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>CAMBIO SIDICATO:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg, 
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarIngDescuentoRRLL.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>DESCUENTOS RRLL:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });
            
            storeISSAEnviarIngHaberRRLL.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>HABER RRLL:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    } 
                }
            });

            storeISSAEnviarIngPersonal.load({
                params:{p_usuario: NOMBRE},
                callback: function(records, operation, success) {
                    contar++;
                    if(records[0].data.r_obs){
                        msg = msg + "<b>INGRESO PERSONAL:</b> " + records[0].data.r_obs + "<br>";
                    }
                    if(contar == 14) {
                        Ext.MessageBox.hide();
                        storeCargarConteoEnviosIssa.load({params:{p_usuario: NOMBRE}});
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: msg,
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                        
                    } 
                }
            });
        }
    });
            
};


var enviarPMISSA = function(record, countError) {
    var msg = '';
    var countError = countError;
         
            if(record.ESTADO == 'TERMINADO') {
                if(parseInt(record.TERMINO) < parseInt(record.TOTAL_REGISTROS)){
                    if(countError < 3) {
                        Ext.MessageBox.show({
                            msg: 'Enviando',
                            progressText: record.TERMINO + " / " + record.TOTAL_REGISTROS,
                            width: 300,
                            wait: {
                                interval: 200
                            }
                        });
                        storeISSAEnviarProcesoMensual.load({
                            params:{
                                p_usuario: NOMBRE,
                                p_proceso: record.PROCESO,
                                p_tipo: record.TIPO,
                                p_cod_emp: record.COD_EMP
                            },
                            callback: function(records, operation, success) {
                                if(records != null && records[0].data.r_obs == 'OK'){
                                    countError = 0;
                                    record.TERMINO = parseInt(record.TERMINO) + 100;
                                    if(parseInt(record.TERMINO) < parseInt(record.TOTAL_REGISTROS)){
                                        enviarPMISSA(record, countError);
                                    }else{
                                        Ext.MessageBox.hide();
                                        Ext.MessageBox.show({
                                            title: 'Servicio ISSA',
                                            msg: 'Se ha completado el proceso de envios de datos',
                                            icon: Ext.MessageBox.INFO,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }else{
                                    countError++;
                                    enviarPMISSA(record, countError);
                                }

                                storeCargarConteoPMEnviosIssa.load();
                            }
                        })
                    }else{
                        Ext.MessageBox.hide();
                        Ext.MessageBox.show({
                            title: 'Servicio ISSA',
                            msg: 'Se ha superado el limite de intentos de envio (3).',
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                    }
                }else{
                    Ext.MessageBox.hide();
                    Ext.MessageBox.show({
                        title: 'Servicio ISSA',
                        msg: 'No hay datos por enviar.',
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.Msg.OK
                    });
                }
            }else{
                Ext.MessageBox.hide();
                Ext.MessageBox.show({
                    title: 'Servicio ISSA',
                    msg: 'Solo se puede enviar datos de procesos terminados',
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        
}

var guardarDataSolAsisIssa = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    var p_periodo = recRow.data.PK_PROCESO.replace('/', '');

    Ext.MessageBox.confirm('Guardar Data ISSA', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
        if (btn === 'yes') {   
            Ext.MessageBox.show({
                msg: 'Guardando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });


            storeCrearAsisIssaPeriodo.proxy.setTimeout(300000);
            storeCrearAsisIssaPeriodo.load({
                params: {
                    p_periodo: p_periodo,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    Ext.MessageBox.hide();
                    console.log(records);
                    if(records != null && records[0].data.r_msg == 'OK'){
                        Ext.MessageBox.show({
                            title: 'Guardar Data ISSA',
                            msg: 'Se ha completado el guardado de datos',
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                        
                    }else{
                        Ext.MessageBox.show({
                            title: 'Guardar Data ISSA',
                            msg: records[0].data.r_msg,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }

                    storeCargarSeguimientAsisIssa.load();
                }

            });
        }
    });
}


var importarDataSolAsisIssaProc = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    var p_periodo = recRow.data.PK_PROCESO.replace('/', '');

    Ext.MessageBox.confirm('Importar a Proceso', '<b>Los conceptos asociados a los datos de asistencia seran reemplazados.</b><br>El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
        if (btn === 'yes') {   
            Ext.MessageBox.show({
                msg: 'Guardando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });


            storeImportarAsiSolIssaProceso.proxy.setTimeout(300000);
            storeImportarAsiSolIssaProceso.load({
                params: {
                    P_PERIODO: p_periodo,
                    P_USUARIO: NOMBRE,
                    P_COD_EMP: '097'
                },
                callback: function(records, operation, success) {
                    Ext.MessageBox.hide();
                    console.log(records);
                    if(records != null && records[0].data.r_msg == 'OK'){
                        Ext.MessageBox.show({
                            title: 'Importar a Proceso',
                            msg: 'Se ha completado el guardado de datos',
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                        
                    }else{
                        Ext.MessageBox.show({
                            title: 'Importar a Proceso',
                            msg: records[0].data.r_msg,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }

                    storeCargarSeguimientAsisIssa.load();
                }

            });
        }
    });
}





