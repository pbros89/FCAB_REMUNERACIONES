Ext.define('fcab.Container.MasterConcepto.CC', {
    extend: 'Ext.container.Container',
    xtype: 'MasterConceptoCC',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'hbox',
    width: 1000,
    scrollable: true,
    listeners: {
        beforerender: function (){
            cargarCCConceptoNo();
            cargarCCConceptoSi();
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
                        cargarCCConceptoNo();
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
                        cargarCCConceptoNo();
                    }
                }
            }]
        },{
            xtype: 'MasterConceptoAgregarCCGrilla'
        }]
    },{
        xtype: 'panel',
        title: 'Centros de Costos del Concepto',
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
                        cargarCCConceptoSi();
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
                        cargarCCConceptoSi();
                    }
                }
            }]
        },{
            xtype: 'MasterConceptoCCGrilla'
        }]
    }]  
});


Ext.define('fcab.Container.MasterConcepto.AgregarCCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterConceptoAgregarCCGrilla',
    itemId: 'MasterConceptoAgregarCCGrilla',
    store: storeCargarCCConceptoNo,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {

        }
    },
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
                    var param = Ext.getCmp('MasterConceptoCC').myExtraParams.param2;

                    storeCrearConceptoCC.load({
                        params: {
                            p_cod_concepto: param.data.PK_COD_CONCEPTO,
                            p_cod_emp: EMPRESA,
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
                            cargarCCConceptoNo();
                            cargarCCConceptoSi();
                            
                        }
                            
                        
                    });
                }
            }]
        },
        
    ],
    height: 500,
    width : '100%',
});


Ext.define('fcab.Container.MasterConcepto.CCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterConceptoCCGrilla',
    itemId: 'MasterConceptoCCGrilla',
    store: storeCargarCCConcepto,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
        }
    },
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
            flex: 1
        },
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-delete',
                tooltip: '',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var param = Ext.getCmp('MasterConceptoCC').myExtraParams.param2;

                    storeEliminarConceptoCC.load({
                        params: {
                            p_cod_concepto: param.data.PK_COD_CONCEPTO,
                            p_cod_emp: EMPRESA,
                            p_cod_cc: rec.data.COD_CC,
                            p_usuario: NOMBRE,
                        },

                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Centro de Costo desasociado correctamente.');
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            cargarCCConceptoNo();
                            cargarCCConceptoSi();
                            
                        }
                            
                        
                    });
                }
            }]
        }
        
    ],
    height: 500,
    width : '100%',
});


var cargarCCConceptoNo = function(){
    var param = Ext.getCmp('MasterConceptoCC').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MasterConceptoCC #txtIdNo')[0].value;
    var nombre = Ext.ComponentQuery.query('#MasterConceptoCC #txtNombreNo')[0].value;

    storeCargarCCConceptoNo.load({
        params:{
            p_cod_concepto: param.PK_COD_CONCEPTO,
            p_cod_emp : EMPRESA,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}

var cargarCCConceptoSi = function() {
    var param = Ext.getCmp('MasterConceptoCC').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MasterConceptoCC #txtIdSi')[0].value;
    var nombre = Ext.ComponentQuery.query('#MasterConceptoCC #txtNombreSi')[0].value;
    
    storeCargarCCConcepto.load({
        params:{
            p_cod_concepto: param.PK_COD_CONCEPTO,
            p_cod_emp : EMPRESA,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}