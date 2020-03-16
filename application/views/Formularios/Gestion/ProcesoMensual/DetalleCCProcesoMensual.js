Ext.define('fcab.Container.MainProcesoMensual.DetalleCC', {
    extend: 'Ext.container.Container',
    xtype: 'MainProcesoMensualDetalleCC',
    itemId: 'MainProcesoMensualDetalleCC',
    border: false,
    frame: false,
    scrollable: false,
    listeners: {
        beforerender: function (){
            //cargarCCConceptoNo();
            //cargarCCConceptoSi();
        }
    },
    items: [{
        xtype: 'panel',
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 10 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'ID',
                labelAlign:'top',
                name: 'txtId',
                itemId: 'txtId',
                margin: '0 10 0 0',
                typeAhead: true,
                maxLength: 20,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarDetalleCCProcesoMensual();
                    }
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                labelAlign:'top',
                name: 'txtNombre',
                itemId: 'txtNombre',
                typeAhead: true,
                maxLength: 100,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarDetalleCCProcesoMensual();
                    }
                }
            }]
        },{
            xtype: 'MainProcesoMensualDetalleCCGrilla'
        }]
    }]
});

Ext.define('fcab.Container.MainProcesoMensual.DetalleCCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainProcesoMensualDetalleCCGrilla',
    itemId: 'MainProcesoMensualDetalleCCGrilla',
    store: storeCargarCCProcesoMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    scrollable: true,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_COD_CC',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CC',
            //align: 'center',
            flex: 2
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1,
            renderer : function(value, meta) {
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
        },{
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-delete',
                tooltip: 'Dejar en estado EN ESPERA',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    
                    Ext.MessageBox.confirm('En espera Centro de Costo', '¿Esta seguro de dejar en espera el centro de costo?', function(btn) {
                        if (btn === 'yes') {
                            var ewin = Ext.WindowManager.getActive();
                            if (ewin) {
                                storeModificarEstadoProcMensualCC.load({
                                    params:{
                                        p_proceso: rec.data.PFK_PROCESO,
                                        p_cod_emp: EMPRESA,
                                        p_tipo: rec.data.PFK_TIPO,
                                        p_cod_cc: rec.data.PK_COD_CC,
                                        p_estado: 'EN ESPERA',
                                        p_usuario: NOMBRE
                                    },
                                    callback: function(records, operation, success) {
                                        if(records != null) {
                                            if(records[0].data.r_msg == 'OK'){
                                                showToast('Centro de Costo en espera correctamente.');
                                                if(Ext.getCmp('MainProcesoMensualDetalle') != null){
                                                    cargarDetalleProcesoMensual();
                                                    cargarCCPersonasProcesoMensualDetalle();
                                                    //Ext.ComponentQuery.query('#MainProcesoMensualDetallePersonas #cbCc')[0].setValue(null);
                                                }
                                                if(Ext.getCmp('PersonasProcesoMensual') != null){
                                                    cargarCCPersonasProcesoMensual();
                                                }
                                                
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
                        }
                    });
                    
                }
            }]
        },{
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-ok',
                tooltip: 'Dejar en estado TERMINADO',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    
                    Ext.MessageBox.confirm('Terminar Centro de Costo', '¿Esta seguro de terminar el centro de costo?', function(btn) {
                        if (btn === 'yes') {
                            var ewin = Ext.WindowManager.getActive();
                            if (ewin) {
                                storeModificarEstadoProcMensualCC.load({
                                    params:{
                                        p_proceso: rec.data.PFK_PROCESO,
                                        p_cod_emp: EMPRESA,
                                        p_tipo: rec.data.PFK_TIPO,
                                        p_cod_cc: rec.data.PK_COD_CC,
                                        p_estado: 'TERMINADO',
                                        p_usuario: NOMBRE
                                    },
                                    callback: function(records, operation, success) {
                                        if(records != null) {
                                            if(records[0].data.r_msg == 'OK'){
                                                showToast('Centro de Costo terminado correctamente.');
                                                if(Ext.getCmp('MainProcesoMensualDetalle') != null){
                                                    cargarDetalleProcesoMensual();
                                                    cargarCCPersonasProcesoMensualDetalle();
                                                }
                                                if(Ext.getCmp('PersonasProcesoMensual') != null){
                                                    cargarCCPersonasProcesoMensual();
                                                }
                                                
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
                        }
                    });
                }
            }]
        },
    ],
    width : '100%',
    height: 480
});

var cargarDetalleCCProcesoMensual = function(){
    var param = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MainProcesoMensualDetalleCC #txtId')[0].value;
    var nombre = Ext.ComponentQuery.query('#MainProcesoMensualDetalleCC #txtNombre')[0].value;

    storeCargarCCProcesoMensual.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: id,
            p_nom_cc: nombre
        },
        callback: function(records, operation, success) {
            
        }
    });
}
