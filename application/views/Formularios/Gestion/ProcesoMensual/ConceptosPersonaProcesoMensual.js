Ext.define('fcab.Container.ConceptosPersonaProcesoMensual', {
    extend: 'Ext.tab.Panel',
    xtype: 'ConceptosPersonaProcesoMensual',
    itemId: 'ConceptosPersonaProcesoMensual',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            cargarConceptosPersonaProcesoMensual();
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
        title: 'Haberes',
        itemId: 'tabHaber',
        height: 500,
        items:[{
            xtype: 'ConceptosPersonaProcesoMensualHaber',
        }]
    }, {
        title: 'BDI',
        itemId: 'tabBDI',
        height: 500,
        items:[{
            xtype: 'ConceptosPersonaProcesoMensualBDI'
        }]
    },{
        title: 'Descuentos',
        itemId: 'tabDescuento',
        height: 500,
        items:[{
            xtype: 'ConceptosPersonaProcesoMensualDescuento'
        }]
    }],
    buttons: [{
        text: 'Terminar',
        align: 'right',
        scale: 'medium',
        //disabled: inicio,
        handler: function () {
            Ext.MessageBox.confirm('Terminar Trabajador', '¿Esta seguro de terminar el trabajador?', function(btn) {
                if (btn === 'yes') {
                    var param = Ext.getCmp('ConceptosPersonaProcesoMensual').myExtraParams.param2.data;
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        storeModificarEstadoProcMensualPerson.load({
                            params:{
                                p_proceso: param.PFK_PROCESO,
                                p_cod_emp: EMPRESA,
                                p_tipo: param.PFK_TIPO,
                                p_cod_cc: param.PFK_COD_CC,
                                p_rut: param.PK_RUT,
                                p_estado: 'TERMINADO',
                                p_usuario: NOMBRE
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Trabajador terminado correctamente.');
                                        if(Ext.getCmp('MainProcesoMensualDetalle') != null){
                                            cargarDetalleProcesoMensual();
                                            cargarCCPersonasProcesoMensualDetalle();
                                            
                                        }
                                        if(Ext.getCmp('PersonasProcesoMensual') != null){
                                            cargarCCPersonasProcesoMensual();
                                        }
                                        ewin.destroy();
                                    }else{
                                        Ext.MessageBox.show({
                                            title: 'ADVERTENCIA',
                                            msg: records[0].data.r_msg,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }
                                
                            }
                        });
                    }
                }
            });
            
        }
        
    }],
    
});

var cargarConceptosPersonaProcesoMensual = function(){
    var param = Ext.getCmp('ConceptosPersonaProcesoMensual').myExtraParams.param2.data;
    console.log(param);
    storeCargarConceptosPersonaProcesoMensualBDI.load({
        params: {
            p_cod_emp: EMPRESA,
            p_proceso: param.PFK_PROCESO,
            p_tipo: param.PFK_TIPO,
            p_cod_cc: param.PFK_COD_CC,
            p_rut: param.PK_RUT,
            p_grupo: 'BDI'
        },
        callback: function(records, operation, success) {
            if(records !== null && records.length > 0) {
                Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabBDI')[0].tab.show();
            }else{
                Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabBDI')[0].tab.hide();
            }
        }
    });

    storeCargarConceptosPersonaProcesoMensualHaber.load({
        params: {
            p_cod_emp: EMPRESA,
            p_proceso: param.PFK_PROCESO,
            p_tipo: param.PFK_TIPO,
            p_cod_cc: param.PFK_COD_CC,
            p_rut: param.PK_RUT,
            p_grupo: 'HABER'
        },
        callback: function(records, operation, success) {
            if(records !== null && records.length > 0) {
                Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabHaber')[0].tab.show();
            }else{
                Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabHaber')[0].tab.hide();
            }
        }
    });

    
    storeCargarConceptosPersonaProcesoMensualDescuento.load({
        params: {
            p_cod_emp: EMPRESA,
            p_proceso: param.PFK_PROCESO,
            p_tipo: param.PFK_TIPO,
            p_cod_cc: param.PFK_COD_CC,
            p_rut: param.PK_RUT,
            p_grupo: 'DESCUENTO'
        },
        callback: function(records, operation, success) {
            if(records !== null && records.length > 0) {
                if(param.PFK_TIPO == 'RRHH') {
                    Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabDescuento')[0].tab.show();
                }else{
                    Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabDescuento')[0].tab.hide();
                }
            }else{
                Ext.ComponentQuery.query('#ConceptosPersonaProcesoMensual #tabDescuento')[0].tab.hide();
            }
        }
    });
    

}
