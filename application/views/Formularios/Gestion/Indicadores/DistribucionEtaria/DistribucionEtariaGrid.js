Ext.define('fcab.Container.IndDistribucionEtaria.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'IndDistribucionEtariaGrid',
    itemId: 'IndDistribucionEtariaGrid',
    store: storeCargarConteoDotacionEtariaMensual,
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
            text     : '< 30',
            sortable : true,
            dataIndex: '< 30',
            //align: 'center',
            width: 100
        },
        {
            text     : '>= 30 & <= 45',
            sortable : true,
            dataIndex: '>= 30 & <= 45',
            width: 100
            //hidden: true
        },
        {
            text     : '> 45 & <= 62',
            sortable : true,
            dataIndex: '> 45 & <= 62',
            width: 100
            //hidden: true
        },
        {
            text     : '> 62',
            sortable : true,
            dataIndex: '> 62',
            width: 100
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
                  title: "Dotación Etaria ",
                  fileName: 'Etaria_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
});