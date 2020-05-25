/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainFiniquito", {
    extend: 'Ext.container.Container',
    xtype: 'MainFiniquito',
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

            if(pantalla == 'FINIQUITO' && estado == 'A'){
                switch(acc){
                    case 'DETALLE':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnDetalle')[0].setHidden(false);
                        break;
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'FINIQUITO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MainFiniquitoGrilla')[0].suspendEvents();
            }
        });

        cargarMainFiniquito(null);
    },
    items: [{
    	xtype: 'MainFiniquitoGrilla'
    }]

});


Ext.define('fcab.Container.MainFiniquito.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainFiniquitoGrilla',
    itemId: 'MainFiniquitoGrilla',
    store: storeCargarFiniquitos,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarFiniquito(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'FK_COD_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_FINIQUITO',
            //align: 'center',
            hidden: false,
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
            width: 250
        },

        {
            text     : 'ID Causal',
            sortable : true,
            dataIndex: 'COD_CAUSAL',
            //align: 'center',
            width: 100
        },

        {
            text     : 'Causal',
            sortable : true,
            dataIndex: 'NOM_CAUSAL',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Fecha Baja',
            sortable : true,
            dataIndex: 'FECHA_BAJA',
            width: 100
            //hidden: true
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            width: 100
            //hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            width: 200
        },
        {
            text     : 'Modificación',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            width: 100,
            hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            width: 200,
            hidden: true
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            width: 100,
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
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Detalle',
            itemId: 'btnDetalle',
            hidden: true,
            tooltip: 'Ver Detalle',
            iconCls: 'icon-form-detail',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickDetalleFiniquito(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea ver el Detalle", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Ingresar',
            itemId: 'btnIngresar',
            hidden: true,
            tooltip: 'Crear nuevo item',
            iconCls: 'icon-form-add',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                clickCrearFiniquito(grid);
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
                    clickEditarFiniquito(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
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
                    clickTerminarFiniquito(grid, rowIndex);
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
                    clickEliminarFiniquito(grid, rowIndex);
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
                    clickAnularFiniquito(grid, rowIndex);
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
                    recRow.data.PK_FINIQUITO,
                    "finiquito",
                    "Finiquito " + recRow.data.PK_FINIQUITO
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_FINIQUITO,
                    "finiquito",
                    "Finiquito " + recRow.data.PK_FINIQUITO
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
                cargarMainFiniquito(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Finiquitos " + NOM_EMPRESA,
                  fileName: 'Finiquitos '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarFiniquito(grid);
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
                Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainFiniquito(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    title: 'Finiquitar Personal ('+NOM_EMPRESA+')',
});


var clickCrearFiniquito = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MainFiniquitoCrear", "Crear Finiquito ("+NOM_EMPRESA+")", "500", "", "MainFiniquitoCrear", 1, 0, rec);
};

var clickDetalleFiniquito = function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    
    ventanaDinamica("MainFiniquitoDetalle", "Detalle Finiquito ("+NOM_EMPRESA+")", "1000", "", "MainFiniquitoDetalle", 1, 0, rec, recRow);
};

var clickEditarFiniquito= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MainFiniquitoEditar", "Editar Finiquito ("+NOM_EMPRESA+")", "500", "", "MainFiniquitoEditar", 1, 0, rec, recRow);
};

var clickTerminarFiniquito = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Finiquito', '¿Esta seguro de terminar el finiquito?', function(btn) {
        if (btn === 'yes') {
                storeCambiarEstadoFiniquito.load({
                    params:{
                        p_finiquito: recRow.data.PK_FINIQUITO,
                        p_estado: 'TERMINADO',
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Finiquito terminado correctamente.');
                                cargarMainFiniquito(null);
                                
                                
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

var clickAnularFiniquito = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular finiquito', 
        '¿Esta seguro de anular el finiquito?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador volvera a estar vigente.</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularFiniquito.load({
                params:{
                    p_cod: recRow.data.PK_FINIQUITO,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Finiquito anulado correctamente.');
                            cargarMainFiniquito(null);
                            
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

var clickEliminarFiniquito= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Finiquito', '¿Esta seguro de eliminar el finiquito?', function(btn) {
        if (btn === 'yes') {
            storeEliminarFiniquito.load({
                params : {
                    p_finiquito: recRow.data.PK_FINIQUITO,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Finiquito eliminado correctamente.');
                            cargarMainFiniquito(null);
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


var clickFiltrarFiniquito = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainFiniquitoFiltro", "Filtrar Finiquito ("+NOM_EMPRESA+")", "400", "", "MainFiniquitoFiltro", 1, 0, grid, filtros);
    
};

var cargarMainFiniquito = function(filtros){

    if(filtros !== null)
    {
        storeCargarFiniquitos.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2,
                p_estado: filtros.p_estado
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainFiniquitoGrilla')[0].filtros = null;
        storeCargarFiniquitos.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
