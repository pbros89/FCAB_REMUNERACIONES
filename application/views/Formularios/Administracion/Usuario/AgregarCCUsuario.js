Ext.define('fcab.Container.MasterUsuario.CC', {
    extend: 'Ext.container.Container',
    xtype: 'MasterUsuarioCC',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'hbox',
    width: 1000,
    scrollable: true,
    listeners: {
        beforerender: function (){
            cargarCCUsuarioNo();
            cargarCCUsuarioSi();
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
                        cargarCCUsuarioNo();
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
                        cargarCCUsuarioNo();
                    }
                }
            }]
        },{
            xtype: 'MasterUsuarioAgregarCCGrilla'
        }]
    },{
        xtype: 'panel',
        title: 'Centros de Costos del Usuario',
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
                        cargarCCUsuarioSi();
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
                        cargarCCUsuarioSi();
                    }
                }
            }]
        },{
            xtype: 'MasterUsuarioCCGrilla'
        }]
    }]  
});


Ext.define('fcab.Container.MasterUsuario.AgregarCCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterUsuarioAgregarCCGrilla',
    itemId: 'MasterUsuarioAgregarCCGrilla',
    store: storeCargarCCUsuarioNo,
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
                    var param = Ext.getCmp('MasterUsuarioCC').myExtraParams.param2;

                    storeCrearUsuarioCC.load({
                        params: {
                            p_login: param.data.PK_USUARIO,
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
                            cargarCCUsuarioNo();
                            cargarCCUsuarioSi();
                            
                        }
                            
                        
                    });
                }
            }]
        },
        
    ],
    height: 500,
    width : '100%',
});


Ext.define('fcab.Container.MasterUsuario.CCGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterUsuarioCCGrilla',
    itemId: 'MasterUsuarioCCGrilla',
    store: storeCargarCCUsuario,
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
                    var param = Ext.getCmp('MasterUsuarioCC').myExtraParams.param2;

                    storeEliminarUsuarioCC.load({
                        params: {
                            p_login: param.data.PK_USUARIO,
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
                            cargarCCUsuarioNo();
                            cargarCCUsuarioSi();
                            
                        }
                            
                        
                    });
                }
            }]
        }
        
    ],
    height: 500,
    width : '100%',
});


var cargarCCUsuarioNo = function(){
    var param = Ext.getCmp('MasterUsuarioCC').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MasterUsuarioCC #txtIdNo')[0].value;
    var nombre = Ext.ComponentQuery.query('#MasterUsuarioCC #txtNombreNo')[0].value;

    storeCargarCCUsuarioNo.load({
        params:{
            p_usuario: param.PK_USUARIO,
            p_cod_emp : EMPRESA,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}

var cargarCCUsuarioSi = function() {
    var param = Ext.getCmp('MasterUsuarioCC').myExtraParams.param2.data;
    var id = Ext.ComponentQuery.query('#MasterUsuarioCC #txtIdSi')[0].value;
    var nombre = Ext.ComponentQuery.query('#MasterUsuarioCC #txtNombreSi')[0].value;
    
    storeCargarCCUsuario.load({
        params:{
            p_usuario: param.PK_USUARIO,
            p_cod_emp : EMPRESA,
            p_cod_cc : id,
            p_nom_cc: nombre
        }
    });
}