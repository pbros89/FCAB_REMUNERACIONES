Ext.define('fcab.Container.MainTarifarioMensual.DetalleDet', {
    extend: 'Ext.container.Container',
    xtype: 'MainTarifarioMensualDetalleDet',
    itemId: 'MainTarifarioMensualDetalleDet',
    id: 'MainTarifarioMensualDetalleDet',
    border: false,
    layout : 'fit',
    frame: false,
    items: [{ 
        xtype: 'MainTarifarioMensualDetalleDetGrilla'
    }]
    
});

Ext.define('fcab.Container.MainTarifarioMensual.DetalleDetGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainTarifarioMensualDetalleDetGrilla',
    itemId: 'MainTarifarioMensualDetalleDetGrilla',
    store: storeCargarTarifaMensualDet,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    width : '100%',
    minHeight: 300,
    plugins: pluginFactory(),
    columns: [
        {
            text     : 'Nro Solicitud',
            sortable : true,
            dataIndex: 'PK_SOLICITUD',
            width: 100
        },
        {
            text     : 'Rut',
            sortable : true,
            dataIndex: 'RUT',
            width: 100
        },
        {
            text     : 'Razón Social',
            sortable : true,
            dataIndex: 'RAZON_SOCIAL',
            width: 150
        },
        {
            text     : 'Id Ruta',
            sortable : true,
            dataIndex: 'ID_RUTA',
            width: 100
        },
        {
            text     : 'Servicio',
            sortable : true,
            dataIndex: 'SERVICIO',
            width: 100
        },
        {
            text     : 'Bono Conductor',
            sortable : true,
            dataIndex: 'BONO_CONDUCTOR',
            width: 100
        },
        {
            text     : 'Bono Conductor 2',
            sortable : true,
            dataIndex: 'BONO_CONDUCTOR_SEC',
            width: 100
        },
        {
            text     : 'Viatico',
            sortable : true,
            dataIndex: 'VIATICO',
            width: 100
        },
        {
            text     : 'Valor',
            sortable : true,
            dataIndex: 'VALOR',
            width: 100
        },
        {
            text     : 'Ton 27.5',
            sortable : true,
            dataIndex: 'TON_27_5',
            width: 100
        },
        {
            text     : 'Peaje',
            sortable : true,
            dataIndex: 'PEAJE',
            width: 100
        },
        {
            text     : 'Tiempo Espera',
            sortable : true,
            dataIndex: 'TIEMPO_ESPERA',
            width: 100
        },
        {
            text     : 'Factor TE',
            sortable : true,
            dataIndex: 'FACTOR_TE',
            width: 100
        },
        {
            text     : 'Bono SQM',
            sortable : true,
            dataIndex: 'BONO_SQM',
            width: 100
        },
        {
            text     : 'MP Vacio',
            sortable : true,
            dataIndex: 'MP_VACIO',
            width: 100
        }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Tarifas",
                  fileName: 'Tarifas_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
    
});


