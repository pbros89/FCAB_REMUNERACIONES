Ext.define("fcab.Container.EditarIngresoPersonalSalud", {
    extend: 'Ext.container.Container',
    xtype: 'EditarIngresoPersonalSalud',
    itemId: 'EditarIngresoPersonalSalud',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('EditarIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbAdiEmp')[0].setValue(param.FORMATO_ADI_EMP);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbAdiTra')[0].setValue(param.FORMATO_ADI_TRA);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbPlanColectivoSalud')[0].setValue(param.FORMATO_PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbPlanSalud')[0].setValue(param.FORMATO_PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbSalud')[0].setValue(param.COD_SALUD);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtAdiEmp')[0].setValue(param.MONTO_ADI_EMP);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtAdiTra')[0].setValue(param.MONTO_ADI_TRA);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtPlanColectivoSalud')[0].setValue(param.PLAN_COLECTIVO_SALUD);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtPlanSalud')[0].setValue(param.PLAN_SALUD);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtGes')[0].setValue(param.MONTO_GES);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbGes')[0].setValue(param.FORMATO_GES);
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
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtPlanSalud',
                    name: 'txtPlanSalud',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Plan Salud (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
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
                    readOnly: false,  
                },{
                    xtype: 'numberfield',
                    itemId: 'txtPlanColectivoSalud',
                    name: 'txtPlanColectivoSalud',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Plan Colectivo Salud (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
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
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtAdiTra',
                    name: 'txtAdiTra',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Trabajador (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
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
                    readOnly: false,  
                },{
                    xtype: 'numberfield',
                    itemId: 'txtAdiEmp',
                    name: 'txtAdiEmp',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Empleador (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
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
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtGes',
                    name: 'txtGes',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'GES (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
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
                    Ext.ComponentQuery.query('#EditarIngresoPersonal #tabAFP')[0].tab.setDisabled(false);
                    Ext.ComponentQuery.query('#EditarIngresoPersonal #tabAFP')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#EditarIngresoPersonal')[0].setActiveTab(3);
                }
            }
        }]

    }],
    

});