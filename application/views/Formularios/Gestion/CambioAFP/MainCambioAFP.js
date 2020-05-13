/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainCambioAFP", {
    extend: 'Ext.container.Container',
    xtype: 'MainCambioAFP',
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

            if(pantalla == 'CAMBIO_AFP' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnEliminar')[0].setHidden(false);
                        break;

                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }
        });

        cargarMainCambioAFP(null);
    },
    items: [{
    	xtype: 'MainCambioAFPGrilla'
    }]

});


Ext.define('fcab.Container.MainCambioAFP.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainCambioAFPGrilla',
    itemId: 'MainCambioAFPGrilla',
    store: storeCargarCambiarAFP,
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
            text     : 'ID AFP',
            sortable : true,
            dataIndex: 'COD_AFP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'AFP',
            sortable : true,
            dataIndex: 'NOM_AFP',
            //align: 'center',
            width: 150
        },
        {
            text     : 'ID APV',
            sortable : true,
            dataIndex: 'COD_APV',
            //align: 'center',
            width: 150,
            hidden: true,
        },
        {
            text     : 'APV',
            sortable : true,
            dataIndex: 'NOM_APV',
            width: 150
        },

        {
            text     : 'Tipo Monto',
            sortable : true,
            dataIndex: 'TIPO_MONTO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Monto',
            sortable : true,
            dataIndex: 'MONTO',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
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
            text     : 'ID AFP OLD',
            sortable : true,
            dataIndex: 'COD_AFP_OLD',
            //align: 'center',
            width: 100,
            hidden: true,
        },
        {
            text     : 'AFP OLD',
            sortable : true,
            dataIndex: 'NOM_AFP_OLD',
            //align: 'center',
            width: 200,
            hidden: true,
        },
        {
            text     : 'ID APV OLD',
            sortable : true,
            dataIndex: 'COD_APV_OLD',
            //align: 'center',
            width: 100,
            hidden: true,
        },
        {
            text     : 'APV OLD',
            sortable : true,
            dataIndex: 'NOM_APV_OLD',
            //align: 'center',
            width: 200,
            hidden: true,
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
                clickCrearCambioAFP(grid);
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
                    clickTerminarCambioAFP(grid, rowIndex);
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
                    clickEliminarCambioAFP(grid, rowIndex);
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
                    clickAnularCambioAFP(grid, rowIndex);
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
                    "cambio_afp",
                    "Cambio AFP " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "cambio_afp",
                    "Cambio AFP " + recRow.data.PK_ID
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
                cargarMainCambioAFP(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Cambio AFP " + NOM_EMPRESA,
                  fileName: 'Cambio AFP '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCambioAFP(grid);
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
                Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainCambioAFP(null);
            }
        }]
    }],
    title: 'Cambio de AFP ('+NOM_EMPRESA+')',
});



var clickCrearCambioAFP = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;

    ventanaDinamica("CrearCambioAFP", "Cambiar AFP ("+NOM_EMPRESA+")", width, '', "CrearCambioAFP", 1, 0, rec);
};

var clickAnularCambioAFP = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular Cambio de AFP', 
        '¿Esta seguro de anular el cambio de AFP?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador vuelve a su información de AFP anterior.</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularCambioAFP.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio de AFP anulado correctamente.');
                            cargarMainCambioAFP(null);
                            
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

var clickTerminarCambioAFP = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Cambio AFP', '¿Esta seguro de terminar el cambio?', function(btn) {
        if (btn === 'yes') {
                storeTerminarCambioAFP.load({
                    params:{
                        p_cod: recRow.data.PK_ID,
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Cambio terminado correctamente.');
                                cargarMainCambioAFP(null);
                                
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

var clickEliminarCambioAFP= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Cambio AFP', '¿Esta seguro de eliminar el cambio?', function(btn) {
        if (btn === 'yes') {
            storeEliminarCambioAFP.load({
                params : {
                    p_cod: recRow.data.PK_ID,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio eliminado correctamente.');
                            cargarMainCambioAFP(null);
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


var clickFiltrarCambioAFP = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainCambioAFPFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainCambioAFPFiltro", 1, 0, grid, filtros);
    
};

var cargarMainCambioAFP = function(filtros){

    if(filtros !== null)
    {
        storeCargarCambiarAFP.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainCambioAFPGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainCambioAFPGrilla')[0].filtros = null;
        storeCargarCambiarAFP.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
