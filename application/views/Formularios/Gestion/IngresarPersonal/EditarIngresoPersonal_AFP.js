Ext.define("fcab.Container.EditarIngresoPersonalAFP", {
    extend: 'Ext.container.Container',
    xtype: 'EditarIngresoPersonalAFP',
    itemId: 'EditarIngresoPersonalAFP',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){

            var param = Ext.getCmp('EditarIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbAFP')[0].setValue(param.COD_AFP);
            Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbInstAPV')[0].setValue(param.COD_INSTITUCION_APV);
            Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbMontoApv')[0].setValue(param.FORMATO_MONTO_APV);
            Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbRegAPV')[0].setValue(param.COD_REGIMEN_APV);
            Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #txtMontoAPV')[0].setValue(param.MONTO_APV);
        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        autoScroll: true,
        height: 600, 
        layout: {
            type: 'column',
            align: 'strech'
        },
        
        items:[{
            xtype: 'fieldset',
            title: 'AFP',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbAFP',
                    itemId: 'cbAFP',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_AFP,
                    fieldLabel: 'AFP',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '33%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbInstAPV',
                    itemId: 'cbInstAPV',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_INSTITUCION_APV,
                    fieldLabel: 'Institución APV',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbRegAPV',
                    itemId: 'cbRegAPV',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_REGIMEN_APV,
                    fieldLabel: 'Regimen APV',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.4,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtMontoAPV',
                    name: 'txtMontoAPV',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto APV (UF-$-%)',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 0.1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbMontoApv',
                    itemId: 'cbMontoApv',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                },],
            }]
        }],
        buttons: [{
            tooltip: 'Siguiente',
            //scale: 'large',
            text: 'Siguiente',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                console.log(values);
                if (!ValidarFormulario(form)) return;
                
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    Ext.ComponentQuery.query('#EditarIngresoPersonal #tabSalario')[0].tab.setDisabled(false);
                    Ext.ComponentQuery.query('#EditarIngresoPersonal #tabSalario')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#EditarIngresoPersonal')[0].setActiveTab(4);
                }
            }
        }]

    }],
    

});