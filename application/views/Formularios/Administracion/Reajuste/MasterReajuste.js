Ext.define("fcab.Container.MasterReajuste", {
    extend: 'Ext.container.Container',
    xtype: 'MasterReajuste',
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

            if(pantalla == 'MAESTRO_CARGO' && estado == 'A'){
                switch(acc){
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MasterReajusteGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MasterReajusteGrilla #btnEditar')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'MAESTRO_CARGO' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MasterReajusteGrilla')[0].suspendEvents();
            }
        });*/

        cargarMasterReajuste();
    },
    items: [{
    	xtype: 'MasterReajusteGrilla'
    }]

});


Ext.define('fcab.Container.MasterReajuste.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MasterReajusteGrilla',
    itemId: 'MasterReajusteGrilla',
    store: storeCargarReajustes,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarCargo(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID EMPRESA',
            sortable : true,
            dataIndex: 'FK_COD_EMP',
            //align: 'center',
            hidden: true,
            flex: 1
        },
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_ID',
            //align: 'center',
            flex: 1
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex:1
        },
        {
            text     : 'Factor',
            sortable : true,
            dataIndex: 'VALOR',
            flex:1,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },
        {
            text     : 'Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            flex:1,
            //hidden: true
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            flex:1,
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
                clickCrearReajuste(grid);
            }
        }, {
            text: 'Eliminar Último',
            itemId: 'btnEliminar',
            hidden: false,
            iconCls: 'icon-form-delete',
            handler: function () {
                clickEliminarReajuste();
            }

        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMasterReajuste();
                
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
                  title: "Cargos " + NOM_EMPRESA,
                  fileName: 'Cargos '+NOM_EMPRESA+' ' + date.getTime() +'.xls'
                });
            }

        }]
    }],
    title: 'Maestro Reajuste ('+NOM_EMPRESA+')',
    viewConfig: {
        stripeRows: true,
    },
});

var clickCrearReajuste = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("MasterReajusteCrear", "Crear Reajuste ("+NOM_EMPRESA+")", "900", "", "MasterReajusteCrear", 1, 0, rec);
};

var clickEliminarReajuste = function() {
    Ext.MessageBox.confirm(
        "Confirmar",
        "¿Esta seguro de eliminar el reajuste? <br><b>NOTA: Se elimina el reajuste y se restauran los valores a su estado anterior.</b>",
        function (btn) {
            if (btn === "yes") {
                Ext.MessageBox.show({
                    msg: 'Eliminando Reajuste',
                    progressText: 'Espere por favor...',
                    width: 300,
                    wait: {
                        interval: 200
                    }
                });
                storeEliminarReajuste.load({
                    params: {
                        p_cod_emp: EMPRESA,
                        p_usuario: NOMBRE
                    },
                    callback: function (records, operation, success) {
                        Ext.MessageBox.hide();
                        if (records != null) {
                            if (records[0].data.r_msg == 'OK') {
                                showToast('El reajuste se elimino correctamente');
                                cargarMasterReajuste();
                            } else {
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


var cargarMasterReajuste = function(){
    storeCargarReajustes.load({
        params:{
            p_cod_emp : EMPRESA,
        }
    });   
};
