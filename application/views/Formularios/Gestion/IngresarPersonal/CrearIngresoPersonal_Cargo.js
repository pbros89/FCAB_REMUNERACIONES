Ext.define("fcab.Container.CrearIngresoPersonalCargo", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngresoPersonalCargo',
    itemId: 'CrearIngresoPersonalCargo',
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
        itemId: 'formCargo',
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
            title: 'Información del Cargo',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtRutJefatura',
                    name: 'txtRutJefatura',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Rut Jefatura',
                    width: '20%',
                    allowBlank: true,
                    maxValue: 999999999,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtDVJefatura',
                    name: 'txtDVJefatura',
                    labelAlign:'top',
                    fieldLabel: 'DV',
                    width: '5%',
                    typeAhead: true,
                    maxLength: 1,
                    allowBlank: true
                }]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbCC',
                    itemId: 'cbCC',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarCentroCostosFiltro,
                    fieldLabel: 'Centro de Costo',
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
                    name: 'cbCargo',
                    itemId: 'cbCargo',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarCargosFiltro,
                    fieldLabel: 'Cargo',
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
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            console.log(newValue);
                            var cbRolCargo = Ext.ComponentQuery.query('#CrearIngresoPersonal #cbRolCargo')[0];
                            if(newValue != null) {
                                console.log(obj.selection.data.FK_ROL);
                                
                                cbRolCargo.setValue(obj.selection.data.FK_ROL);
                            }else{
                                cbRolCargo.setValue(null);
                            }
                        }
                    }
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbRolCargo',
                    itemId: 'cbRolCargo',
                    displayField: 'NOMBRE',
                    valueField: 'PK_COD_ROL',
                    store: storeCargarRolesCargo,
                    fieldLabel: 'Rol Cargo',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: true,  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbIne',
                    itemId: 'cbIne',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_INE,
                    fieldLabel: 'INE',
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
                    name: 'cbTipoContrato',
                    itemId: 'cbTipoContrato',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_CONTRATO,
                    fieldLabel: 'Tipo Contrato',
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
                    name: 'cbJornada',
                    itemId: 'cbJornada',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_JORNADA,
                    fieldLabel: 'Jornada',
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
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtIngreso',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Ingreso',
                    itemId: 'dtIngreso',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: false,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtVencimiento',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Vencimiento de Plazo',
                    itemId: 'dtVencimiento',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: true,
                },]
                
            },]
        },],
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
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabSalud')[0].tab.setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabSalud')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal')[0].setActiveTab(2);
                }
            }
        }]

    }],
    

});