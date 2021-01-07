Ext.define('fcab.Container.IndDistribucionSexo.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'IndDistribucionSexoGrid',
    itemId: 'IndDistribucionSexoGrid',
    store: storeCargarConteoDotacionRolSexoMensual,
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
            text     : 'M',
            sortable : true,
            dataIndex: 'M',
            //align: 'center',
            width: 100
        },
        {
            text     : 'F',
            sortable : true,
            dataIndex: 'F',
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
                  title: "Dotación Sexo ",
                  fileName: 'Sexo_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
});