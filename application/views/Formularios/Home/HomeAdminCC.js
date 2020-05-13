
Ext.define('fcab.Container.HomeAdministrador.CC', {
    extend: 'Ext.grid.Panel',
    xtype: 'HomeAdministradorCC',
    itemId: 'HomeAdministradorCC',
    store: storeCargarCCProcesoMensualPorUsuarioEstado,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    height: 500,
    width : '100%',
    listeners: {
        afterrender: function() {
            var param = Ext.getCmp('HomeAdministradorCC').myExtraParams.param2;
            storeCargarCCProcesoMensualPorUsuarioEstado.load({
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
                  title: "Detalle CC",
                  fileName: 'Detalle CC '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [
        {
            text     : 'Código',
            sortable : true,
            dataIndex: 'PK_COD_CC',
            flex:1,
        },

        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CC',
            flex:3
        },

        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            flex:1
        },
        
    ],
});

