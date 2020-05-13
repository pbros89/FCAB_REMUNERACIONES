Ext.define('fcab.Container.DetalleCambioBonoBonoActual', {
    extend: 'Ext.container.Container',
    xtype: 'DetalleCambioBonoBonoActual',
    itemId: 'DetalleCambioBonoBonoActual',
    border: false,
    frame: false,
    scrollable: false,
    listeners: {
        beforerender: function() {
            var param = Ext.getCmp('DetalleCambioBono').myExtraParams.param2.data;
            storeCargarConceptosPersonal.load({
                params: {
                    p_personal: param.FK_PERSONAL
                }
            });
        }
    },
    items: [{ 
        xtype: 'DetalleCambioBonoBonoActualGrilla'
    }]
    
});

Ext.define('fcab.Container.DetalleCambioBonoBonoActual.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'DetalleCambioBonoBonoActualGrilla',
    itemId: 'DetalleCambioBonoBonoActualGrilla',
    store: storeCargarConceptosPersonal,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    
    columns: [
        
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PFK_COD_CONCEPTO',
            flex:1
        },

        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CONCEPTO',
            flex:2
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBS_TIPO_CONCEPTO',
            flex:2,
            //hidden: true
        },
        { 
            text: 'Valor', 
            sortable : true,
            dataIndex: 'VALOR' ,
            align: 'center',
            flex: 1,
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },
    ],
    minHeight: 500,
    width : '100%',
});
