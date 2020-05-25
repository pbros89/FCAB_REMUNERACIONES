Ext.define("fcab.Container.DetalleIngresoPersonalSalud", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleIngresoPersonalSalud',
    itemId: 'DetalleIngresoPersonalSalud',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('DetalleIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbAdiEmp')[0].setValue(param.FORMATO_ADI_EMP);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbAdiTra')[0].setValue(param.FORMATO_ADI_TRA);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbPlanColectivoSalud')[0].setValue(param.FORMATO_PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbPlanSalud')[0].setValue(param.FORMATO_PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbSalud')[0].setValue(param.COD_SALUD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #txtAdiEmp')[0].setValue(param.MONTO_ADI_EMP);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #txtAdiTra')[0].setValue(param.MONTO_ADI_TRA);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #txtPlanColectivoSalud')[0].setValue(param.PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #txtPlanSalud')[0].setValue(param.PLAN_SALUD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #txtGes')[0].setValue(param.MONTO_GES);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalSalud #cbGes')[0].setValue(param.FORMATO_GES);
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
            title: 'Salud',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 0.33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbSalud',
                    itemId: 'cbSalud',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_SALUD,
                    fieldLabel: 'Salud',
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
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtPlanSalud',
                    name: 'txtPlanSalud',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Plan Salud (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'combo',
                    name: 'cbPlanSalud',
                    itemId: 'cbPlanSalud',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    style: 'margin: 0 10px 0 0',
                    width: '10%',  
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;' 

                },{
                    xtype: 'thousandnumber',
                    itemId: 'txtPlanColectivoSalud',
                    name: 'txtPlanColectivoSalud',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Plan Colectivo Salud (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'combo',
                    name: 'cbPlanColectivoSalud',
                    itemId: 'cbPlanColectivoSalud',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '10%',  
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;' 
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtAdiTra',
                    name: 'txtAdiTra',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Trabajador (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'combo',
                    name: 'cbAdiTra',
                    itemId: 'cbAdiTra',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    style: 'margin: 0 10px 0 0',
                    width: '10%',  
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'  
                },{
                    xtype: 'thousandnumber',
                    itemId: 'txtAdiEmp',
                    name: 'txtAdiEmp',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Empleador (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'combo',
                    name: 'cbAdiEmp',
                    itemId: 'cbAdiEmp',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '10%',  
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtGes',
                    name: 'txtGes',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'GES (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'combo',
                    name: 'cbGes',
                    itemId: 'cbGes',
                    store: [['%','%'],['UF','UF'], ['$', '$']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    style: 'margin: 0 10px 0 0',
                    width: '10%',  
                    allowBlank: false,  
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;' 
                },],
            }]
        }],

    }],
    

});