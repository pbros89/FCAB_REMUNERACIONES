/**
  * Contenedor
  **/
 Ext.define('fcab.Container.ISSA.Seguimiento', {
    extend: 'Ext.tab.Panel',
    xtype: 'SeguimientoISSA',
    itemId: 'SeguimientoISSA',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            initSeguimientoIssa();
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
        title: 'Novedades',
        items:[{
            xtype: 'SeguimientoISSAGrillaNovedades',
        }]
    }, {
        title: 'Proceso Mensual',
        items:[{
            xtype: 'SeguimientoISSAGrillaPM'
        }]
    }, {
        title: 'Solicitud Asistencia',
        items:[{
            xtype: 'SeguimientoISSAGrillaSolAsis'
        }]
    }, {
        title: 'Diferencia Ficha',
        items:[{
            xtype: 'ISSADiferenciaFichasGrilla'
        }]
    },{
        title: 'Ausentismo',
        items:[{
            xtype: 'AusentismoISSA'
        }]
    }],

    
    
});


var initSeguimientoIssa = function() {
    storeCargarConteoEnviosIssa.load();
    storeCargarConteoPMEnviosIssa.load();
    storeCargarSeguimientAsisIssa.load();
    storeCargarCountDifDotacion.load();
    storeCargarUltimoLogDotacionIssa.load({
        callback: function(records, operation, success) {
            var lblFecha = Ext.ComponentQuery.query('#ISSADiferenciaFichasGrilla #lblFecha')[0];

            console.log(lblFecha);
            console.log(records);
            if(records != null){
                lblFecha.setText('Ultimo Guardado: ' +records[0].data.FECHA);
            }
        }
    });
}







