Ext.define('fcab.Container.ISSA.SolAsistencia.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaSolAsis',
    itemId: 'SeguimientoISSAGrillaSolAsis',
    store: storeCargarSeguimientAsisIssa,
    width : '100%',
    title: 'Seguimiento solicitud asistencia',
    height: Ext.getBody().getViewSize().height - 200, 
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
                    meta.style = 'color:green; font-weight:bold;';
                }else {
                    meta.style = 'color:red; font-weight:bold;';
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
                    meta.style = 'color:green; font-weight:bold;';
                }else {
                    meta.style = 'color:red; font-weight:bold;';
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
            tooltip: "Guardar Datos",
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
                    storeCargarUltimoLogDotacionIssa.load({
                        callback: function(records, operation, success) {
                            var lblFecha = Ext.ComponentQuery.query('#ISSADiferenciaFichasGrilla #lblFecha')[0];
    
                            console.log(lblFecha);
                            console.log(records);
                            if(records != null){
                                lblFecha.setText(records[0].data.FECHA);
                            }
                        }
                    });
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
