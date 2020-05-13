Ext.define("fcab.Container.CrearIngresoPersonalSalud", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngresoPersonalSalud',
    itemId: 'CrearIngresoPersonalSalud',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
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
                    xtype: 'thousandnumber',
                    itemId: 'txtPlanSalud',
                    name: 'txtPlanSalud',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Plan Salud (UF-$-%)',
                    width: '40%',
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    value: 0
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
                    value: '$'
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
                    maxValue: 999999999,
                    minValue: 0,
                    value: 0
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
                    value: '$'
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
                    maxValue: 999999999,
                    minValue: 0,
                    value: 0
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
                    value: '$'
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
                    maxValue: 999999999,
                    minValue: 0,
                    value: 0
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
                    value: '$'
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
                    maxValue: 999999999,
                    minValue: 0,
                    value: 0
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
                    value: '$'
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
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabAFP')[0].tab.setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabAFP')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal')[0].setActiveTab(3);
                }
            }
        }]

    }],
    

});