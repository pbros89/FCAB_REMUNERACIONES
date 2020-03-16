Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensual', {
    extend: 'Ext.tab.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensual',
    itemId: 'DetalleErroresImpotarProcesoMensual',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            cargarErroresImportarProcesoMensual();
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
        title: 'Resumen',
        height: 565,
        items:[{
            xtype: 'DetalleErroresImpotarProcesoMensualResumen',
        }],
        buttons:[{
            scale:'large',
            text:'CONFIRMAR',
            tooltip: 'Confirmar que se guarden los valores',
            handler: function(){
                var param = Ext.getCmp('DetalleErroresImpotarProcesoMensual').myExtraParams.param2.data;
                var ewin = Ext.WindowManager.getActive();
                if(ewin){
                    Ext.MessageBox.confirm('Importar Proceso Mensual', '¿Esta seguro de importar el proceso mensual?', function(btn) {
                        if (btn === 'yes') {
                            storeGuardarValoresImportacion.load({
                                params : {
                                    p_cod_emp: EMPRESA,
                                    p_proceso: param.PK_PROCESO,
                                    p_tipo: param.PK_TIPO,
                                    p_usuario: NOMBRE
                                },
                                callback: function(records, operation, success) {
                                    if(records != null) {
                                        if(records[0].data.r_msg == 'OK'){
                                            showToast('Proceso mensual modificado correctamente.');
                                            cargarMainProcesoMensual(null);
                                            cargarDetalleProcesoMensual();
                                            cargarCCPersonasProcesoMensualDetalle();
                                            ewin.destroy();
                                        }else{
                                            Ext.MessageBox.show({
                                                title: 'ADVERTENCIA',
                                                msg: records[0].data.r_msg,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.Msg.OK
                                            });
                                        }
                                    }

                                }
                            });
                        }
                    });
                }
            }
        }]
    }, {
        title: 'Detalle',
        height: 565,
        items:[{
            xtype: 'DetalleErroresImpotarProcesoMensualDetalle'
        }]
    }],
    
});

Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensual.Resumen', {
    extend: 'Ext.grid.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensualResumen',
    itemId: 'DetalleErroresImpotarProcesoMensualResumen',
    store: storeResumenValidarImportarProceso,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Resumen importar",
                  fileName: 'Resumen importar '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [
        
        {
            text     : 'Mensaje',
            sortable : true,
            dataIndex: 'MENSAJE',
            flex:4,
            renderer : function(value, meta) {
                if(value === 'OK')
                {
                    meta.style = 'color:green;';
                    return value;
                }else {
                    meta.style = 'color:red;';
                    return value;
                }
            }
        },

        {
            text     : 'Cantidad',
            sortable : true,
            dataIndex: 'CONTAR',
            flex:1
        },
        
    ],
    height: 500,
    width : '100%',
});

Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensual.Detalle', {
    extend: 'Ext.grid.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensualDetalle',
    itemId: 'DetalleErroresImpotarProcesoMensualDetalle',
    store: storeValidarImportarProceso,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Detalle importar",
                  fileName: 'Detalle importar '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [
        
        {
            text     : 'Mensaje',
            sortable : true,
            dataIndex: 'MENSAJE',
            width: 200,
            renderer : function(value, meta) {
                if(value === 'OK')
                {
                    meta.style = 'color:green;';
                    return value;
                }else {
                    meta.style = 'color:red;';
                    return value;
                }
            }
        },{
            text     : 'RUT',
            sortable : true,
            dataIndex: 'RUT',
            width: 200
        },{
            text     : 'NOMBRE',
            sortable : true,
            dataIndex: 'NOMBRE',
            width: 200
        },{
            text     : 'COD_CC',
            sortable : true,
            dataIndex: 'COD_CC',
            width: 200
        },{
            text     : 'NOM_CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            width: 200
        },{
            text     : 'COD_CARGO',
            sortable : true,
            dataIndex: 'COD_CARGO',
            width: 200
        },{
            text     : 'NOM_CARGO',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            width: 200
        },{
            text     : 'TIPO_CONTRATO',
            sortable : true,
            dataIndex: 'TIPO_CONTRATO',
            width: 200
        },{
            text     : 'JORNADA',
            sortable : true,
            dataIndex: 'JORNADA',
            width: 200
        },{
            text     : 'COD_SINDICATO',
            sortable : true,
            dataIndex: 'COD_SINDICATO',
            width: 200
        },{
            text     : 'NOM_SINDICATO',
            sortable : true,
            dataIndex: 'NOM_SINDICATO',
            width: 200
        },{
            text     : 'COD_ADHERIDO',
            sortable : true,
            dataIndex: 'COD_ADHERIDO',
            width: 200
        },{
            text     : 'NOM_ADHERIDO',
            sortable : true,
            dataIndex: 'NOM_ADHERIDO',
            width: 200
        },{
            text     : 'GRUPO_CONCEPTO',
            sortable : true,
            dataIndex: 'GRUPO_CONCEPTO',
            width: 200
        },{
            text     : 'TIPO_CONCEPTO',
            sortable : true,
            dataIndex: 'TIPO_CONCEPTO',
            width: 200
        },{
            text     : 'COD_CONCEPTO',
            sortable : true,
            dataIndex: 'COD_CONCEPTO',
            width: 200
        },{
            text     : 'NOM_CONCEPTO',
            sortable : true,
            dataIndex: 'NOM_CONCEPTO',
            width: 200
        },{
            text     : 'VALOR_RANGO_INI',
            sortable : true,
            dataIndex: 'VALOR_RANGO_INI',
            width: 200
        },{
            text     : 'VALOR_RANGO_FIN',
            sortable : true,
            dataIndex: 'VALOR_RANGO_FIN',
            width: 200
        },{
            text     : 'VALORES_SELECCIONAR',
            sortable : true,
            dataIndex: 'VALORES_SELECCIONAR',
            width: 200
        },{
            text     : 'VALOR_A_CARGAR',
            sortable : true,
            dataIndex: 'VALOR_A_CARGAR',
            width: 200
        },
        

        
    ],
    height: 530,
    width : '100%',
});


var cargarErroresImportarProcesoMensual = function() {

    var param = Ext.getCmp('DetalleErroresImpotarProcesoMensual').myExtraParams.param2.data;
    
    storeValidarImportarProceso.loadData([],false);

    storeValidarImportarProceso.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            console.log(records);
            
        }
    });

    storeResumenValidarImportarProceso.loadData([],false);

    storeResumenValidarImportarProceso.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            console.log(records);
            
        }
    });

}