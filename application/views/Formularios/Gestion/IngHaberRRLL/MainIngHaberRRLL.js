/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainIngHaberRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'MainIngHaberRRLL',
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

            if(pantalla == 'INGRESO_HABER_RRLL' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnEliminar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'INGRESO_HABER_RRLL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla')[0].suspendEvents();
            }
        });
        cargarMainIngHaberRRLL(null);
    },
    items: [{
    	xtype: 'MainIngHaberRRLLGrilla'
    }]

});


Ext.define('fcab.Container.MainIngHaberRRLL.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainIngHaberRRLLGrilla',
    itemId: 'MainIngHaberRRLLGrilla',
    store: storeCargarIngHaberRRLL,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarIngHaberRRLL(view.grid, index);
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
                    meta.style = 'color:red;';
                    return 'EN ESPERA';
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
            text     : 'ID Haber',
            sortable : true,
            dataIndex: 'FK_HABER',
            //align: 'center',
            width: 100,
            hidden: true
        },
        {
            text     : 'Haber',
            sortable : true,
            dataIndex: 'NOM_HABER',
            //align: 'center',
            width: 150,
            //hidden: true
        },
        {
            text     : 'Usa Fecha',
            sortable : true,
            dataIndex: 'USA_FECHA',
            //align: 'center',
            width: 100,
            renderer : function(value, meta) {
                if(value == '1')
                {
                    return 'SI';
                }else if(value == '0'){
                    return 'NO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'Inicio',
            sortable : true,
            dataIndex: 'INICIO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Termino',
            sortable : true,
            dataIndex: 'TERMINO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Formato',
            sortable : true,
            dataIndex: 'FORMATO_VALOR',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Monto Total',
            sortable : true,
            dataIndex: 'MONTO',
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
                clickCrearIngHaberRRLL(grid);
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
                    clickEditarIngHaberRRLL(grid, rowIndex);
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
                    clickTerminarIngHaberRRLL(grid, rowIndex);
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
                    clickEliminarIngHaberRRLL(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea eliminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        }, {
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMainIngHaberRRLL(grid.filtros);
                
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
                    clickFiltrarIngHaberRRLL(grid);
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
                Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainIngHaberRRLL(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    title: 'Habers RRLL ('+NOM_EMPRESA+')',
});


var clickTerminarIngHaberRRLL = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Haber RRLL', '¿Esta seguro de terminar el haber?', function(btn) {
        if (btn === 'yes') {
                storeCambiarEstadoIngHaberRRLL.load({
                    params:{
                        p_cod: recRow.data.PK_COD,
                        p_estado: 'TERMINADO',
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Haber RRLL terminado correctamente.');
                                cargarMainIngHaberRRLL(null);
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

var clickEliminarIngHaberRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Haber RRLL', '¿Esta seguro de eliminar el haber?', function(btn) {
        if (btn === 'yes') {
            storeEliminarIngHaberRRLL.load({
                params : {
                    p_cod: recRow.data.PK_COD,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Haber RRLL eliminado correctamente.');
                            cargarMainIngHaberRRLL(null);
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

var clickCrearIngHaberRRLL = function (grid) {
    var rec = grid.getStore();
    var width = Ext.getBody().getViewSize().width*.80;

    ventanaDinamica("CrearIngHaberRRLL", "Ingresar Haber RRLL ("+NOM_EMPRESA+")", width, '', "CrearIngHaberRRLL", 1, 0, rec);
};

var clickEditarIngHaberRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    console.log(recRow);
    ventanaDinamica("EditarIngHaberRRLL", "Editar Haber RRLL ("+NOM_EMPRESA+")", "600", "", "EditarIngHaberRRLL", 1, 0, rec, recRow);
};



var clickFiltrarIngHaberRRLL = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainIngHaberRRLLFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainIngHaberRRLLFiltro", 1, 0, grid, filtros);
    
};

var cargarMainIngHaberRRLL = function(filtros){

    if(filtros !== null)
    {
        storeCargarIngHaberRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla')[0].filtros = null;
        storeCargarIngHaberRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
