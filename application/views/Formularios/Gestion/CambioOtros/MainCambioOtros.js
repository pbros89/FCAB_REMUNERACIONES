/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainCambioOtros", {
    extend: 'Ext.container.Container',
    xtype: 'MainCambioOtros',
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

            if(pantalla == 'CAMBIO_OTROS' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }
        });
        cargarMainCambioOtros(null);
    },
    items: [{
    	xtype: 'MainCambioOtrosGrilla'
    }]

});


Ext.define('fcab.Container.MainCambioOtros.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainCambioOtrosGrilla',
    itemId: 'MainCambioOtrosGrilla',
    store: storeCargarCambiarOtros,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
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
            text     : 'Estado Civil',
            sortable : true,
            dataIndex: 'NOM_EST_CIVIL',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Nvl Educacional',
            sortable : true,
            dataIndex: 'NOM_ESCOLARIDAD',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Calle',
            sortable : true,
            dataIndex: 'CALLE',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Numero',
            sortable : true,
            dataIndex: 'NUMERO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Depto',
            sortable : true,
            dataIndex: 'DEPARTAMENTO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Ciudad',
            sortable : true,
            dataIndex: 'CIUDAD',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Comuna',
            sortable : true,
            dataIndex: 'COMUNA',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Correo',
            sortable : true,
            dataIndex: 'CORREO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Telefono',
            sortable : true,
            dataIndex: 'TELEFONO',
            //align: 'center',
            width: 200
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
                clickCrearCambioOtros(grid);
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
                    clickTerminarCambioOtros(grid, rowIndex);
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
                    clickEliminarCambioOtros(grid, rowIndex);
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
                    clickAnularCambioOtros(grid, rowIndex);
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
                    "cambio_otros",
                    "Cambio Otros " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "cambio_otros",
                    "Cambio Otros " + recRow.data.PK_ID
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
                cargarMainCambioOtros(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Cambio Otros " + NOM_EMPRESA,
                  fileName: 'Cambio Otros '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCambioOtros(grid);
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
                Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainCambioOtros(null);
            }
        }]
    }],
    title: 'Cambio Otros ('+NOM_EMPRESA+')',
});



var clickCrearCambioOtros = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;
    var height = Ext.getBody().getViewSize().height*.90;

    ventanaDinamica("CrearCambioOtros", "Cambiar Otros ("+NOM_EMPRESA+")", width, "", "CrearCambioOtros", 1, 0, rec);
};


var clickFiltrarCambioOtros = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainCambioOtrosFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainCambioOtrosFiltro", 1, 0, grid, filtros);
    
};

var cargarMainCambioOtros = function(filtros){

    if(filtros !== null)
    {
        storeCargarCambiarOtros.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainCambioOtrosGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainCambioOtrosGrilla')[0].filtros = null;
        storeCargarCambiarOtros.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};


var clickTerminarCambioOtros = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Cambio Otros', '¿Esta seguro de terminar el cambio?', function(btn) {
        if (btn === 'yes') {
                storeTerminarCambioOtros.load({
                    params:{
                        p_cod: recRow.data.PK_ID,
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Cambio terminado correctamente.');
                                cargarMainCambioOtros(null);
                                
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

var clickAnularCambioOtros = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular cambio otros', 
        '¿Esta seguro de anular el cambio otros?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador vuelve a su información de otros anterior.</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularCambioOtros.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio otros anulado correctamente.');
                            cargarMainCambioOtros(null);
                            
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

var clickEliminarCambioOtros= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Cambio Otros', '¿Esta seguro de eliminar el cambio?', function(btn) {
        if (btn === 'yes') {
            storeEliminarCambioOtros.load({
                params : {
                    p_cod: recRow.data.PK_ID,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio eliminado correctamente.');
                            cargarMainCambioOtros(null);
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