Ext.define('fcab.Container.PresupuestoCC', {
    extend: 'Ext.container.Container',
    xtype: 'PresupuestoCC',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'hbox',
    width: 1000,
    scrollable: true,
    listeners: {
        beforerender: function (){
            cargarCCPresupNo();
            cargarCCPresupSi();
        }
    },
    items: [{
        xtype: 'panel',
        title: 'Centros de Costos',
        width: '50%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        margin: 10,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            margin: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'ID',
                labelAlign:'top',
                name: 'txtIdNo',
                itemId: 'txtIdNo',
                margin: '0 10 0 0',
                typeAhead: true,
                maxLength: 20,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarCCPresupNo();
                    }
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                labelAlign:'top',
                name: 'txtNombreNo',
                itemId: 'txtNombreNo',
                typeAhead: true,
                maxLength: 100,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarCCPresupNo();
                    }
                }
            }]
        },{
            xtype: 'PresupuestoCCAgregar'
        }]
    },{
        xtype: 'panel',
        title: 'Centros de Costos del Presupuesto',
        width: '50%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        margin: '10 10 10 0',
        items: [{
            xtype: 'container',
            layout: 'hbox',
            margin: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'ID',
                labelAlign:'top',
                margin: '0 10 0 0',
                name: 'txtIdSi',
                itemId: 'txtIdSi',
                typeAhead: true,
                maxLength: 20,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarCCPresupSi();
                    }
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                labelAlign:'top',
                name: 'txtNombreSi',
                itemId: 'txtNombreSi',
                typeAhead: true,
                maxLength: 100,
                allowBlank: true,
                listeners: {
                    change: function() {
                        cargarCCPresupSi();
                    }
                }
            }]
        },{
            xtype: 'PresupuestoCCQuitar'
        }]
    }]  
});


Ext.define('fcab.Container.PresupuestoCC.Agregar', {
    extend: 'Ext.grid.Panel',
    xtype: 'PresupuestoCCAgregar',
    itemId: 'PresupuestoCCAgregar',
    store: storeCargarCCPresupNo,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    height: 400,
    width : '100%',
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'COD_CC',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'NOMBRE',
            sortable : true,
            dataIndex: 'NOM_CC',
            //align: 'center',
            flex: 2
        },

        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-add',
                tooltip: '',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var param = Ext.getCmp('PresupuestoCC').myExtraParams.param2;

                    storeCrearPresupuestoCC.load({
                        params: {
                            p_anho: param.data.PK_ANHO,
                            p_cod_emp: param.data.PFK_COD_EMP,
                            p_tipo: param.data.PK_TIPO,
                            p_cod_cc: rec.data.COD_CC,
                            p_usuario: NOMBRE,
                        },

                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Centro de Costo asociado correctamente.');
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            cargarCCPresupNo();
                            cargarCCPresupSi();
                            
                        }
                            
                        
                    });
                }
            }]
        },
        
    ],
});


Ext.define('fcab.Container.PresupuestoCC.Quitar', {
    extend: 'Ext.grid.Panel',
    xtype: 'PresupuestoCCQuitar',
    itemId: 'PresupuestoCCQuitar',
    store: storeCargarCCPresup,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: 400,
    width : '100%',
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_COD_CC',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'NOMBRE',
            sortable : true,
            dataIndex: 'NOM_CC',
            //align: 'center',
            flex: 1
        },

    ],
});


var cargarCCPresupNo = function(){
    var param = Ext.getCmp('PresupuestoCC').myExtraParams.param2;
    var id = Ext.ComponentQuery.query('#PresupuestoCC #txtIdNo')[0].value;
    var nombre = Ext.ComponentQuery.query('#PresupuestoCC #txtNombreNo')[0].value;

    storeCargarCCPresupNo.load({
        params:{
            p_anho: param.data.PK_ANHO,
            p_cod_emp: param.data.PFK_COD_EMP,
            p_tipo: param.data.PK_TIPO,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}

var cargarCCPresupSi = function() {
    var param = Ext.getCmp('PresupuestoCC').myExtraParams.param2;
    var id = Ext.ComponentQuery.query('#PresupuestoCC #txtIdSi')[0].value;
    var nombre = Ext.ComponentQuery.query('#PresupuestoCC #txtNombreSi')[0].value;
    
    storeCargarCCPresup.load({
        params:{
            p_anho: param.data.PK_ANHO,
            p_cod_emp: param.data.PFK_COD_EMP,
            p_tipo: param.data.PK_TIPO,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}