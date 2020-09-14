Ext.define("fcab.Container.MasterConcepto", {
    extend: 'Ext.container.Container',
    xtype: 'MasterConcepto',
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

            if(pantalla == 'MAESTRO_CONCEPTO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterConceptoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterConceptoGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'ASOCIAR_CC':
                        Ext.ComponentQuery.query('#MasterConceptoGrilla #btnAsoCC')[0].setHidden(false);
                        break;
                            
                }
            }else if(pantalla == 'MAESTRO_CONCEPTO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterConceptoGrilla')[0].suspendEvents();
            }
        });

        cargarMasterConcepto(null)
    },
    items: [{
    	xtype: 'MasterConceptoGrilla'
    }]

});


Ext.define('fcab.Container.MasterConcepto.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterConceptoGrilla',
    itemId: 'MasterConceptoGrilla',
    store: storeCargarConceptos,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarConcepto(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            width:100,
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
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'PFK_COD_EMP',
            //align: 'center',
            hidden: true,
            width:100,
        },
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            width:100,
        },
        {
            text     : 'ID Concepto',
            sortable : true,
            dataIndex: 'PK_COD_CONCEPTO',
            //align: 'center',
            width:150,
        },
        {
            text     : 'Concepto',
            sortable : true,
            dataIndex: 'NOMBRE',
            width:200,
        },
        {
            text     : 'Grupo',
            sortable : true,
            dataIndex: 'FK_GRUPO_CONCEPTO',
            width:150,
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'FK_TIPO',
            width:150,
        },
        {
            text     : 'Periodo',
            sortable : true,
            dataIndex: 'FK_TIPO_MES',
            width:150,
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            hidden: true,
            width:200,
        },
        {
            text     : 'Mes Inicial',
            sortable : true,
            dataIndex: 'MESES',
            //align: 'center',
            hidden: true,
            width: 100,
        },
        {
            text     : 'Copiar Anterior',
            sortable : true,
            dataIndex: 'COPIAR_ANTERIOR',
            //align: 'center',
            hidden: true,
            width: 100,
        },
        {
            text     : 'No Cero',
            sortable : true,
            dataIndex: 'NO_CERO',
            //align: 'center',
            hidden: true,
            width: 100,
        },
        {
            text     : 'Rango Inicio',
            sortable : true,
            dataIndex: 'RANGO_INI',
            //align: 'center',
            hidden: true,
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,000')
        },
        {
            text     : 'Rango Final',
            sortable : true,
            dataIndex: 'RANGO_FIN',
            //align: 'center',
            hidden: true,
            width:100,
            renderer: Ext.util.Format.numberRenderer('0.0,000')
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            width:150,
            //hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            width:150,
        },
        {
            text     : 'Modificación',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            width:150,
            //hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            width:150,
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
                clickCrearConcepto(grid);
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
                    clickEditarConcepto(grid, rowIndex);
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
                    clickAsociarCCConcepto(grid, rowIndex);
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
                cargarMasterConcepto(grid.filtros);
                
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
                  title: "Conceptoes " + NOM_EMPRESA,
                  fileName: 'Conceptoes '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarConcepto(grid);
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
                Ext.ComponentQuery.query('#MasterConceptoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterConcepto(null);
            }
        }]
    }],
    title: 'Maestro Concepto ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true,
    },

});

Ext.define('fcab.form.Paggin.MasterConcepto', {
    extend: 'Ext.PagingToolbar',
    xtype: 'PagginMasterConcepto',
    store: storeCargarConceptos,
    displayInfo: true,
    displayMsg: '{0} - {1} de {2}',
    emptyMsg: 'Nada que mostrar'
});
var clickCrearConcepto = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterConceptoCrear", "Crear Concepto ("+NOM_EMPRESA+")", "600", "", "MasterConceptoCrear", 1, 0, rec);
};

var clickEditarConcepto= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterConceptoEditar", "Editar Concepto ("+NOM_EMPRESA+")", "600", "", "MasterConceptoEditar", 1, 0, rec, recRow);
};

var clickAsociarCCConcepto= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterConceptoCC", "Asociar Centros de Costos ("+NOM_EMPRESA+ " - " + recRow.data.PK_COD_CONCEPTO +" - " + recRow.data.NOMBRE +")", "1000", "", "MasterConceptoCC", 1, 0, rec, recRow);
};

var clickFiltrarConcepto = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterConceptoFiltro", "Filtrar Master Concepto ("+NOM_EMPRESA+")", "500", "", "MasterConceptoFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterConcepto = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterConceptoGrilla')[0].filtros;
        if(filtros !== null){
            storeCargarConceptos.load({
                params:{
                    p_cod_concepto : filtros.p_cod_concepto,
                    p_cod_emp : EMPRESA,
                    p_nombre : filtros.p_nombre,
                    p_grupo: filtros.p_grupo,
                    p_tipo: filtros.p_tipo,
                    p_tipo_mes: filtros.p_tipo_mes,
                    p_estado: filtros.p_estado
                }
            });
        }else{
            storeCargarConceptos.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterConceptoGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterConceptoGrilla')[0].filtros = null;
        storeCargarConceptos.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
