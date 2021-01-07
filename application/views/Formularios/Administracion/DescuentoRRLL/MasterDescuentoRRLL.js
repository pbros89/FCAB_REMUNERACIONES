
 /**
  * Contenedor
  **/
Ext.define("fcab.Container.MasterDescuentoRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'MasterDescuentoRRLL',
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

            if(pantalla == 'MAESTRO_DESCUENTO_RRLL' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_DESCUENTO_RRLL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla')[0].suspendEvents();
            }
        });

        cargarMasterDescuentoRRLL(null);
    },
    items: [{
    	xtype: 'MasterDescuentoRRLLGrilla'
    }]

});


Ext.define('fcab.Container.MasterDescuentoRRLL.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterDescuentoRRLLGrilla',
    itemId: 'MasterDescuentoRRLLGrilla',
    store: storeCargarDescuentosRRLL,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarDescuentoRRLL(view.grid, index);
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
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'PK_COD_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'ID Descuento',
            sortable : true,
            dataIndex: 'PK_COD',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'FK_TIPO',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_DESCUENTO',
            flex:2
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            flex: 2
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
                clickCrearDescuentoRRLL(grid);
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
                    clickEditarDescuentoRRLL(grid, rowIndex);
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
                cargarMasterDescuentoRRLL(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Decuentos RRLL " + NOM_EMPRESA,
                  fileName: 'Descuentos RRLL '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarDescuentoRRLL(grid);
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
                Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterDescuentoRRLL(null);
            }
        }]
    }],
    title: 'Maestro Descuentos RRLL ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true

    },
});


var clickCrearDescuentoRRLL = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterDescuentoRRLLCrear", "Crear Descuento RRLL ("+NOM_EMPRESA+")", "500", "", "MasterDescuentoRRLLCrear", 1, 0, rec);
};

var clickEditarDescuentoRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterDescuentoRRLLEditar", "Editar Descuento RRLL ("+NOM_EMPRESA+")", "500", "", "MasterDescuentoRRLLEditar", 1, 0, rec, recRow);
};

var clickFiltrarDescuentoRRLL = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterDescuentoRRLLFiltro", "Filtrar Master Descuento RRLL ("+NOM_EMPRESA+")", "500", "", "MasterDescuentoRRLLFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterDescuentoRRLL = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla')[0].filtros;
        if(filtros !== null)
        {
            storeCargarDescuentosRRLL.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_cod : filtros.p_cod,
                    p_nombre: filtros.p_nombre,
                    p_estado: filtros.p_estado
                }
            });
        }else{
            storeCargarDescuentosRRLL.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterDescuentoRRLLGrilla')[0].filtros = null;
        storeCargarDescuentosRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
