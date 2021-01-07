Ext.define('fcab.Container.IndDistribucionAntiguedad.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'IndDistribucionAntiguedadGrid',
    itemId: 'IndDistribucionAntiguedadGrid',
    store: storeCargarConteoDotacionAntiguedadMensual,
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
        //"< 1", ">= 1 & <= 5", "> 5 & <= 10", "> 10 & <= 20", "> 20"
        {
            text     : '< 1',
            sortable : true,
            dataIndex: '< 1',
            //align: 'center',
            width: 100
        },
        {
            text     : '>= 1 & <= 5',
            sortable : true,
            dataIndex: '>= 1 & <= 5',
            width: 100
            //hidden: true
        },
        {
            text     : '> 5 & <= 10',
            sortable : true,
            dataIndex: '> 5 & <= 10',
            width: 100
            //hidden: true
        },
        {
            text     : '> 10 & <= 20',
            sortable : true,
            dataIndex: '> 10 & <= 20',
            width: 100
        },

        {
            text     : '> 20',
            sortable : true,
            dataIndex: '> 20',
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
                  title: "Dotación Antiguedad ",
                  fileName: 'Antiguedad_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
});