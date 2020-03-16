Ext.define("fcab.Container.DetalleIngresoPersonalCargo", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleIngresoPersonalCargo',
    itemId: 'DetalleIngresoPersonalCargo',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('DetalleIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbCC')[0].setValue(param.COD_CC);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbCargo')[0].setValue(param.COD_CARGO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbIne')[0].setValue(param.COD_INE);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbJornada')[0].setValue(param.COD_JORNADA);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbRolCargo')[0].setValue(param.ROL_CARGO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #cbTipoContrato')[0].setValue(param.COD_TIPO_CONTRATO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #dtIngreso')[0].setValue(param.FECHA_INGRESO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #dtVencimiento')[0].setValue(param.FECHA_VENCIMIENTO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #txtDVJefatura')[0].setValue(param.RUT_JEFE);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalCargo #txtRutJefatura')[0].setValue(param.DV_JEFE);
    
        },
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
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    allowBlank: true,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            console.log(newValue);
                            var cbRolCargo = Ext.ComponentQuery.query('#DetalleIngresoPersonal #cbRolCargo')[0];
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
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
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
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },]
                
            },]
        },],
        

    }],
    

});