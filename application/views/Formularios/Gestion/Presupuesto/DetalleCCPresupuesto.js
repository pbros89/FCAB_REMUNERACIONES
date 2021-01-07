Ext.define('fcab.Container.MainPresupuesto.DetalleCC', {
    extend: 'Ext.container.Container',
    xtype: 'MainPresupuestoDetalleCC',
    itemId: 'MainPresupuestoDetalleCC',
    border: false,
    frame: false,
    items: [{
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center',
            },
            border: false,
            width: '100%',
            height: "100px",
            margin: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Buscar por ID',
                labelAlign:'top',
                name: 'txtId',
                itemId: 'txtId',
                margin: '0 10 0 0',
                typeAhead: true,
                maxLength: 20,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarDetalleCCPresupuesto();
                    }
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Buscar por Nombre',
                labelAlign:'top',
                name: 'txtNombre',
                itemId: 'txtNombre',
                typeAhead: true,
                maxLength: 100,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarDetalleCCPresupuesto();
                    }
                }
            },{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'middle',
                    pack: 'center',
                },
                width: '100%',
                items: [{
                    xtype: 'button',
                    text: 'Terminar todos los CC',
                    handler: function() {
                        var param = Ext.getCmp('MainPresupuestoDetalle').myExtraParams.param2.data;
                        Ext.MessageBox.confirm('Terminar todos los CC', '¿Esta seguro de terminar los centros de costos?', function(btn) {
                            if (btn === 'yes') {
                                storeTerminarAllCCPresup.load({
                                    params: {
                                        p_cod_emp: EMPRESA,
                                        p_anho: param.PK_ANHO,
                                        p_tipo: param.PK_TIPO,
                                        p_usuario: NOMBRE
                                    },
                                    callback: function(records, operation, success) {
                                        if(records != null) {
                                            if(records[0].data.r_msg == 'OK'){
                                                showToast('Centros de Costos terminados correctamente');
                                                if(Ext.getCmp('MainPresupuestoDetalle') != null){
                                                    cargarDetallePresupuesto();
                                                    cargarCCPersonasPresupuestoDetalle();
                                                }
                                                if(Ext.getCmp('PersonasPresupuesto') != null){
                                                    cargarCCPersonasPresupuesto();
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
                        });
                    }
                }]
            }]
        },{
            xtype: 'MainPresupuestoDetalleCCGrilla',
            flex: 1,
        }]
});

Ext.define('fcab.Container.MainPresupuesto.DetalleCCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainPresupuestoDetalleCCGrilla',
    itemId: 'MainPresupuestoDetalleCCGrilla',
    store: storeCargarCCPresup,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    scrollable: true,
    autoScroll: true,
    width : '100%',
    height: '350',
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
                  title: "Centros de Costos",
                  fileName: 'CC_PRESUPUESTO_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
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
                                storeModificarEstadoPresupuestoCC.load({
                                    params:{
                                        p_anho: rec.data.PFK_ANHO,
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
                                                if(Ext.getCmp('MainPresupuestoDetalle') != null){
                                                    cargarDetallePresupuesto();
                                                    //cargarCCPersonasPresupuestoDetalle();
                                                    //Ext.ComponentQuery.query('#MainPresupuestoDetallePersonas #cbCc')[0].setValue(null);
                                                }
                                                /*if(Ext.getCmp('PersonasPresupuesto') != null){
                                                    cargarCCPersonasPresupuesto();
                                                }*/
                                                
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
                                storeModificarEstadoPresupuestoCC.load({
                                    params:{
                                        p_anho: rec.data.PFK_ANHO,
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
                                                if(Ext.getCmp('MainPresupuestoDetalle') != null){
                                                    cargarDetallePresupuesto();
                                                    //cargarCCPersonasPresupuestoDetalle();
                                                }
                                               /* if(Ext.getCmp('PersonasPresupuesto') != null){
                                                    cargarCCPersonasPresupuesto();
                                                }*/
                                                
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
    
});

var cargarDetalleCCPresupuesto = function(){
    var param = Ext.getCmp('MainPresupuestoDetalle').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MainPresupuestoDetalleCC #txtId')[0].value;
    var nombre = Ext.ComponentQuery.query('#MainPresupuestoDetalleCC #txtNombre')[0].value;

    storeCargarCCPresup.load({
        params : {
            p_cod_emp: EMPRESA,
            p_anho: param.PK_ANHO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: id,
            p_nom_cc: nombre
        },
        callback: function(records, operation, success) {
            
        }
    });
}
