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
            text: 'Ingresar',
            //itemId: 'btnIngresar',
            //hidden: true,
            tooltip: 'Ingresar nueva solicitud',
            iconCls: 'icon-form-add',
            handler: function () {
                ModalFormDesvinculacion();
            }
        },{
            text: 'Detalle',
            //itemId: 'btnDetalle',
            //hidden: true,
            tooltip: 'Ver Detalle',
            iconCls: 'icon-form-detail',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    //clickDetalleIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea ver el Detalle", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
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