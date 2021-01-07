
Ext.define('fcab.Container.ISSA.Seguimiento.GrillaPM', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaPM',
    itemId: 'SeguimientoISSAGrillaPM',
    store: storeCargarConteoPMEnviosIssa,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 200, 
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