Ext.define("fcab.Container.MasterParametro", {
    extend: 'Ext.container.Container',
    xtype: 'MasterParametro',
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

            if(pantalla == 'MAESTRO_PARAMETRO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterParametroGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterParametroGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_PARAMETRO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterParametroGrilla')[0].suspendEvents();
            }
        });
        cargarMasterParametro(null);
    },
    items: [{
    	xtype: 'MasterParametroGrilla'
    }]

});


Ext.define('fcab.Container.MasterParametro.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterParametroGrilla',
    itemId: 'MasterParametroGrilla',
    store: storeCargarParametros,
    columnLines: true,
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarParametro(view.grid, index);
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
            text     : 'ID Parametro',
            sortable : true,
            dataIndex: 'PK_PARAM',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_PARAM',
            flex:2
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'PFK_TIPO_PARAM',
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
                clickCrearParametro(grid);
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
                    clickEditarParametro(grid, rowIndex);
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
                cargarMasterParametro(grid.filtros);
                
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
                  title: "Parametros " + NOM_EMPRESA,
                  fileName: 'Parametros '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarParametro(grid);
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
                Ext.ComponentQuery.query('#MasterParametroGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterParametro(null);
            }
        }]
    }],
    title: 'Maestro Parametro ('+NOM_EMPRESA+')',
});

Ext.define('fcab.form.Paggin.MasterParametro', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterParametro',
    store: storeCargarParametros,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearParametro = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterParametroCrear", "Crear Parametro ("+NOM_EMPRESA+")", "500", "", "MasterParametroCrear", 1, 0, rec);
};

var clickEditarParametro= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterParametroEditar", "Editar Parametro ("+NOM_EMPRESA+")", "500", "", "MasterParametroEditar", 1, 0, rec, recRow);
};

var clickFiltrarParametro = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterParametroFiltro", "Filtrar Master Parametro ("+NOM_EMPRESA+")", "500", "", "MasterParametroFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterParametro = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterParametroGrilla')[0].filtros;
        if(filtros !== null)
        {
            storeCargarParametros.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_param : filtros.p_param,
                    p_nombre: filtros.p_nombre,
                    p_estado: filtros.p_estado,
                    p_tipo : filtros.p_tipo
                }
            });
        }else{
            storeCargarParametros.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterParametroGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterParametroGrilla')[0].filtros = null;
        storeCargarParametros.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
