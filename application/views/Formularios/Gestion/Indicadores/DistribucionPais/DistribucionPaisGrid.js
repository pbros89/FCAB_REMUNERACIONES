Ext.define('fcab.Container.IndDistribucionPais.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'IndDistribucionPaisGrid',
    itemId: 'IndDistribucionPaisGrid',
    store: storeCargarConteoDotacionRolPaisMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    margin: 10,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'AÑO',
            sortable : true,
            dataIndex: 'ANHO',
            hidden: false,
            width: 100
        },
        {
            text     : 'MES',
            sortable : true,
            dataIndex: 'MES_TEXT',
            hidden: false,
            width: 100
        },
        {
            text     : 'NACIONAL',
            sortable : true,
            dataIndex: 'NACIONAL',
            //align: 'center',
            width: 100
        },
        {
            text     : 'EXTRANJERO',
            sortable : true,
            dataIndex: 'EXTRANJERO',
            width: 100
            //hidden: true
        },
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Dotación Pais ",
                  fileName: 'Pais_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
});