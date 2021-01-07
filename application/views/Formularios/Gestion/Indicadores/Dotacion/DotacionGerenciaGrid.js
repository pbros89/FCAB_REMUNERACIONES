Ext.define('fcab.Container.IndDotacionGerencia.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'IndDotacionGerenciaGrid',
    itemId: 'IndDotacionGerenciaGrid',
    store: storeCargarConteoDotacionGerencia,
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
            text     : 'GERENCIA',
            sortable : true,
            dataIndex: 'GERENCIA',
            //align: 'center',
            width: 100
        },
        {
            text     : 'VALOR',
            sortable : true,
            dataIndex: 'VALOR',
            //align: 'center',
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
                  title: "Dotación ",
                  fileName: 'DOTACION_GERENCIA' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
});