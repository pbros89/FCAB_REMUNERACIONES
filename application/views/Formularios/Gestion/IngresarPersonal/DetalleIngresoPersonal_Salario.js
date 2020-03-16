Ext.define("fcab.Container.DetalleIngresoPersonalSalario", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleIngresoPersonalSalario',
    itemId: 'DetalleIngresoPersonalSalario',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('DetalleIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalario #cbBanco')[0].setValue(param.COD_BANCO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalario #cbFormaPago')[0].setValue(param.COD_FORMA_PAGO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalario #txtCuenta')[0].setValue(param.CUENTA);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalario #txtRentaContrato')[0].setValue(param.RENTA_CONTRATO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalario #txtSueldo')[0].setValue(param.SUELDO_BASE);
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
            title: 'Salario',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbFormaPago',
                    itemId: 'cbFormaPago',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_FORMA_PAGO,
                    fieldLabel: 'Forma de Pago',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbBanco',
                    itemId: 'cbBanco',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_BANCO,
                    fieldLabel: 'Banco',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                columnWidth: .33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCuenta',
                    name: 'txtCuenta',
                    labelAlign:'top',
                    fieldLabel: 'Cuenta Bancaria',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false ,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'   
                }]
            },{
                xtype: 'container',
                columnWidth: 0.33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtSueldo',
                    name: 'txtSueldo',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Sueldo Base',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                columnWidth: 0.33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtRentaContrato',
                    name: 'txtRentaContrato',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Renta Contrato',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },],
        }],
    }],
    

});