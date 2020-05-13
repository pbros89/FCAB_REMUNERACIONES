/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainAusentismo", {
    extend: 'Ext.container.Container',
    xtype: 'MainAusentismo',
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

            if(pantalla == 'AUSENTISMO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }
        });

        cargarMainAusentismo(null);
    },
    items: [{
    	xtype: 'MainAusentismoGrilla'
    }]

});


Ext.define('fcab.Container.MainAusentismo.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainAusentismoGrilla',
    itemId: 'MainAusentismoGrilla',
    store: storeCargarAusentismo,
    columnLines: true,
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            
        }
    },
    columns: [
        {
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'COD_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            width: 150,
            hidden: false,
            renderer : function(value, meta) {
                if(value === 'EN ESPERA')
                {
                    meta.style = 'color:orange;';
                    return 'EN ESPERA';
                }else if(value === 'ANULADO')
                {
                    meta.style = 'color:red;';
                    return 'ANULADO';
                }else if(value === 'TERMINADO'){
                    meta.style = 'color:green;';
                    return 'TERMINADO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_ID',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Periodo',
            sortable : true,
            dataIndex: 'PERIODO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Rut',
            sortable : true,
            dataIndex: 'RUT',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'TIPO',
            //align: 'center',
            hidden: true,
            width: 150
        },
        {
            text     : 'ID Ausentismo',
            sortable : true,
            dataIndex: 'COD_AUSENTISMO',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Ausentismo',
            sortable : true,
            dataIndex: 'NOMBRE_AUSENTISMO',
            //align: 'center',
            hidden: false,
            width: 200
        },
        {
            text     : 'Inicio',
            sortable : true,
            dataIndex: 'FECHA_INI',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Termino',
            sortable : true,
            dataIndex: 'FECHA_FIN',
            //align: 'center',
            width: 150,
            hidden: false,
        },
        {
            text     : 'Dias',
            sortable : true,
            dataIndex: 'CANTIDAD_DIAS',
            width: 150
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Observacion',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            width: 200
        },
        {
            text     : 'ID Personal',
            sortable : true,
            dataIndex: 'FK_PERSONAL',
            width: 200,
            hidden: true,
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
                clickCrearAusentismo(grid);
            }
        }, {
            text: 'Terminar',
            itemId: 'btnTerminar',
            hidden: true,
            tooltip: 'Terminar Item seleccionado',
            iconCls: 'icon-form-ok',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickTerminarAusentismo(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea terminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Eliminar',
            itemId: 'btnEliminar',
            hidden: true,
            tooltip: 'Eliminar Item seleccionado',
            iconCls: 'icon-form-delete',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEliminarAusentismo(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea eliminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Anular',
            itemId: 'btnAnular',
            hidden: true,
            tooltip: 'Anular Item seleccionado',
            iconCls: 'icon-form-suspend',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAnularAusentismo(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea anular", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: "Documentos",
            itemId: "btnDoc",
            hidden: true,
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
                if (ROL == "ADMIN" || ROL == "SUPER_ADMIN" || recRow.data.ESTADO == 'EN ESPERA') 
                {
                  modalAdjuntosAdmin(
                    recRow.data.PK_ID,
                    "ausentismo",
                    "Ausentismo " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "ausentismo",
                    "Ausentismo " + recRow.data.PK_ID
                  );
                }
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
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMainAusentismo(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Ausentismo " + NOM_EMPRESA,
                  fileName: 'Ausentismo '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarAusentismo(grid);
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
                Ext.ComponentQuery.query('#MainAusentismoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainAusentismo(null);
            }
        }]
    }],
    title: 'Ausentismo ('+NOM_EMPRESA+')',
});



var clickCrearAusentismo = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;

    ventanaDinamica("CrearAusentismo", "Crear Ausentismo ("+NOM_EMPRESA+")", width, '', "CrearAusentismo", 1, 0, rec);
};

var clickAnularAusentismo = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Anular Ausentismo', '¿Esta seguro de anular el ausentismo?<br><b>Los registros anulados no seran considerados para reportes.</b>', function(btn) {
        if (btn === 'yes') {
            storeAnularAusentismo.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Ausentismo anulado correctamente.');
                            cargarMainAusentismo(null);
                            
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
}

var clickTerminarAusentismo = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Ausentismo', '¿Esta seguro de terminar el ausentismo?', function(btn) {
        if (btn === 'yes') {
                storeTerminarAusentismo.load({
                    params:{
                        p_cod: recRow.data.PK_ID,
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Ausentismo terminado correctamente.');
                                cargarMainAusentismo(null);
                                
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
}

var clickEliminarAusentismo= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Ausentismo', '¿Esta seguro de eliminar el ausentismo?', function(btn) {
        if (btn === 'yes') {
            storeEliminarAusentismo.load({
                params : {
                    p_cod: recRow.data.PK_ID,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Ausentismo eliminado correctamente.');
                            cargarMainAusentismo(null);
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


var clickFiltrarAusentismo = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainAusentismoFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainAusentismoFiltro", 1, 0, grid, filtros);
    
};

var cargarMainAusentismo = function(filtros){

    if(filtros !== null)
    {
        storeCargarAusentismo.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2,
                p_tipo: filtros.p_tipo
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainAusentismoGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainAusentismoGrilla')[0].filtros = null;
        storeCargarAusentismo.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
