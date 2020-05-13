Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensualPersonalizada', {
    extend: 'Ext.tab.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensualPersonalizada',
    itemId: 'DetalleErroresImpotarProcesoMensualPersonalizada',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            cargarErroresImportarProcesoMensualPersonalizada();
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
            xtype: 'DetalleErroresImpotarProcesoMensualResumenPersonalizada',
        }],
        buttons:[{
            scale:'large',
            text:'CONFIRMAR',
            tooltip: 'Confirmar que se guarden los valores',
            handler: function(){
                var param = Ext.getCmp('DetalleErroresImpotarProcesoMensualPersonalizada').myExtraParams.param2.data;
                var ewin = Ext.WindowManager.getActive();
                if(ewin){
                    Ext.MessageBox.confirm('Importar Proceso Mensual', '¿Esta seguro de importar los valores?', function(btn) {
                        if (btn === 'yes') {
                            Ext.MessageBox.show({
                                msg: 'Cargando',
                                progressText: 'Espere por favor...',
                                width: 300,
                                wait: {
                                    interval: 200
                                }
                            });
                            storeGuardarValoresImportacionPersonalizada.proxy.setTimeout(300000);
                            storeGuardarValoresImportacionPersonalizada.load({
                                params : {
                                    p_cod_emp: EMPRESA,
                                    p_proceso: param.PK_PROCESO,
                                    p_tipo: param.PK_TIPO,
                                    p_usuario: NOMBRE,
                                },
                                callback: function(records, operation, success) {
                                    Ext.MessageBox.hide();
                                    if(records != null) {
                                        if(records[0].data.r_msg == 'OK'){
                                            showToast('Proceso mensual modificado correctamente.');
                                            if(Ext.getCmp('MainProcesoMensualDetalle') != null) {
                                                cargarMainProcesoMensual(null);
                                                //cargarDetalleProcesoMensual();
                                                //cargarCCPersonasProcesoMensualDetalle();
                                            }
                                            
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
            xtype: 'DetalleErroresImpotarProcesoMensualDetallePersonalizada'
        }]
    }],
    
});

Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensualPersonalizada.Resumen', {
    extend: 'Ext.grid.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensualResumenPersonalizada',
    itemId: 'DetalleErroresImpotarProcesoMensualResumenPersonalizada',
    store: storeResumenValidarImportarProcesoPersonalizado,
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

Ext.define('fcab.Container.DetalleErroresImpotarProcesoMensualPersonalizada.Detalle', {
    extend: 'Ext.grid.Panel',
    xtype: 'DetalleErroresImpotarProcesoMensualDetallePersonalizada',
    itemId: 'DetalleErroresImpotarProcesoMensualDetallePersonalizada',
    store: storeValidarImportarProcesoPersonalizado,
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
            text     : 'COD_CONCEPTO',
            sortable : true,
            dataIndex: 'COD_CONCEPTO',
            width: 200
        },{
            text     : 'VALOR',
            sortable : true,
            dataIndex: 'VALOR',
            width: 200
        },
        

        
    ],
    height: 530,
    width : '100%',
});


var cargarErroresImportarProcesoMensualPersonalizada = function() {

    var param = Ext.getCmp('DetalleErroresImpotarProcesoMensualPersonalizada').myExtraParams.param2.data;
    
    storeValidarImportarProcesoPersonalizado.loadData([],false);

    storeValidarImportarProcesoPersonalizado.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
            p_usuario: NOMBRE,
        },
        callback: function(records, operation, success) {
            console.log(records);
            
        }
    });

    storeResumenValidarImportarProcesoPersonalizado.loadData([],false);

    storeResumenValidarImportarProcesoPersonalizado.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
            p_usuario: NOMBRE,
        },
        callback: function(records, operation, success) {
            console.log(records);
            
        }
    });

}