Ext.define('fcab.Container.MainTarifarioMensual.DetalleGuia', {
    extend: 'Ext.container.Container',
    xtype: 'MainTarifarioMensualDetalleGuia',
    itemId: 'MainTarifarioMensualDetalleGuia',
    id: 'MainTarifarioMensualDetalleGuia',
    border: false,
    layout : 'fit',
    frame: false,
    items: [{ 
        xtype: 'MainTarifarioMensualDetalleGuiaGrilla'
    }]
    
});

Ext.define('fcab.Container.MainTarifarioMensual.DetalleGuiaGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainTarifarioMensualDetalleGuiaGrilla',
    itemId: 'MainTarifarioMensualDetalleGuiaGrilla',
    store: storeCargarTarifaMensualGuias,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    width : '100%',
    minHeight: 300,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'Nro Guia',
            sortable : true,
            dataIndex: 'PK_NRO_GUIA',
            width: 100
        },

        {
            text     : 'Nro Solicitud',
            sortable : true,
            dataIndex: 'PFK_SOLICITUD',
            width: 100
        },
        {
            text     : 'Descripción',
            sortable : true,
            dataIndex: 'DESCRIPCION',
            width: 200
        },
        {
            text     : 'Producto',
            sortable : true,
            dataIndex: 'PRODUCTO',
            width: 100
        },
        {
            text     : 'Origen',
            sortable : true,
            dataIndex: 'ORIGEN',
            width: 100
        },
        {
            text     : 'Destino',
            sortable : true,
            dataIndex: 'DESTINO',
            width: 100
        },
        {
            text     : 'Cantidad Trans.',
            sortable : true,
            dataIndex: 'CANTIDAD_TRANSPORTADA',
            width: 100
        },
        {
            text     : 'MP Vacio',
            sortable : true,
            dataIndex: 'MP_VACIO',
            width: 100
        },
        {
            text     : 'Rut Cliente',
            sortable : true,
            dataIndex: 'RUT_CLIENTE',
            width: 100
        },
        {
            text     : 'Razón Social',
            sortable : true,
            dataIndex: 'RAZON_SOCIAL',
            width: 150
        },
        {
            text     : 'Rut Conductor',
            sortable : true,
            dataIndex: 'ID_CONDUCTOR',
            width: 100
        },
        {
            text     : 'Nombre Conductor',
            sortable : true,
            dataIndex: 'NOMBRE_CONDUCTOR',
            width: 200
        },
        {
            text     : 'Rut Conductor 2',
            sortable : true,
            dataIndex: 'ID_CONDUCTOR_SEC',
            width: 100
        },
        {
            text     : 'Nombre Conductor 2',
            sortable : true,
            dataIndex: 'NOMBRE_CONDUCTOR_SEC',
            width: 200
        },
        {
            text     : 'Fecha Doc',
            sortable : true,
            dataIndex: 'FECHA_DOCTO',
            width: 100
        },
        {
            text     : 'Fecha Salida',
            sortable : true,
            dataIndex: 'FECHA_SALIDA',
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
                  title: "Guias",
                  fileName: 'GUIAS_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
    
});
