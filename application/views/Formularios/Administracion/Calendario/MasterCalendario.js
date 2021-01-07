Ext.define("fcab.Container.MasterCalendario", {
    extend: 'Ext.container.Container',
    xtype: 'MasterCalendario',
    layout : 'fit',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);

        ROL_ACCIONES.forEach(accion => {
            var estado = accion.ESTADO;
            var acc = accion.PFK_ACCION;
            var pantalla = accion.PFK_PANTALLA;

            if(pantalla == 'CALENDARIO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_CARGO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterCalendarioGrilla')[0].suspendEvents();
            }
        });

        cargarMasterCalendario(null);
    },
    items: [{
    	xtype: 'MasterCalendarioGrilla'
    }]

});


Ext.define('fcab.Container.MasterCalendario.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterCalendarioGrilla',
    itemId: 'MasterCalendarioGrilla',
    store: storeCargarCalendarios,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarCalendario(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1,
            renderer : function(value, meta) {
                if(value === 'A')
                {
                    meta.style = 'color:green;';
                    return 'ACTIVO'
                }else if(value === 'I'){
                    meta.style = 'color:red;';
                    return 'INACTIVO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'PK_TIPO',
            //align: 'center',
            hidden: false,
            flex: 2
        },
        {
            text     : 'Año',
            sortable : true,
            dataIndex: 'PK_ANHO',
            //align: 'center',
            hidden: false,
            flex: 1
        },
        {
            text     : 'Mes',
            sortable : true,
            dataIndex: 'PK_MES',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Día',
            sortable : true,
            dataIndex: 'PK_DIA',
            flex:1
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            hidden: false,
            flex: 3
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            flex:2,
            hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            flex:2,
            hidden: true
        },
        {
            text     : 'Modificación',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            flex:2,
            //hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            flex: 2,
        },
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Ingresar',
            itemId: 'btnIngresar',
            hidden: true,
            tooltip: 'Ingresar nuevo item',
            iconCls: 'icon-form-add',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                clickCrearCalendario(grid);
            }
        }, {
            text: 'Editar',
            itemId: 'btnEditar',
            hidden: true,
            tooltip: 'Editar Item seleccionado',
            iconCls: 'icon-form-edit',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEditarCalendario(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMasterCalendario(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                var date = new Date();
                date.t
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Calendarios " + NOM_EMPRESA,
                  fileName: 'Calendarios '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCalendario(grid);
                } catch (e) {
                    //msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        }, {
            text: 'Limpiar',
            itemId: 'btnLimFiltro',
            tooltip: 'Limpiar Filtros',
            iconCls: 'icon-form-filter-del',
            hidden: true,
            width: 120,
            handler: function () {
                var grid = this.up('grid');
                Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterCalendario(null);
            }
        }]
    }],
    title: 'Maestro Calendario (Multi-Empresa)',
    viewConfig: {
        stripeRows: true,
    },
});

Ext.define('fcab.form.Paggin.MasterCalendario', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterCalendario',
    store: storeCargarCalendarios,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearCalendario = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterCalendarioCrear", "Crear Calendario", "500", "", "MasterCalendarioCrear", 1, 0, rec);
};

var clickEditarCalendario= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterCalendarioEditar", "Editar Calendario", "500", "", "MasterCalendarioEditar", 1, 0, rec, recRow);
};

var clickFiltrarCalendario = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterCalendarioFiltro", "Filtrar Maestro Calendario", "500", "", "MasterCalendarioFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterCalendario = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterCalendarioGrilla')[0].filtros;
        if(filtros !== null){

            storeCargarCalendarios.load({
                params:{
                    p_tipo : filtros.p_tipo,
                    p_anho : filtros.p_anho,
                    p_mes: filtros.p_mes,
                    p_dia: filtros.p_dia,
                    p_estado : filtros.p_estado
                }
            });

        }else{
            storeCargarCalendarios.load({});
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterCalendarioGrilla')[0].filtros = null;
        storeCargarCalendarios.load();
    }
};
