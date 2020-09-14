
 /**
  * Contenedor
  **/
Ext.define("fcab.Container.MasterHaberRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'MasterHaberRRLL',
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

            if(pantalla == 'MAESTRO_HABER_RRLL' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_HABER_RRLL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterHaberRRLLGrilla')[0].suspendEvents();
            }
        });

        cargarMasterHaberRRLL(null);
    },
    items: [{
    	xtype: 'MasterHaberRRLLGrilla'
    }]

});


Ext.define('fcab.Container.MasterHaberRRLL.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterHaberRRLLGrilla',
    itemId: 'MasterHaberRRLLGrilla',
    store: storeCargarHaberesRRLL,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarHaberRRLL(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex: 1,
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
            dataIndex: 'PK_COD_EMP',
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
            text     : 'ID Haber',
            sortable : true,
            dataIndex: 'PK_COD',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Tipo',
            sortable : true,
            dataIndex: 'FK_TIPO',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_DESCUENTO',
            flex:2
        },
        {
            text     : 'Usa Fecha',
            sortable : true,
            dataIndex: 'USA_FECHA',
            flex:1,
            renderer : function(value, meta) {
                if(value == '1')
                {
                    return 'SI'
                }else if(value == '0'){
                    return 'NO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBSERVACION',
            //align: 'center',
            flex: 2
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
            //hidden: true
        },
        {
            text     : 'Modificador',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            flex: 2,
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
                clickCrearHaberRRLL(grid);
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
                    clickEditarHaberRRLL(grid, rowIndex);
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
                cargarMasterHaberRRLL(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Decuentos RRLL " + NOM_EMPRESA,
                  fileName: 'Habers RRLL '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarHaberRRLL(grid);
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
                Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMasterHaberRRLL(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 130, 
    width : '100%',
    title: 'Maestro Haberes RRLL ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true
    },
});


var clickCrearHaberRRLL = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterHaberRRLLCrear", "Crear Haber RRLL ("+NOM_EMPRESA+")", "500", "", "MasterHaberRRLLCrear", 1, 0, rec);
};

var clickEditarHaberRRLL= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterHaberRRLLEditar", "Editar Haber RRLL ("+NOM_EMPRESA+")", "500", "", "MasterHaberRRLLEditar", 1, 0, rec, recRow);
};

var clickFiltrarHaberRRLL = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MasterHaberRRLLFiltro", "Filtrar Master Haber RRLL ("+NOM_EMPRESA+")", "500", "", "MasterHaberRRLLFiltro", 1, 0, grid, filtros);
    
};

var cargarMasterHaberRRLL = function(filtros){

    if(filtros !== null)
    {
        filtros = Ext.ComponentQuery.query('#MasterHaberRRLLGrilla')[0].filtros;
        if(filtros !== null)
        {
            storeCargarHaberesRRLL.load({
                params:{
                    p_cod_emp : EMPRESA,
                    p_cod : filtros.p_cod,
                    p_nombre: filtros.p_nombre,
                    p_estado: filtros.p_estado
                }
            });
        }else{
            storeCargarHaberesRRLL.load({
                params:{
                    p_cod_emp : EMPRESA,
                }
            });
        }
        
    }else{
        Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MasterHaberRRLLGrilla')[0].filtros = null;
        storeCargarHaberesRRLL.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};
