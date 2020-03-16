Ext.define('fcab.Container.MainProcesoMensual.Detalle', {
    extend: 'Ext.tab.Panel',
    xtype: 'MainProcesoMensualDetalle',
    itemId: 'MainProcesoMensualDetalle',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            cargarDetalleProcesoMensual();
        }
    },
    //buttonAlign: 'center',
    defaults: {
        
        scrollable: true
    },
    layout: {
        align: "stretch",
        pack: 'center'
    },
    items: [{
        title: 'General',
        height: 565,
        items:[{
            xtype: 'MainProcesoMensualDetalleGeneral',
        }]
    }, {
        title: 'Centros de Costos',
        height: 565,
        items:[{
            xtype: 'MainProcesoMensualDetalleCC'
        }]
    },{
        title: 'Trabajadores',
        height: 565,
        layout:'fit',
        items:[{
            xtype: 'MainProcesoMensualDetallePersonas'
        }]
    },{
        title: 'Exportar / Importar',
        itemId:'tabExport',
        height: 565,
        hidden: true,
        layout: 'fit',
        items:[{
            xtype: 'MainProcesoMensualDetalleImportarExportar'
        }]
    }],
    
});


var cargarDetalleProcesoMensual = function() {

    var param = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2.data;
    
    storeCargarPersonasProcesoMensual.loadData([],false);

    storeCargarDetalleProcesoMensual.load({
        params : {
            p_cod_emp: EMPRESA,
            p_anho: param.ANHO,
            p_mes: param.MES,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            console.log(records);
            if(records !== null && records.length > 0) {
                if(records[0].data.PK_TIPO == 'RRHH') {
                    Ext.ComponentQuery.query('#MainProcesoMensualDetalle #tabExport')[0].tab.show();
                }else{
                    Ext.ComponentQuery.query('#MainProcesoMensualDetalle #tabExport')[0].tab.hide();
                }
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtCCEspera')[0].setValue(records[0].data.CC_ESPERA);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtCCTerminado')[0].setValue(records[0].data.CC_TERMINADO);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtTrabEspera')[0].setValue(records[0].data.PERSONA_ESPERA);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtTrabTerminado')[0].setValue(records[0].data.PERSONA_TERMINADO);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #cbTipo')[0].setValue(records[0].data.PK_TIPO);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #cbAnho')[0].setValue(records[0].data.ANHO);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #cbMes')[0].setValue(records[0].data.MES);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #dtFec1')[0].setValue(records[0].data.INICIO_DATE);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #dtFec2')[0].setValue(records[0].data.TERMINO_DATE);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #dtHH1')[0].setValue(records[0].data.INICIO_HH);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #dtHH2')[0].setValue(records[0].data.TERMINO_HH);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtObservacion')[0].setValue(records[0].data.OBSERVACION);
                Ext.ComponentQuery.query('#MainProcesoMensualDetalleGeneral #txtEstado')[0].setValue(records[0].data.ESTADO);
            }
        }
    });

    storeCargarCCProcesoMensual.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: '',
            p_nom_cc: ''
        },
        callback: function(records, operation, success) {
            console.log(records);
        }
    });


    storeCargarCCProcesoMensual2.load({
        params : {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: '',
            p_nom_cc: ''
        },
        callback: function(records, operation, success) {
            console.log(records);
        }
    });
}