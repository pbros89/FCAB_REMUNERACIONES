Ext.define('fcab.Container.MainProcesoMensual.DetallePersonas', {
    extend: 'Ext.container.Container',
    xtype: 'MainProcesoMensualDetallePersonas',
    itemId: 'MainProcesoMensualDetallePersonas',
    id: 'MainProcesoMensualDetallePersonas',
    border: false,
    frame: false,
    items: [{
        xtype: 'panel',
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        items: [{
            margin: 10,
            xtype: 'combo',
            name: 'cbCc',
            itemId: 'cbCc',
            displayField: 'DESC_CC',
            valueField: 'PK_COD_CC',
            store: storeCargarCCProcesoMensual2,
            fieldLabel: 'Buscar por CC',
            labelAlign:'top',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            allowBlank: true,  
            readOnly: false,
            width: 500,
            listeners:{
                change: function (cb, nuevoValor) {
                    if(nuevoValor != null){
                        cargarCCPersonasProcesoMensualDetalle();
                    }
                }
            }
        },{ 
            xtype: 'MainProcesoMensualDetallePersonasGrilla'
        }]
    }]
    
});

Ext.define('fcab.Container.MainProcesoMensual.DetallePersonasGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainProcesoMensualDetallePersonasGrilla',
    itemId: 'MainProcesoMensualDetallePersonasGrilla',
    store: storeCargarPersonasProcesoMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickConceptosPersonasProcesoMensualDetalle(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'PFK_COD_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'Proceso',
            sortable : true,
            dataIndex: 'PFK_PROCESO',
            //align: 'center',
            flex: 1,
            hidden: true
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'PK_TIPO',
            //align: 'center',
            flex: 1,
            hidden: true
        },
        
        {
            text     : 'ID CC',
            sortable : true,
            dataIndex: 'PFK_COD_CC',
            flex:1
        },

        {
            text     : 'Nombre CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            flex:2
        },
        {
            text     : 'Rut Trabajador',
            sortable : true,
            dataIndex: 'PK_RUT',
            flex:1,
            //hidden: true
        },
        {
            text     : 'Nombre Trabajador',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex:2,
        },
        {
            text     : 'ID Cargo',
            sortable : true,
            dataIndex: 'COD_CARGO',
            flex:1,
            hidden: true
        },
        {
            text     : 'Nombre Cargo',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            flex: 2,
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
        },
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-edit',
                tooltip: 'Ingresar valores de conceptos',
                handler: function(grid, rowIndex) {
                    var grid = this.up('grid'); //Recuperamos la grilla
                    try { //Obtenemos el index del item seleccionado
                        clickConceptosPersonasProcesoMensualDetalle(grid, rowIndex);
                    } catch (e) {
                        msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                        console.debug(e);
                    }
                }
            }]
        },
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-delete',
                tooltip: 'Dejar en estado EN ESPERA',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    
                    Ext.MessageBox.confirm('En espera Trabajador', '¿Esta seguro de dejar en espera el trabajador?', function(btn) {
                        if (btn === 'yes') {
                            var ewin = Ext.WindowManager.getActive();
                            if (ewin) {
                                storeModificarEstadoProcMensualPerson.load({
                                    params:{
                                        p_proceso: rec.data.PFK_PROCESO,
                                        p_cod_emp: EMPRESA,
                                        p_tipo: rec.data.PFK_TIPO,
                                        p_cod_cc: rec.data.PFK_COD_CC,
                                        p_rut: rec.data.PK_RUT,
                                        p_estado: 'EN ESPERA',
                                        p_usuario: NOMBRE
                                    },
                                    callback: function(records, operation, success) {
                                        if(records != null) {
                                            if(records[0].data.r_msg == 'OK'){
                                                showToast('Trabajador en espera correctamente.');
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
        },{
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-ok',
                tooltip: 'Dejar en estado TERMINADO',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    
                    Ext.MessageBox.confirm('Terminar Trabajador', '¿Esta seguro de terminar el trabajador?', function(btn) {
                        if (btn === 'yes') {
                            var ewin = Ext.WindowManager.getActive();
                            if (ewin) {
                                storeModificarEstadoProcMensualPerson.load({
                                    params:{
                                        p_proceso: rec.data.PFK_PROCESO,
                                        p_cod_emp: EMPRESA,
                                        p_tipo: rec.data.PFK_TIPO,
                                        p_cod_cc: rec.data.PFK_COD_CC,
                                        p_rut: rec.data.PK_RUT,
                                        p_estado: 'TERMINADO',
                                        p_usuario: NOMBRE
                                    },
                                    callback: function(records, operation, success) {
                                        if(records != null) {
                                            if(records[0].data.r_msg == 'OK'){
                                                showToast('Trabajador terminado correctamente.');
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
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Personas",
                  fileName: 'PER_PROC_MENSUAL_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
    width : '100%',
});

var clickConceptosPersonasProcesoMensualDetalle= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("ConceptosPersonaProcesoMensual", "Conceptos ("+recRow.data.NOMBRE+")", "800", "", "ConceptosPersonaProcesoMensual", 1, 0, rec, recRow);
};

var cargarCCPersonasProcesoMensualDetalle = function() {

    var param = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2.data;
    var cc = Ext.ComponentQuery.query('#MainProcesoMensualDetallePersonas #cbCc')[0].value;

    if(cc != null && cc != ""){
        storeCargarPersonasProcesoMensual.load({
            params:{
                p_cod_emp: EMPRESA,
                p_proceso: param.PK_PROCESO,
                p_tipo: param.PK_TIPO,
                p_cod_cc: cc,
            }
        });
    }
}