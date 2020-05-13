/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainCambioSindicato", {
    extend: 'Ext.container.Container',
    xtype: 'MainCambioSindicato',
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

            if(pantalla == 'CAMBIO_SINDICATO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }
        });

        cargarMainCambioSindicato(null);
    },
    items: [{
    	xtype: 'MainCambioSindicatoGrilla'
    }]

});


Ext.define('fcab.Container.MainCambioSindicato.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainCambioSindicatoGrilla',
    itemId: 'MainCambioSindicatoGrilla',
    store: storeCargarCambiarSindicato,
    columnLines: true,
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
            text     : 'ID Tipo Cambio',
            sortable : true,
            dataIndex: 'COD_TIPO_CAMBIO',
            //align: 'center',
            hidden: true,
            width: 150
        },
        {
            text     : 'Tipo Cambio',
            sortable : true,
            dataIndex: 'NOM_TIPO_CAMBIO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'ID Sindicato',
            sortable : true,
            dataIndex: 'COD_SINDICATO',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Sindicato',
            sortable : true,
            dataIndex: 'NOM_SINDICATO',
            //align: 'center',
            width: 150
        },
        {
            text     : 'ID Adherido',
            sortable : true,
            dataIndex: 'COD_ADHERENCIA',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Adherido',
            sortable : true,
            dataIndex: 'NOM_ADHERENCIA',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            //align: 'center',
            width: 200
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
            width: 100,
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
                clickCrearCambioSindicato(grid);
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
                    clickTerminarCambioSindicato(grid, rowIndex);
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
                    clickEliminarCambioSindicato(grid, rowIndex);
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
                    clickAnularCambioSindicato(grid, rowIndex);
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
                    "cambio_sindicato",
                    "Cambio Sindicato " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "cambio_sindicato",
                    "Cambio Sindicato " + recRow.data.PK_ID
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
                cargarMainCambioSindicato(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Cambio Sindicato " + NOM_EMPRESA,
                  fileName: 'Cambio Sindicato '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCambioSindicato(grid);
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
                Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainCambioSindicato(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    title: 'Cambio de Sindicato ('+NOM_EMPRESA+')',
});



var clickCrearCambioSindicato = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;
    var height = Ext.getBody().getViewSize().height*.90;

    ventanaDinamica("CrearCambioSindicato", "Cambiar Sindicato ("+NOM_EMPRESA+")", width, "", "CrearCambioSindicato", 1, 0, rec);
};


var clickFiltrarCambioSindicato = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainCambioSindicatoFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainCambioSindicatoFiltro", 1, 0, grid, filtros);
    
};

var cargarMainCambioSindicato = function(filtros){

    if(filtros !== null)
    {
        storeCargarCambiarSindicato.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainCambioSindicatoGrilla')[0].filtros = null;
        storeCargarCambiarSindicato.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};

var clickAnularCambioSindicato = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular cambio de sindicato', 
        '¿Esta seguro de anular el cambio de sindicato?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador vuelve a su información de sindicato anterior.</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularCambioSindicato.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio de sindicato anulado correctamente.');
                            cargarMainCambioSindicato(null);
                            
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


var clickTerminarCambioSindicato = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Cambio Sindicato', '¿Esta seguro de terminar el cambio?', function(btn) {
        if (btn === 'yes') {
                storeTerminarCambioSindicato.load({
                    params:{
                        p_cod: recRow.data.PK_ID,
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Cambio terminado correctamente.');
                                cargarMainCambioSindicato(null);
                                
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

var clickEliminarCambioSindicato= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Cambio Sindicato', '¿Esta seguro de eliminar el cambio?', function(btn) {
        if (btn === 'yes') {
            storeEliminarCambioSindicato.load({
                params : {
                    p_cod: recRow.data.PK_ID,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio eliminado correctamente.');
                            cargarMainCambioSindicato(null);
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