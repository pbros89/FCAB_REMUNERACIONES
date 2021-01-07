Ext.define('fcab.Container.MainPresupuesto.Detalle', {
    extend: 'Ext.tab.Panel',
    xtype: 'MainPresupuestoDetalle',
    itemId: 'MainPresupuestoDetalle',
    activeTab: 0,
    width :'100%',
    height: 600,
    
    listeners: {
        beforerender: function(){
            cargarDetallePresupuesto();
        }
    },
    items: [{
        title: 'General',
        scrollable: true,
        autoScroll: true,
        items:[{
            xtype: 'MainPresupuestoDetalleGeneral',
        }]
    }, {
        title: 'Centros de Costos',
        scrollable: true,
        autoScroll: true,
        items:[{
            xtype: 'MainPresupuestoDetalleCC'
        }]
    },{
        title: 'Dotación',
        scrollable: true,
        autoScroll: true,
        items:[{
            xtype: 'MainPresupuestoDetalleDotacion'
        }]
    },],
    
});


var cargarDetallePresupuesto = function() {

    var param = Ext.getCmp('MainPresupuestoDetalle').myExtraParams.param2.data;
    
    //storeCargarPersonasPresu.loadData([],false);

    storeCargarDetallePresup.load({
        params : {
            p_cod_emp: EMPRESA,
            p_anho: param.PK_ANHO,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            console.log(records);
            if(records !== null && records.length > 0) {
                /*if(records[0].data.PK_TIPO == 'RRHH') {
                    Ext.ComponentQuery.query('#MainPresupuestoDetalle #tabExport')[0].tab.show();
                }else{
                    Ext.ComponentQuery.query('#MainPresupuestoDetalle #tabExport')[0].tab.hide();
                }*/
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #txtCCEspera')[0].setValue(records[0].data.CC_ESPERA);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #txtCCTerminado')[0].setValue(records[0].data.CC_TERMINADO);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #cbTipo')[0].setValue(records[0].data.PK_TIPO);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #cbAnho')[0].setValue(records[0].data.PK_ANHO);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #dtFec1')[0].setValue(records[0].data.INICIO_DATE);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #dtFec2')[0].setValue(records[0].data.TERMINO_DATE);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #dtHH1')[0].setValue(records[0].data.INICIO_HH);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #dtHH2')[0].setValue(records[0].data.TERMINO_HH);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #txtObservacion')[0].setValue(records[0].data.OBSERVACION);
                Ext.ComponentQuery.query('#MainPresupuestoDetalleGeneral #txtEstado')[0].setValue(records[0].data.ESTADO);
            }
        }
    });

    storeCargarCCPresup.load({
        params : {
            p_cod_emp: EMPRESA,
            p_anho: param.PK_ANHO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: '',
            p_nom_cc: ''
        },
        callback: function(records, operation, success) {
            console.log(records);
        }
    });


    storeCargarCCPresup2.load({
        params : {
            p_cod_emp: EMPRESA,
            p_anho: param.PK_ANHO,
            p_tipo: param.PK_TIPO,
            p_cod_cc: '',
            p_nom_cc: ''
        },
        callback: function(records, operation, success) {
            console.log(records);
        }
    });
}