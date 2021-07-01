Ext.define("fcab.Container.MasterContrato", {
    extend: 'Ext.container.Container',
    xtype: 'MasterContrato',
    layout : 'fit',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);

        /*ROL_ACCIONES.forEach(accion => {
            var estado = accion.ESTADO;
            var acc = accion.PFK_ACCION;
            var pantalla = accion.PFK_PANTALLA;

            if(pantalla == 'MAESTRO_Contrato' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterContratoGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterContratoGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_Contrato' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterContratoGrilla')[0].suspendEvents();
            }
        });*/

        cargarMasterContrato();
    },
    items: [{
    	xtype: 'MasterContratoGrilla'
    }]

});


Ext.define('fcab.Container.MasterContrato.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterContratoGrilla',
    itemId: 'MasterContratoGrilla',
    store: storeCargarContratos,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    title: 'Maestro Contrato',
    viewConfig: {
        stripeRows: true,
    },
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarContrato(view.grid, index);
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
            text     : 'Código',
            sortable : true,
            dataIndex: 'PK_ID',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex:2
        },
        {
            text     : 'Cliente',
            sortable : true,
            dataIndex: 'CLIENTE',
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
            dataIndex: 'FECHA_MODIFICACION',
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
            //hidden: true,
            tooltip: 'Ingresar nuevo item',
            iconCls: 'icon-form-add',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                clickCrearContrato(grid);
            }
        }, {
            text: 'Editar',
            itemId: 'btnEditar',
            //hidden: true,
            tooltip: 'Editar Item seleccionado',
            iconCls: 'icon-form-edit',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEditarContrato(grid, rowIndex);
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
                cargarMasterContrato();
                
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
                  title: "Contratos " + NOM_EMPRESA,
                  fileName: 'Contratos '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        },]
    }],
    
});

var clickCrearContrato = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterContratoCrear", "Crear Contrato ("+NOM_EMPRESA+")", "500", "", "MasterContratoCrear", 1, 0, rec);
};

var clickEditarContrato= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    ventanaDinamica("MasterContratoEditar", "Editar Contrato ("+NOM_EMPRESA+")", "500", "", "MasterContratoEditar", 1, 0, rec, recRow);
};


var cargarMasterContrato = function(){
    storeCargarContratos.load({
        params:{
            p_cod_emp : EMPRESA,
        }
    });
};
