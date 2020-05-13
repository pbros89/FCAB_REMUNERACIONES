/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainCambioSalud", {
    extend: 'Ext.container.Container',
    xtype: 'MainCambioSalud',
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

            if(pantalla == 'CAMBIO_SALUD' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnIngresar')[0].setHidden(false);
                        break;

                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }
        });

        cargarMainCambioSalud(null);
    },
    items: [{
    	xtype: 'MainCambioSaludGrilla'
    }]

});


Ext.define('fcab.Container.MainCambioSalud.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainCambioSaludGrilla',
    itemId: 'MainCambioSaludGrilla',
    store: storeCargarCambiarSalud,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
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
        },{
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
            text     : 'ID Salud',
            sortable : true,
            dataIndex: 'COD_SALUD',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Salud',
            sortable : true,
            dataIndex: 'NOM_SALUD',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Tipo Valor Plan',
            sortable : true,
            dataIndex: 'TIPO_PLAN',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Plan',
            sortable : true,
            dataIndex: 'VALOR_PLAN',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },
        {
            text     : 'Tipo Valor Ges',
            sortable : true,
            dataIndex: 'TIPO_GES',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Ges',
            sortable : true,
            dataIndex: 'VALOR_GES',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },
        {
            text     : 'Tipo Valor Adi Tra',
            sortable : true,
            dataIndex: 'TIPO_ADI_TRA',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Adi Tra',
            sortable : true,
            dataIndex: 'VALOR_ADI_TRA',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },

        {
            text     : 'Tipo Valor Adi Emp',
            sortable : true,
            dataIndex: 'TIPO_ADI_EMP',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Adi Emp',
            sortable : true,
            dataIndex: 'VALOR_ADI_EMP',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },

        {
            text     : 'Tipo Valor Convenio',
            sortable : true,
            dataIndex: 'TIPO_CONVENIO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Valor Convenio',
            sortable : true,
            dataIndex: 'VALOR_CONVENIO',
            //align: 'center',
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
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
                clickCrearCambioSalud(grid);
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
                    clickTerminarCambioSalud(grid, rowIndex);
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
                    clickEliminarCambioSalud(grid, rowIndex);
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
                    clickAnularCambioSalud(grid, rowIndex);
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
                    "cambio_salud",
                    "Cambio Salud " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "cambio_salud",
                    "Cambio Salud " + recRow.data.PK_ID
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
                cargarMainCambioSalud(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Cambio Salud " + NOM_EMPRESA,
                  fileName: 'Cambio Salud '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarCambioSalud(grid);
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
                Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainCambioSalud(null);
            }
        }]
    }],
    title: 'Cambio de Salud ('+NOM_EMPRESA+')',
});



var clickCrearCambioSalud = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;
    var height = Ext.getBody().getViewSize().height*.90;

    ventanaDinamica("CrearCambioSalud", "Cambiar Salud ("+NOM_EMPRESA+")", width, "", "CrearCambioSalud", 1, 0, rec);
};


var clickFiltrarCambioSalud = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainCambioSaludFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainCambioSaludFiltro", 1, 0, grid, filtros);
    
};


var clickAnularCambioSalud = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular cambio de salud', 
        '¿Esta seguro de anular el cambio de salud?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador vuelve a su información de salud anterior.</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularCambioSalud.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio de salud anulado correctamente.');
                            cargarMainCambioSalud(null);
                            
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

var cargarMainCambioSalud = function(filtros){

    if(filtros !== null)
    {
        storeCargarCambiarSalud.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainCambioSaludGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainCambioSaludGrilla')[0].filtros = null;
        storeCargarCambiarSalud.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};


var clickTerminarCambioSalud = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Cambio Salud', '¿Esta seguro de terminar el cambio?', function(btn) {
        if (btn === 'yes') {
                storeTerminarCambioSalud.load({
                    params:{
                        p_cod: recRow.data.PK_ID,
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Cambio terminado correctamente.');
                                cargarMainCambioSalud(null);
                                
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

var clickEliminarCambioSalud= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Cambio Salud', '¿Esta seguro de eliminar el cambio?', function(btn) {
        if (btn === 'yes') {
            storeEliminarCambioSalud.load({
                params : {
                    p_cod: recRow.data.PK_ID,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Cambio eliminado correctamente.');
                            cargarMainCambioSalud(null);
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