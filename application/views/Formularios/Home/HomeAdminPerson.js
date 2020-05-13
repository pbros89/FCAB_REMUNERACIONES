
Ext.define('fcab.Container.HomeAdministrador.Person', {
    extend: 'Ext.grid.Panel',
    xtype: 'HomeAdministradorPerson',
    itemId: 'HomeAdministradorPerson',
    store: storeCargarPersonasProcesoMensualPorUsuarioEstado,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: 500,
    width : '100%',
    listeners: {
        afterrender: function() {
            var param = Ext.getCmp('HomeAdministradorPerson').myExtraParams.param2;
            storeCargarPersonasProcesoMensualPorUsuarioEstado.load({
                params: {
                    p_usuario: NOMBRE, 
                    p_rol: ROL, 
                    p_cod_emp: EMPRESA, 
                    p_estado: param
                }
            });
        }
    },
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Detalle Trabadores",
                  fileName: 'Detalle Trabadores '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [
        {
            text     : 'Rut',
            sortable : true,
            dataIndex: 'PK_RUT',
            flex:1,
        },

        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            flex:1,
        },
        {
            text     : 'Cod CC',
            sortable : true,
            dataIndex: 'PFK_COD_CC',
            flex:1,
        },

        {
            text     : 'Nom CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            flex:1,
        },

        {
            text     : 'Nom Cargo',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            flex:1
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex:1
        },
        
    ],
});

