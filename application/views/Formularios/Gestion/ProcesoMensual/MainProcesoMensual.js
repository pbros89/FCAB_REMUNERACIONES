/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainProcesoMensual", {
    extend: 'Ext.container.Container',
    xtype: 'MainProcesoMensual',
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

            if(pantalla == 'PROCESO_MENSUAL' && estado == 'A'){
                switch(acc){
                    case 'DETALLE':
                        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnDetalle')[0].setHidden(false);
                        break;
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnEliminar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'PROCESO_MENSUAL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MainProcesoMensualGrilla')[0].suspendEvents();
            }
        });

        cargarMainProcesoMensual(null);
    },
    items: [{
    	xtype: 'MainProcesoMensualGrilla'
    }]

});


Ext.define('fcab.Container.MainProcesoMensual.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainProcesoMensualGrilla',
    itemId: 'MainProcesoMensualGrilla',
    store: storeCargarProcesosMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarProcesoMensual(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'PFK_COD_EMP',
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
            text     : 'Proceso',
            sortable : true,
            dataIndex: 'PK_PROCESO',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'PK_TIPO',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Inicio',
            sortable : true,
            dataIndex: 'INICIO',
            flex:2
        },

        {
            text     : 'Termino',
            sortable : true,
            dataIndex: 'TERMINO',
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
            hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            flex: 2,
            hidden: true
        },
        {
            text     : 'Observacion',
            sortable : true,
            dataIndex: 'OBSERVACION',
            flex: 2,
            //hidden: true
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1,
            renderer : function(value, meta) {
                if(value === 'EN ESPERA')
                {
                    meta.style = 'color:red;';
                    return 'EN ESPERA';
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
                    clickDetalleProcesoMensual(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea ver el Detalle", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Iniciar',
            itemId: 'btnIngresar',
            hidden: true,
            tooltip: 'Iniciar nuevo item',
            iconCls: 'icon-form-add',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                clickCrearProcesoMensual(grid);
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
                    clickEditarProcesoMensual(grid, rowIndex);
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
                    clickTerminarprocesoMensual(grid, rowIndex);
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
                    clickEliminarProcesoMensual(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea eliminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Faltantes',
            itemId: 'btnFaltantes',
            hidden: false,
            tooltip: 'Agregar trabajadores y conceptos faltantes.',
            iconCls: 'icon-form-suspend',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickFaltanteProcesoMensual(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea agregar faltante.", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Importar',
            itemId: 'btnImportar',
            hidden: false,
            tooltip: 'Importar planilla de conceptos personalizada.',
            iconCls: 'icon-form-edit',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickImportarProcesoMensual(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea agregar faltante.", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMainProcesoMensual(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Procesos Mensual " + NOM_EMPRESA,
                  fileName: 'Procesos Mensual '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarProcesoMensual(grid);
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
                Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainProcesoMensual(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    title: 'Proceso Mensual ('+NOM_EMPRESA+')',
});


Ext.define('fcab.form.Paggin.MainProcesoMensual', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMainProcesoMensual',
    store: storeCargarCentroCostos,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});

var clickCrearProcesoMensual = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MainProcesoMensualCrear", "Crear Proceso Mensual ("+NOM_EMPRESA+")", "500", "", "MainProcesoMensualCrear", 1, 0, rec);
};

var clickDetalleProcesoMensual = function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MainProcesoMensualDetalle", "Detalle Proceso Mensual ("+NOM_EMPRESA+")", "1000", "", "MainProcesoMensualDetalle", 1, 0, rec, recRow);
};

var clickFaltanteProcesoMensual = function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica(
        "MainProcesoMensualFaltante", 
        "Faltantes "+ recRow.data.PK_TIPO + " " + recRow.data.PK_PROCESO , 
        "1000", "", "MainProcesoMensualFaltante", 1, 0, rec, recRow);
};

var clickImportarProcesoMensual = function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica(
        "ImportarExportarProcesoMensualPersonalizado", 
        "Importar Personalizado "+ recRow.data.PK_TIPO + " " + recRow.data.PK_PROCESO , 
        "800", "", "ImportarExportarProcesoMensualPersonalizado", 1, 0, rec, recRow);
};

var clickEditarProcesoMensual= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MainProcesoMensualEditar", "Editar Proceso Mensual ("+NOM_EMPRESA+")", "500", "", "MainProcesoMensualEditar", 1, 0, rec, recRow);
};

var clickTerminarprocesoMensual = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Proceso Mensual', '¿Esta seguro de terminar el proceso mensual?', function(btn) {
        if (btn === 'yes') {
                storeModificarEstadoProcMensual.load({
                    params:{
                        p_proceso: recRow.data.PK_PROCESO,
                        p_cod_emp: EMPRESA,
                        p_tipo: recRow.data.PK_TIPO,
                        p_estado: 'TERMINADO',
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Proceso Mensual terminado correctamente.');
                                cargarMainProcesoMensual(null);
                                
                                if(Ext.getCmp('PersonasProcesoMensual') != null){
                                    cargarCCPersonasProcesoMensual();
                                }
                                
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

var clickEliminarProcesoMensual= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Proceso Mensual', '¿Esta seguro de eliminar el proceso mensual?', function(btn) {
        if (btn === 'yes') {
            Ext.MessageBox.show({
                msg: 'Cargando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });
            storeBorrarProcesoMensual.load({
                params : {
                    p_cod_emp: EMPRESA,
                    p_proceso: recRow.data.PK_PROCESO,
                    p_tipo: recRow.data.PK_TIPO,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    Ext.MessageBox.hide();
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Proceso mensual eliminado correctamente.');
                            cargarMainProcesoMensual(null);
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


var clickFiltrarProcesoMensual = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainProcesoMensualFiltro", "Filtrar Proceso Mensual ("+NOM_EMPRESA+")", "300", "", "MainProcesoMensualFiltro", 1, 0, grid, filtros);
    
};

var cargarMainProcesoMensual = function(filtros){

    if(filtros !== null)
    {
        storeCargarProcesosMensual.load({
            params:{
                p_cod_emp : EMPRESA,
                p_anho : filtros.p_anho,
                p_mes: filtros.p_mes,
                p_estado: filtros.p_estado,
                p_tipo: filtros.p_tipo
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainProcesoMensualGrilla')[0].filtros = null;
        storeCargarProcesosMensual.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
