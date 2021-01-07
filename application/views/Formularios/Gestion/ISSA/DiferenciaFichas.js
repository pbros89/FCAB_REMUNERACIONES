Ext.define('fcab.Container.ISSA.DiferenciaFichas.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'ISSADiferenciaFichasGrilla',
    itemId: 'ISSADiferenciaFichasGrilla',
    store: storeCargarCountDifDotacion,
    width : '100%',
    title: 'Diferencias de Fichas FCAB_RRHH vs ISSA',
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 200, 
    columns: [
        {
            text     : 'Campo',
            sortable : true,
            dataIndex: 'TIPO',
            flex: 1,
        },
        {
            text     : 'Conteo Diferencias',
            sortable : true,
            dataIndex: 'CONTAR',
            flex: 1,
            hidden: false,
            renderer : function(value, meta, record) {
                if(value == '0')
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
            xtype: 'label',
            itemId: "lblFecha",
            text: 'Ultimo Guardado: No existe.'
        },{
            text: "Guardar Fichas ISSA",
            itemId: "btnCargaApi",
            tooltip: "Guardar Fichas",
            iconCls: "icon-form-upload",
            handler: function() {  
                guardarDataSolDotacionIssa();
            }
        },{
            text: "Descargar Fichas con Diferencias",
            tooltip: "Descargar Fichas con Diferencias",
            iconCls: "icon-form-download",
            handler: function() {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    var rec = grid.getStore();
                    var recRow = rec.getAt(rowIndex);
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            //console.log(form.getValues());
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                timeout : 300000,
                                url: host + 'issa/IssaController/crearXlsDotacionIssaTipo'
                            }).submit({
                                params: {
                                    p_tipo: recRow.data.TIPO,
                                },
                                timeout : 300000,
                                target: 'ReporteLogEnvios' + '-form-iframe',
                            });
                        }
                    });

                } catch (e) {
                    console.log(e);
                    msg("Nada seleccionado", "Por favor, seleccione el item", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
                
            }
        },{
            text: "Descargar Fichas Issa",
            tooltip: "Descargar Fichas Issa",
            iconCls: "icon-form-download",
            handler: function() {
                Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                    if (btn === 'yes') {
                        //console.log(form.getValues());
                        Ext.create('Ext.form.Panel', {
                            renderTo: Ext.getBody(),
                            standardSubmit: true,
                            timeout : 300000,
                            url: host + 'issa/IssaController/crearXlsDotacionIssa'
                        }).submit({
                            timeout : 300000,
                            target: 'ReporteLogEnvios' + '-form-iframe',
                        });
                    }
                });
                
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                storeCargarCountDifDotacion.load();
                storeCargarUltimoLogDotacionIssa.load({
                    callback: function(records, operation, success) {
                        var lblFecha = Ext.ComponentQuery.query('#ISSADiferenciaFichasGrilla #lblFecha')[0];

                        console.log(lblFecha);
                        console.log(records);
                        if(records != null){
                            lblFecha.setText('Ultimo Guardado: ' +records[0].data.FECHA);
                        }
                    }
                });
            }
        },]
    }],
    
});

var guardarDataSolDotacionIssa = function() {

    Ext.MessageBox.confirm('Guardar Datos ISSA', 'Se reemplazaran las fichas de ISSA existentes.<br>El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
        if (btn === 'yes') {   
            Ext.MessageBox.show({
                msg: 'Guardando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });


            storeCrearDotacionISSA.proxy.setTimeout(300000);
            storeCrearDotacionISSA.load({
                callback: function(records, operation, success) {
                    Ext.MessageBox.hide();
                    console.log(records);
                    if(records != null && records[0].data.r_msg == 'OK'){
                        Ext.MessageBox.show({
                            title: 'Guardar Datos ISSA',
                            msg: 'Se ha completado el guardado de datos',
                            icon: Ext.MessageBox.INFO,
                            buttons: Ext.Msg.OK
                        });
                        
                    }else{
                        Ext.MessageBox.show({
                            title: 'Guardar Datos ISSA',
                            msg: records[0].data.r_msg,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }

                    storeCargarCountDifDotacion.load();
                    storeCargarUltimoLogDotacionIssa.load({
                        callback: function(records, operation, success) {
                            var lblFecha = Ext.ComponentQuery.query('#ISSADiferenciaFichasGrilla #lblFecha')[0];
                
                            console.log(lblFecha);
                            console.log(records);
                            if(records != null){
                                lblFecha.setText('Ultimo Guardado: ' +records[0].data.FECHA);
                            }
                        }
                    });
                }

            });
        }
    });
}
