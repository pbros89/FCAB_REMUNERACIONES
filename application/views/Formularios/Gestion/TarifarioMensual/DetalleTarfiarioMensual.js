Ext.define('fcab.Container.MainTarifarioMensual.Detalle', {
    extend: 'Ext.tab.Panel',
    xtype: 'MainTarifarioMensualDetalle',
    itemId: 'MainTarifarioMensualDetalle',
    activeTab: 0,
    width :'100%',
    height: 600,
    
    listeners: {
        beforerender: function(){
            cargarDetalleTarifarioMensual();
        }
    },
    items: [{
        title: 'General',
        scrollable: false,
        autoScroll: false,
        items:[{
            xtype: 'form',
            titleAlign: 'left',
            border: false,
            frame: false,
            bodyPadding: 20,
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                name: 'txtPeriodo',
                itemId: 'txtPeriodo',
                fieldLabel: 'Periodo',
                labelAlign: 'left',
                readOnly: true,
                width: '50%',
                margin: '0 0 10 0'
                
            },{
                xtype: 'textfield',
                name: 'txtDesde',
                itemId: 'txtDesde',
                fieldLabel: 'Desde',
                labelAlign: 'left',
                readOnly: true,
                width: '50%',
                margin: '0 0 10 0'
                
            },{
                xtype: 'textfield',
                name: 'txtHasta',
                itemId: 'txtHasta',
                fieldLabel: 'Hasta',
                labelAlign: 'left',
                readOnly: true,
                width: '50%',
                margin: '0 0 10 0'
                
            },,{
                xtype: 'textfield',
                name: 'txtEstado',
                itemId: 'txtEstado',
                fieldLabel: 'Estado',
                labelAlign: 'left',
                readOnly: true,
                width: '50%',
                margin: '0 0 10 0'
                
            },{
                xtype: 'textareafield',
                name: 'txtObservacion',
                itemId: 'txtObservacion',
                fieldLabel: 'Observacion',
                labelAlign: 'left',
                readOnly: true,
                width: '100%',
                margin: '0 0 10 0'
                
            }]
           
        }]
    }, {
        title: 'Tarifas',
        scrollable: false,
        autoScroll: false,
        items:[{
            xtype: 'MainTarifarioMensualDetalleDet'
        }]
    },{
        title: 'Guias',
        scrollable: false,
        autoScroll: false,
        items:[{
            xtype: 'MainTarifarioMensualDetalleGuia'
        }]
    },{
        title: 'Exportar',
        itemId:'tabExport',
        scrollable: false,
        autoScroll: false,
        items:[{
            xtype: 'form',
            title: 'Reporte bonos por conductor',
            titleAlign: 'left',
            border: false,
            frame: true,
            bodyPadding: 10,
            layout: {
                type: 'column',
                align: 'strech'
            },
            items: [{
                    xtype: 'numberfield',
                    name: 'txtRut',
                    fieldLabel: 'Rut Conductor (Sin DV)',
                    labelAlign: 'left',
                    maxValue: 999999999,
                    minValue: 1,
                    allowBlank: false,
                    decimalPrecision: 0,
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'button',
                    itemId: 'btnPdf',
                    text: 'Generar PDF',
                    margin: '0 10 0 0',
                    handler: function(){
        
                        var param = Ext.getCmp('MainTarifarioMensualDetalle').myExtraParams.param2.data;
                        var form = this.up('form').getForm();
                        if (!ValidarFormulario(form)) return;
                        var values = form.getValues();

                        Ext.create('Ext.form.Panel', {
                            renderTo: Ext.getBody(),
                            standardSubmit: true,
                            url: host + 'pdf/PdfController/reporteGuiasTrain',
                            timeout : 300000,
                        }).submit({
                            params: {
                                p_anho: param.PK_ANHO,
                                p_mes: param.PK_MES,
                                p_rut: values.txtRut
                            },
                            target: 'ReportePDF' + '-form-iframe',
                            timeout : 300000,
                        });
                    }
                },
            ]
        }]
    }],
    
});


var cargarDetalleTarifarioMensual = function() {

    var param = Ext.getCmp('MainTarifarioMensualDetalle').myExtraParams.param2.data;
    
    storeCargarTarifaMensualDet.loadData([],false);
    storeCargarTarifaMensualGuias.loadData([],false);

    storeCargarTarifaMensualDet.load({
        params : {
            p_anho: param.PK_ANHO,
            p_mes: param.PK_MES,
        },
    });

    storeCargarTarifaMensualGuias.load({
        params : {
            p_anho: param.PK_ANHO,
            p_mes: param.PK_MES,
            p_rut_1: '',
            p_rut_2: ''
        },
        callback: function(records, operation, success) {
            console.log(records);
        }
    });

    Ext.ComponentQuery.query('#MainTarifarioMensualDetalle #txtPeriodo')[0].setValue(param.PK_ANHO + "/" + param.PK_MES);
    Ext.ComponentQuery.query('#MainTarifarioMensualDetalle #txtDesde')[0].setValue(param.DESDE);
    Ext.ComponentQuery.query('#MainTarifarioMensualDetalle #txtHasta')[0].setValue(param.HASTA);
    Ext.ComponentQuery.query('#MainTarifarioMensualDetalle #txtEstado')[0].setValue(param.ESTADO);
    Ext.ComponentQuery.query('#MainTarifarioMensualDetalle #txtObservacion')[0].setValue(param.OBSERVACION);


}