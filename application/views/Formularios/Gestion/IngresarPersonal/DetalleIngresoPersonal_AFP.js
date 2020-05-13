Ext.define("fcab.Container.DetalleIngresoPersonalAFP", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleIngresoPersonalAFP',
    itemId: 'DetalleIngresoPersonalAFP',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){

            var param = Ext.getCmp('DetalleIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#DetalleIngresoPersonalAFP #cbAFP')[0].setValue(param.COD_AFP);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalAFP #cbInstAPV')[0].setValue(param.COD_INSTITUCION_APV);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalAFP #cbMontoApv')[0].setValue(param.FORMATO_MONTO_APV);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalAFP #cbRegAPV')[0].setValue(param.COD_REGIMEN_APV);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalAFP #txtMontoAPV')[0].setValue(param.MONTO_APV);
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
                    readOnly: true,  
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    allowBlank: true,  
                    readOnly: true,  
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    allowBlank: true,  
                    readOnly: true,  
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Monto APV (UF-$-%)',
                    anchor: '100%',
                    allowBlank: true,
                    maxValue: 999999999,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    readOnly: true,  
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },],
            }]
        }],

    }],
    

});