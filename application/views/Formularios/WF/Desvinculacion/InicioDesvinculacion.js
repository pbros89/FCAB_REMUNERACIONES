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
    itemId: 'InicioDesvinculacionGrilla',
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
                    cod_emp: EMPRESA
                }
            });
        }
    },
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'combo',
            fieldLabel: 'Rol atuador',
            //labelAlign: 'top',
            name:'cb_rol',
            margin: '0 30 0 0',
            width: 300,
            store: storeDesv_misRoles,
            queryMode: 'local',
            displayField: 'NOMBRE',
            valueField: 'ROL',
            emptyText: 'Seleccione',
            allowBlank: false,
            listeners:{
                afterrender: function(combo){
                    var store = combo.getStore();
                    store.load({
                        params:{
                            p_usuario: NOMBRE
                        },
                        callback: function(){
                            var primero = combo.getStore().getAt(0).get('NOMBRE');
                            combo.setValue(primero);
                        }
                    });
                },
                change: function(combo){
                    
                }
            }
        },{
            text: 'Ingresar',
            //itemId: 'btnIngresar',
            //hidden: true,
            tooltip: 'Ingresar nueva solicitud',
            iconCls: 'icon-form-add',
            handler: function () {
                var form = this.up('form').getForm();
                var combo = form.findField('cb_rol');
                var seleccion = combo.getStore().find('NOMBRE',combo.getValue());
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
                    
                    modalAdjuntosAdmin(
                        recRow.data.PERSONAL,
                        "ingreso_personal",
                        "Ingreso Personal " + recRow.data.PERSONAL
                    );
                    
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
                        cod_emp: EMPRESA
                    }
                });
                
            }
        }]
    }],
    columns: [
        {
            text     : 'Nro Solicitud',
            sortable : true,
            dataIndex: 'NUMERO',
            flex: 1
        },{
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1
        },{
            text     : 'Etapa',
            sortable : true,
            dataIndex: 'ETAPA',
            flex: 1
        },{
            text     : 'Rut',
            sortable : true,
            dataIndex: 'RUT',
            flex: 2
        },{
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex: 2
        }
    ]
});

function clickDetalleSolDesvinculacion(grid, rowIndex, form){

    var rol = form.findField('cb_rol').value;

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