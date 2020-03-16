
 /**
  * Contenedor
  **/
Ext.define("fcab.Container.MasterEmpresa", {
    extend: 'Ext.container.Container',
    xtype: 'MasterEmpresa',
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

            if(pantalla == 'MAESTRO_EMPRESA' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterEmpresaGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterEmpresaGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_EMPRESA' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterEmpresaGrilla')[0].suspendEvents();
            }
        });

        storeCargarEmpresas.load();
    },
    items: [{
    	xtype: 'MasterEmpresaGrilla'
    }]

});


Ext.define('fcab.Container.MasterEmpresa.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterEmpresaGrilla',
    itemId: 'MasterEmpresaGrilla',
    store: storeCargarEmpresas,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarEmpresa(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_COD_EMP',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
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
                clickCrearEmpresa(grid);
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
                    clickEditarEmpresa(grid, rowIndex);
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
                storeCargarEmpresas.load();
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Empresas",
                  fileName: 'Empresas ' + new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    title: 'Maestro Empresa',
    viewConfig: {
        stripeRows: true
    },
});

Ext.define('fcab.form.Paggin.MasterEmpresa', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterEmpresa',
    store: storeCargarEmpresas,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearEmpresa = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterEmpresaCrear", "Crear Empresa", "500", "", "MasterEmpresaCrear", 1, 0, rec);
};

var clickEditarEmpresa= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterEmpresaEditar", "Editar Empresa", "500", "", "MasterEmpresaEditar", 1, 0, rec, recRow);
};
