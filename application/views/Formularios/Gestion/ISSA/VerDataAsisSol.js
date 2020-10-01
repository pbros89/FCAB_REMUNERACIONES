Ext.define('fcab.Container.ISSA.SolAsistencia.DataGrilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'SeguimientoISSAGrillaSolAsisData',
    itemId: 'SeguimientoISSAGrillaSolAsisData',
    store: storeCargarAsisIssa,
    width : '100%',
    height: Ext.getBody().getViewSize().height > 800 ? 800 : Ext.getBody().getViewSize().height,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    plugins: pluginFactory(),
    listeners: {
        beforerender: function(){
            var periodoParam = Ext.getCmp('SeguimientoISSAGrillaSolAsisData').myExtraParams.param2;
            storeCargarAsisIssa.load({
                params: {
                    p_periodo: periodoParam
                }
            });
        }
    },
    columns: [
        {
            text     : 'Rut',
            sortable : true,
            dataIndex: 'PK_RUT',
            width: 120,
        },
        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOMBRE',
            width: 120,
        },
        {
            text     : 'Periodo',
            sortable : true,
            dataIndex: 'PK_PERIODO',
            width: 120,
        },
        {
            text     : 'Desde',
            sortable : true,
            dataIndex: 'DESDE',
            width: 120,
        }, 
        {
            text     : 'Hasta',
            sortable : true,
            dataIndex: 'HASTA',
            width: 120,
        }, 
        {
            text     : 'Horas Extras',
            sortable : true,
            dataIndex: 'HORAS_EXTRAS',
            width: 120,
        }, 
        {
            text     : 'Horas Emergencia',
            sortable : true,
            dataIndex: 'HORAS_EMERGENCIA',
            width: 120,
        }, 
        {
            text     : 'Horas Comp Turno',
            sortable : true,
            dataIndex: 'HORAS_COMP_TURNO',
            width: 120,
        }, 
        {
            text     : 'Desc Comp Feriado',
            sortable : true,
            dataIndex: 'DESC_COMP_FERIADO',
            width: 120,
        }, 
        {
            text     : 'Desc Comp Legal',
            sortable : true,
            dataIndex: 'DESC_COMP_LEGAL',
            width: 120,
        }, 
        {
            text     : 'Colacion',
            sortable : true,
            dataIndex: 'COLACION',
            width: 120,
        },  
        {
            text     : 'Viatico',
            sortable : true,
            dataIndex: 'VIATICO',
            width: 120,
        }, 
        {
            text     : 'Falta',
            sortable : true,
            dataIndex: 'FALTA',
            width: 120,
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
                  title: "Data Asistencia ISSA ",
                  fileName: 'Data_Asistencia_ISSA_' + new Date().getTime() +'.xls'
                });
            }

        },]
    }],
    
});