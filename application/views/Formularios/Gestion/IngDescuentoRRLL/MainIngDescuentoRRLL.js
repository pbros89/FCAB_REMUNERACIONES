/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainIngDescuentoRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'MainIngDescuentoRRLL',
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

            if(pantalla == 'INGRESO_DESCUENTO_RRLL' && estado == 'A'){
                switch(acc){
                    /*case 'DETALLE':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnDetalle')[0].setHidden(false);
                        break;*/
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'INGRESO_DESCUENTO_RRLL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla')[0].suspendEvents();
            }
        });
        cargarMainIngDescuentoRRLL(null);
    },
    items: [{
    	xtype: 'MainIngDescuentoRRLLGrilla'
    }]

});


Ext.define('fcab.Container.MainIngDescuentoRRLL.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainIngDescuentoRRLLGrilla',
    itemId: 'MainIngDescuentoRRLLGrilla',
    store: storeCargarIngDescuentoRRLL,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarIngDescuentoRRLL(view.grid, index);
        }
    },
    columns: [
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
        },{
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'COD_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_COD',
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
            text     : 'ID CC',
            sortable : true,
            dataIndex: 'COD_CC',
            //align: 'center',
            width: 100,
            hidden: true
        },
        {
            text     : 'Nombre CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            //align: 'center',
            width: 200,
            hidden: true
        },
        {
            text     : 'ID Descuento',
            sortable : true,
            dataIndex: 'FK_DESCUENTO',
            //align: 'center',
            width: 100,
            hidden: true
        },
        {
            text     : 'Descuento',
            sortable : true,
            dataIndex: 'NOM_DESCUENTO',
            //align: 'center',
            width: 150,
            //hidden: true
        },
        {
            text     : 'Formato Valores',
            sortable : true,
            dataIndex: 'FORMATO_VALOR',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Monto Total',
            sortable : true,
            dataIndex: 'MONTO_TOTAL',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,000')
        },
        {
            text     : 'Cuotas',
            sortable : true,
            dataIndex: 'CUOTAS',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Cuota',
            sortable : true,
            dataIndex: 'VALOR_CUOTA',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,000')
        },
        {
            text     : 'Año Descuento',
            sortable : true,
            dataIndex: 'ANHO_DESCUENTO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Mes Descuento',
            sortable : true,
            dataIndex: 'MES_DESCUENTO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            //align: 'center',
            width: 150,
            hidden: true,
        },

        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            //align: 'center',
            width: 150
        },

        {
            text     : 'Modifico',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            //align: 'center',
            width: 150,
            hidden: true,
        },

        {
            text     : 'Modificación',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            //align: 'center',
            width: 150,
            hidden: true,
        },
        {
            text     : 'Observacion',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            width: 300
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
                clickCrearIngDescuentoRRLL(grid);
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
                    clickEditarIngDescuentoRRLL(grid, rowIndex);
                } catch (e) {
                    console.log(e);
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Terminar',
            itemId: 'btnTerminar',
            hidden: true,
            tooltip: 'Terminar Item seleccionado',
            iconCls: 'icon-form-ok',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickTerminarIngDescuentoRRLL(grid, rowIndex);
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
                    clickEliminarIngDescuentoRRLL(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea eliminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        }, {
            text: 'Anular',
            itemId: 'btnAnular',
            hidden: true,
            tooltip: 'Anular Item seleccionado',
            iconCls: 'icon-form-suspend',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAnularIngDescuentoRRLL(grid, rowIndex);
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
                    recRow.data.PK_COD,
                    "descuento_rrll",
                    "Descuento RRLL " + recRow.data.PK_COD
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_COD,
                    "descuento_rrll",
                    "Descuento RRLL " + recRow.data.PK_COD
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
                cargarMainIngDescuentoRRLL(grid.filtros);
                
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
                    clickFiltrarIngDescuentoRRLL(grid);
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
                Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainIngDescuentoRRLL(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    title: 'Descuentos RRLL ('+NOM_EMPRESA+')',
});


var clickTerminarIngDescuentoRRLL = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Descuento RRLL', '¿Esta seguro de terminar el descuento?', function(btn) {
        if (btn === 'yes') {
                storeCambiarEstadoIngDescuentoRRLL.load({
                    params:{
                        p_cod: recRow.data.PK_COD,
                        p_estado: 'TERMINADO',
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Descuento RRLL terminado correctamente.');
                                cargarMainIngDescuentoRRLL(null);
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

var clickAnularIngDescuentoRRLL= function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular Descuento RRLL', 
        '¿Esta seguro de anular el descuento?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br></b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularIngDescuentoRRLL.load({
                params:{
                    p_cod: recRow.data.PK_COD,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Descuento RRLL anulado correctamente.');
                            cargarMainIngDescuentoRRLL(null);
                            
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

var clickEliminarIngDescuentoRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Descuento RRLL', '¿Esta seguro de eliminar el descuento?', function(btn) {
        if (btn === 'yes') {
            storeEliminarIngDescuentoRRLL.load({
                params : {
                    p_cod: recRow.data.PK_COD,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Descuento RRLL eliminado correctamente.');
                            cargarMainIngDescuentoRRLL(null);
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

var clickCrearIngDescuentoRRLL = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;

    ventanaDinamica("CrearIngDescuentoRRLL", "Ingresar Descuento RRLL ("+NOM_EMPRESA+")", width, '', "CrearIngDescuentoRRLL", 1, 0, rec);
};

var clickEditarIngDescuentoRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    console.log(recRow);
    ventanaDinamica("EditarIngDescuentoRRLL", "Editar Descuento RRLL ("+NOM_EMPRESA+")", "600", "", "EditarIngDescuentoRRLL", 1, 0, rec, recRow);
};



var clickFiltrarIngDescuentoRRLL = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainIngDescuentoRRLLFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainIngDescuentoRRLLFiltro", 1, 0, grid, filtros);
    
};

var cargarMainIngDescuentoRRLL = function(filtros){

    if(filtros !== null)
    {
        storeCargarIngDescuentoRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainIngDescuentoRRLLGrilla')[0].filtros = null;
        storeCargarIngDescuentoRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
