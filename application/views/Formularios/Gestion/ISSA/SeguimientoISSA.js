/**
  * Contenedor
  **/
 Ext.define('fcab.Container.ISSA.Seguimiento', {
    extend: 'Ext.tab.Panel',
    xtype: 'SeguimientoISSA',
    itemId: 'SeguimientoISSA',
    activeTab: 0,
    width : '100%',
    maxHeight: 3000,
    listeners: {
        beforerender: function(){
            initSeguimientoIssa();
        }
    },
    items: [{
        title: 'Novedades',
        xtype: 'SeguimientoISSAGrillaNovedades',
        
    }, {
        title: 'Proceso Mensual',
        xtype: 'SeguimientoISSAGrillaPM'
        
    }, {
        title: 'Solicitud Asistencia',
        xtype: 'SeguimientoISSAGrillaSolAsis'
        
    }, {
        title: 'Diferencia Ficha',
        xtype: 'ISSADiferenciaFichasGrilla'
        
    },{
        title: 'Ausentismo',
        xtype: 'AusentismoISSA'
        
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







