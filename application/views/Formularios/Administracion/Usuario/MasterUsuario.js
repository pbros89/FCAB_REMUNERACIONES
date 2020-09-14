Ext.define("fcab.Container.MasterUsuario", {
    extend: 'Ext.container.Container',
    xtype: 'MasterUsuario',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);
        ROL_ACCIONES.forEach(accion => {
            var estado = accion.ESTADO;
            var acc = accion.PFK_ACCION;
            var pantalla = accion.PFK_PANTALLA;

            if(pantalla == 'MAESTRO_USUARIO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnEditar')[0].setHidden(false);
                        break;

                    case 'ASOCIAR_CC':
                        Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnAsoCC')[0].setHidden(false);
                        break;
                    
                    case 'ASOCIAR_ROL_WF':
                        Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnAsoRolWF')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_USUARIO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterUsuarioGrilla')[0].suspendEvents();
            }
        });
        cargarMasterUsuario(null)
    },
    items: [{
    	xtype: 'MasterUsuarioGrilla'
    }]

});


Ext.define('fcab.Container.MasterUsuario.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterUsuarioGrilla',
    itemId: 'MasterUsuarioGrilla',
    store: storeCargarUsuarios,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarUsuario(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            width: 100,
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
            dataIndex: 'PFK_COD_EMP',
            //align: 'center',
            hidden: true,
            width: 100,
        },
        {
            text     : 'EMPRESA',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            width: 100,
        },
        {
            text     : 'Usuario',
            sortable : true,
            dataIndex: 'PK_USUARIO',
            //align: 'center',
            width: 200,
        },
        {
            text     : 'Rol',
            sortable : true,
            dataIndex: 'ROL',
            width: 150,
        },
        {
            text     : 'Correo',
            sortable : true,
            dataIndex: 'CORREO',
            width: 250,
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            width: 150,
            //hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            width: 150,
        },
        {
            text     : 'Modificación',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            width: 150,
            //hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            width: 150,
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
                clickCrearUsuario(grid);
            }
        }, {
            text: 'Editar',
            itemId:'btnEditar',
            hidden: true,
            tooltip: 'Editar Item seleccionado',
            iconCls: 'icon-form-edit',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEditarUsuario(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Asociar Centros de Costos',
            itemId: 'btnAsoCC',
            hidden: true,
            tooltip: 'Asociar Centros de Costos Item seleccionado',
            iconCls: 'icon-form-user',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAsociarCCUsuario(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Asociar Roles WF',
            itemId: 'btnAsoRolWF',
            hidden: true,
            tooltip: 'Asociar Roles de Workflow para item seleccionado',
            iconCls: 'icon-form-user',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAsociarRolWFUsuario(grid, rowIndex);
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
                cargarMasterUsuario(grid.filtros);
                
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
                  title: "Usuarios " + NOM_EMPRESA,
                  fileName: 'Usuarios '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarUsuario(grid);
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
                Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterUsuario(null);
            }
        }]
    }],
    minHeight: 400,
    width : '100%',
    title: 'Maestro Usuario ('+NOM_EMPRESA+')',
    viewConfig: {
        //stripeRows: true

    },

    sortchange: function(ct, column, direction, eOpts) {
        this.getStore().getProxy().extraParams = {

        }
        //  load() will call the data api again once the data loading is over
        //this.getStore().load();
    }
});

Ext.define('fcab.form.Paggin.MasterUsuario', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterUsuario',
    store: storeCargarUsuarios,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearUsuario = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterUsuarioCrear", "Crear Usuario ("+NOM_EMPRESA+")", "500", "", "MasterUsuarioCrear", 1, 0, rec);
};

var clickEditarUsuario= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterUsuarioEditar", "Editar Usuario ("+NOM_EMPRESA+")", "500", "", "MasterUsuarioEditar", 1, 0, rec, recRow);
};

var clickAsociarCCUsuario= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterUsuarioCC", "Asociar Centros de Costos ("+NOM_EMPRESA+ " - " + recRow.data.PK_USUARIO +")", "1000", "", "MasterUsuarioCC", 1, 0, rec, recRow);
};

var clickAsociarRolWFUsuario= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterUsuarioRolWF", "Asociar Roles Workflow ("+NOM_EMPRESA+ " - " + recRow.data.PK_USUARIO +")", "1000", "", "MasterUsuarioRolWF", 1, 0, rec, recRow);
};

var clickFiltrarUsuario = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterUsuarioFiltro", "Filtrar Master Usuario ("+NOM_EMPRESA+")", "500", "", "MasterUsuarioFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterUsuario = function(filtros){

    if(filtros !== null)
    {
       
        filtros = Ext.ComponentQuery.query('#MasterUsuarioGrilla')[0].filtros;
        if(filtros !== null)
        {
            storeCargarUsuarios.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_usuario : filtros.p_usuario,
                    p_rol: filtros.p_rol,
                    p_estado: filtros.p_estado
                }
            });
        }else{
            storeCargarUsuarios.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterUsuarioGrilla')[0].filtros = null;
        storeCargarUsuarios.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
