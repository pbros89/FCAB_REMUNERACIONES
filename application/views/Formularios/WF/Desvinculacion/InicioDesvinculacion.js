// MAIN CONTAINER:
Ext.define('fcab.Container.InicioDesvinculacion', {
    extend: 'Ext.form.Panel', 
    xtype: 'InicioDesvinculacion',
    id: 'idFormInicioDesvinculacion',
    layout : 'fit',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);

    },
    listeners:{
        afterrender: function(){

        }
    },
    items: [{
        xtype: 'InicioDesvinculacionGrilla'
    }]
});

//GRILLA:
Ext.define('fcab.Container.InicioDesvinculacionGrilla.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'InicioDesvinculacionGrilla',
    id: 'InicioDesvinculacionGrilla',
    title: 'Solicitud de Desvinculación ('+NOM_EMPRESA+')',
    store: storeDesv_listaDesvinculaciones,
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            
        },
        afterrender: function(grid){
            var storeGrid = grid.getStore();
             
            storeGrid.load({
                params:{
                    cod_emp: EMPRESA,
                    cod_usr: NOMBRE,
                    rol_usr: ROL
                }
            });
        }
    },
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'combo',
            fieldLabel: 'Rol atuador',
            name:'cb_rol',
            margin: '0 30 0 0',
            width: 400,
            store: storeDesv_misRoles,
            queryMode: 'local',
            displayField: 'NOMBRE',
            valueField: 'ROL',
            emptyText: 'No tiene un rol asociado al workflow.',
            allowBlank: false,
            listeners:{
                afterrender: function(combo){
                    var store = combo.getStore();
                    store.load({
                        params:{
                            p_usuario: NOMBRE
                        },
                        callback: function(records){
                            if(records!=null){
                                var primero = records[0].data.NOMBRE;
                                combo.setValue(primero);
                            }
                        }
                    });
                },
                change: function(combo){
                
                    var seleccion = combo.getStore().find('NOMBRE',combo.rawValue);
                    var etapa = combo.getStore().getAt(seleccion).get('ETAPA');

                    if(etapa == 1){
                        Ext.ComponentQuery.query('#InicioDesvinculacionGrilla #btnIngresar')[0].setHidden(false);
                    }else{
                        Ext.ComponentQuery.query('#InicioDesvinculacionGrilla #btnIngresar')[0].setHidden(true);
                    }
                }
            }
        },{
            text: 'Ingresar',
            itemId: 'btnIngresar',
            hidden: true,
            tooltip: 'Ingresar nueva solicitud',
            iconCls: 'icon-form-add',
            handler: function () {
                var form = this.up('form').getForm();
                var combo = form.findField('cb_rol');
                var seleccion = combo.getStore().find('NOMBRE',combo.rawValue);
                var rol = combo.getStore().getAt(seleccion).get('ROL');
                
                if(form.isValid()){
                    ModalFormDesvinculacion(rol);
                }else{
                    showToast('Debe seleccionar un Rol Actuador.');
                }
                
            }
        },{
            text: 'Detalle',
            //itemId: 'btnDetalle',
            //hidden: true,
            tooltip: 'Ver Detalle',
            iconCls: 'icon-form-detail',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                var form = this.up('form').getForm();
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickDetalleSolDesvinculacion(grid, rowIndex, form);                   
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea ver el Detalle", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Anular',
            //itemId: 'btnAnular',
            //hidden: true,
            tooltip: 'Anular Item seleccionado',
            iconCls: 'icon-form-suspend',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAnularSolDesvinculacion(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione la solicitud que desea anular.", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: "Documentos",
            itemId: "btnDoc",
            //hidden: true,
            tooltip: "Ver documentos",
            iconCls: "icon-form-folder",
            handler: function() {
                var grid = this.up("grid"); //Recuperamos la grilla
                try {
                    //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition()
                    .rowIdx;
                    var rec = grid.getStore();
                    var recRow = rec.getAt(rowIndex);

                    if(recRow.data.ESTADO == 'ACTIVO'){
                        modalAdjuntosAdmin(
                            recRow.data.NUMERO,
                            "solicitud_desvinculacion",
                            "Solicitud de Desvinculacion Nº " + recRow.data.NUMERO +'('+recRow.data.RUT +')'
                        );
                    }else{
                        modalAdjuntosBasic(
                            recRow.data.NUMERO,
                            "solicitud_desvinculacion",
                            "Solicitud de Desvinculacion Nº " + recRow.data.NUMERO +'('+recRow.data.RUT +')'
                        );
                    }
                    
                    
                    
                } catch (e) {
                    msg(
                    "Nada seleccionado",
                    "Por favor, seleccione el item",
                    Ext.Msg.ERROR,
                    Ext.Msg.OK
                    );
                    console.debug(e);
                }
            }
        },{
            text: 'Matriz de causales',
            //itemId: 'btnDetalle',
            //hidden: true,
            tooltip: 'Descargar manual de usuario.',
            iconCls: 'icon-form-detail',
            handler: function () {
                window.open('resources/docs/Matriz_Causales_Desvinculacion.pdf');
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                var storeGrid = grid.getStore();
             
                storeGrid.load({
                    params:{
                        cod_emp: EMPRESA,
                        cod_usr: NOMBRE,
                        rol_usr: ROL
                    }
                });
                
            }
        }]
    }],
    columns: [{
        text     : 'Estado',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'ESTADO',
        flex: 1,
        renderer : function(val) {
            if (val == 'ACTIVO') {
                return '<span style="color:' + 'blue' + ';">' + val + '</span>';
            } else if (val == 'APROBADO') {
                return '<span style="color:' + 'green' + ';">' + val + '</span>';
            }
            else if (val == 'RECHAZADO') {
                return '<span style="color:' + 'red' + ';">' + val + '</span>';
            }
            else if (val == 'ANULADO') {
                return '<span style="color:' + 'gray' + ';">' + val + '</span>';
            }
            return val;
        },
    },{
        text     : 'Nro Solicitud',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'NUMERO',
        flex: 1
    },{
        text     : 'Rut',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'RUT',
        flex: 1
    },{
        text     : 'Nombre',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'NOMBRE',
        flex: 2
    },{
        text     : 'Usuario Creador',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'CREADOR',
        flex: 1
    },{
        text     : 'Fecha Creación',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'FECHA',
        flex: 1
    },{
        text     : 'Caso de WF',
        style:'text-align:center;',
        sortable : true,
        dataIndex: 'CASO',
        flex: 1
    }]
});

function clickDetalleSolDesvinculacion(grid, rowIndex, form){

    var combo_rol = form.findField('cb_rol');
    var seleccion = combo_rol.getStore().find('NOMBRE',combo_rol.rawValue);
    var rol = combo_rol.getStore().getAt(seleccion).get('ROL');

    var records = grid.getStore().getRange();
    var num_sol = records[rowIndex].get('NUMERO');

    if(form.isValid()){
        ModalDetalleDesvinculacion(num_sol, rol);            
    }else{
        showToast('Debe seleccionar un Rol Actuador.');
    }
    
}

var clickAnularSolDesvinculacion = function(grid, rowIndex) {
    var records = grid.getStore().getRange();
    var num_sol = records[rowIndex].get('NUMERO');
    Ext.MessageBox.confirm(
        'Anular Solicitud de Desvinculación.', 
        '¿Esta seguro de anular la solicitud de desvinculación?<br>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularSolDesvinculacion.load({
                params:{
                    p_numero:num_sol,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Solicitud Anulada Correctamente.');
                            var store = Ext.getCmp('InicioDesvinculacionGrilla').getStore();
                            store.load({
                                params:{
                                    cod_emp: EMPRESA,
                                    cod_usr: NOMBRE,
                                    rol_usr: ROL
                                }
                            });
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
};