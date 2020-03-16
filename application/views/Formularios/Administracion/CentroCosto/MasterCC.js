
 /**
  * Contenedor
  **/
Ext.define("fcab.Container.MasterCC", {
    extend: 'Ext.container.Container',
    xtype: 'MasterCC',
    layout: 'fit',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);

        ROL_ACCIONES.forEach(accion => {
            var estado = accion.ESTADO;
            var acc = accion.PFK_ACCION;
            var pantalla = accion.PFK_PANTALLA;

            if(pantalla == 'MAESTRO_CC' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterCCGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterCCGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_CC' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterCCGrilla')[0].suspendEvents();
            }
        });


        cargarMasterCC(null);
    },
    items: [{
    	xtype: 'MasterCCGrilla'
    }]

});


Ext.define('fcab.Container.MasterCC.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterCCGrilla',
    itemId: 'MasterCCGrilla',
    store: storeCargarCentroCostos,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarCC(view.grid, index);
        },
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
            text     : 'ID CC',
            sortable : true,
            dataIndex: 'PK_COD_CC',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CC',
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
                clickCrearCC(grid);
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
                    clickEditarCC(grid, rowIndex);
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
                cargarMasterCC(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Centros de Costos " + NOM_EMPRESA,
                  fileName: 'Centros de Costos '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCC(grid);
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
                Ext.ComponentQuery.query('#MasterCCGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterCC(null);
            }
        }]
    }],
    title: 'Maestro Centro de Costo ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true,
    },
});

Ext.define('fcab.form.Paggin.MasterCC', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterCC',
    store: storeCargarCentroCostos,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearCC = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterCCCrear", "Crear Centro de Costo ("+NOM_EMPRESA+")", "500", "", "MasterCCCrear", 1, 0, rec);
};

var clickEditarCC= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterCCEditar", "Editar Centro de Costo ("+NOM_EMPRESA+")", "500", "", "MasterCCEditar", 1, 0, rec, recRow);
};

var clickFiltrarCC = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterCCFiltro", "Filtrar Master Centro de Costo ("+NOM_EMPRESA+")", "500", "", "MasterCCFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterCC = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterCCGrilla')[0].filtros;
        if(filtros !== null){
            storeCargarCentroCostos.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_cod_cc : filtros.p_cod_cc,
                    p_nombre: filtros.p_nombre,
                    p_estado: filtros.p_estado
                }
            });
        }else{
            storeCargarCentroCostos.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterCCGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterCCGrilla')[0].filtros = null;
        storeCargarCentroCostos.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
