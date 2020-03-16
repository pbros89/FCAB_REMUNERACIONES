Ext.define('fcab.Container.MainFiniquito.Detalle', {
    extend: 'Ext.tab.Panel',
    xtype: 'MainFiniquitoDetalle',
    itemId: 'MainFiniquitoDetalle',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
            cargarDetalleFiniquito();
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
            xtype: 'MainFiniquitoDetalleGeneral',
        }]
    }, {
        title: 'Haberes',
        height: 565,
        items:[{
            xtype: 'MainFiniquitoDetalleHaber'
        }]
    },{
        title: 'Descuentos',
        height: 565,
        layout:'fit',
        items:[{
            xtype: 'MainFiniquitoDetalleDescuento'
        }]
    }],
    
});


var cargarDetalleFiniquito = function() {

    var param = Ext.getCmp('MainFiniquitoDetalle').myExtraParams.param2.data;
    
    storeCargarParam_CAUSAL_DESPIDO.load();

    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtRut')[0].setValue(param.RUT);
    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #cbCausal')[0].setValue(param.COD_CAUSAL);
    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #dtBaja')[0].setValue(param.FECHA_BAJA);
    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtObs')[0].setValue(param.OBSERVACION);
    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtEstado')[0].setValue(param.ESTADO);
    Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtID')[0].setValue(param.PK_FINIQUITO);


    storeCargarPersonalFiniquito.load({
        params : {
              p_personal : param.FK_PERSONAL
            , p_cod_emp: EMPRESA
            
        },
        callback: function(records, operation, success) {
            if(records != null && records.length > 0) {
                var txtCC = Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtCC')[0];
                var txtCargo = Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtCargo')[0];
                var txtNombre = Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtNombre')[0];
                var txtIngreso = Ext.ComponentQuery.query('#MainFiniquitoDetalleGeneral #txtIngreso')[0];

                txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                txtCargo.setValue(records[0].data.COD_CARGO+'-'+records[0].data.NOM_CARGO);
                txtNombre.setValue(records[0].data.NOMBRE);
                txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
            }else{
                Ext.MessageBox.show({
                    title: 'ADVERTENCIA',
                    msg: "No se encontro personal con el RUT ingresado",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK
                });
            }
            
        }
    });


    storeCargarConceptosFiniquitoHaber.load({
        params: {
            p_finiquito: param.PK_FINIQUITO
        }
    });

    storeCargarConceptosFiniquitoDesc.load({
        params: {
            p_finiquito: param.PK_FINIQUITO
        }
    });

}