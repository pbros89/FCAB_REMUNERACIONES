Ext.define('fcab.Container.MasterUsuario.RolWF', {
    extend: 'Ext.container.Container',
    xtype: 'MasterUsuarioRolWF',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'hbox',
    width: 1000,
    scrollable: true,
    listeners: {
        beforerender: function (){
            cargarRolWFNo();
            cargarRolWFSi();
        }
    },
    items: [{
        xtype: 'panel',
        title: 'Roles Workflow',
        width: '50%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        margin: '10',
        items: [{
            xtype: 'MasterUsuarioAgregarRolWFGrilla'
        }]
    },{
        xtype: 'panel',
        title: 'Roles Workflow del Usuario',
        width: '50%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        margin: '10 10 10 0',
        items: [{
            xtype: 'MasterUsuarioRolWFGrilla'
        }]
    }]  
});


Ext.define('fcab.Container.MasterUsuario.AgregarRolWFGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterUsuarioAgregarRolWFGrilla',
    itemId: 'MasterUsuarioAgregarRolWFGrilla',
    store: storeCargarRolesWfUsuarioNo,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_ROL_WF',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            //align: 'center',
            flex: 1
        },

        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            flex: 1
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
                    var param = Ext.getCmp('MasterUsuarioRolWF').myExtraParams.param2;

                    storeCrearUsuarioRolWF.load({
                        params: {
                            p_login: param.data.PK_USUARIO,
                            p_cod_emp: EMPRESA,
                            p_rol_wf: rec.data.PK_ROL_WF,
                            p_usuario: NOMBRE,
                        },

                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Rol asociado correctamente.');
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            cargarRolWFNo();
                            cargarRolWFSi();
                        }
                    });
                }
            }]
        },
        
    ],
    height: 500,
    width : '100%',
});


Ext.define('fcab.Container.MasterUsuario.RolWFGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterUsuarioRolWFGrilla',
    itemId: 'MasterUsuarioRolWFGrilla',
    store: storeCargarRolesWfUsuario,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_ROL_WF',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            //align: 'center',
            flex: 1
        },

        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
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
                    var param = Ext.getCmp('MasterUsuarioRolWF').myExtraParams.param2;

                    storeEliminarUsuarioRolWF.load({
                        params: {
                            p_login: param.data.PK_USUARIO,
                            p_cod_emp: EMPRESA,
                            p_rol_wf: rec.data.PK_ROL_WF,
                            p_usuario: NOMBRE,
                        },

                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Rol desasociado correctamente.');
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            cargarRolWFNo();
                            cargarRolWFSi();
                            
                        }
                            
                        
                    });
                }
            }]
        }
        
    ],
    height: 500,
    width : '100%',
});


var cargarRolWFNo = function(){
    var param = Ext.getCmp('MasterUsuarioRolWF').myExtraParams.param2.data;

    storeCargarRolesWfUsuarioNo.load({
        params:{
            p_usuario: param.PK_USUARIO,
            p_cod_emp : EMPRESA,
        }
    });
}

var cargarRolWFSi = function() {
    var param = Ext.getCmp('MasterUsuarioRolWF').myExtraParams.param2.data;
    
    storeCargarRolesWfUsuario.load({
        params:{
            p_usuario: param.PK_USUARIO,
            p_cod_emp : EMPRESA,
        }
    });
}