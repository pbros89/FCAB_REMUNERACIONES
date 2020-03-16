Ext.define("fcab.Container.MasterCargo", {
    extend: 'Ext.container.Container',
    xtype: 'MasterCargo',
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

            if(pantalla == 'MAESTRO_CARGO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterCargoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterCargoGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_CARGO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterCargoGrilla')[0].suspendEvents();
            }
        });

        cargarMasterCargo(null);
    },
    items: [{
    	xtype: 'MasterCargoGrilla'
    }]

});


Ext.define('fcab.Container.MasterCargo.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterCargoGrilla',
    itemId: 'MasterCargoGrilla',
    store: storeCargarCargos,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarCargo(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID EMPRESA',
            sortable : true,
            dataIndex: 'PK_COD_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'EMPRESA',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'ID Cargo',
            sortable : true,
            dataIndex: 'PK_COD_CARGO',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            flex:2
        },
        {
            text     : 'Rol',
            sortable : true,
            dataIndex: 'FK_ROL',
            flex:2
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            flex:2,
            //hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            flex:2,
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
        }
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
                clickCrearCargo(grid);
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
                    clickEditarCargo(grid, rowIndex);
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
                cargarMasterCargo(grid.filtros);
                
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
                  title: "Cargos " + NOM_EMPRESA,
                  fileName: 'Cargos '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCargo(grid);
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
                Ext.ComponentQuery.query('#MasterCargoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterCargo(null);
            }
        }]
    }],
    title: 'Maestro Cargo ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true,
    },
});

Ext.define('fcab.form.Paggin.MasterCargo', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterCargo',
    store: storeCargarCargos,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearCargo = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterCargoCrear", "Crear Cargo ("+NOM_EMPRESA+")", "500", "", "MasterCargoCrear", 1, 0, rec);
};

var clickEditarCargo= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterCargoEditar", "Editar Cargo ("+NOM_EMPRESA+")", "500", "", "MasterCargoEditar", 1, 0, rec, recRow);
};

var clickFiltrarCargo = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterCargoFiltro", "Filtrar Master Cargo ("+NOM_EMPRESA+")", "500", "", "MasterCargoFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterCargo = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterCargoGrilla')[0].filtros;
        if(filtros !== null){

            storeCargarCargos.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_cod_cargo : filtros.p_cod_cargo,
                    p_nombre: filtros.p_nombre,
                    p_estado: filtros.p_estado,
                    p_rol : filtros.p_rol
                }
            });

        }else{
            storeCargarCargos.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterCargoGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterCargoGrilla')[0].filtros = null;
        storeCargarCargos.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
