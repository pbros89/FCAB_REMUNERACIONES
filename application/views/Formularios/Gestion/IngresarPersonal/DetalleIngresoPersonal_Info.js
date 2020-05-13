Ext.define("fcab.Container.DetalleIngresoPersonalInfo", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleIngresoPersonalInfo',
    itemId: 'DetalleIngresoPersonalInfo',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('DetalleIngresoPersonal').myExtraParams.param2.data;

            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #cbEstadoCivil')[0].setValue(param.COD_ESTADO_CIVIL);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #cbNvlEducacional')[0].setValue(param.COD_NIVEL_EDUCACION);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #dtNacimiento')[0].setValue(param.FECHA_NACIMIENTO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtApeMat')[0].setValue(param.APE_MAT);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtCalle')[0].setValue(param.CALLE);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtPeriodo')[0].setValue(param.PERIODO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtCiudad')[0].setValue(param.CIUDAD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtComuna')[0].setValue(param.COMUNA);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtCorreo')[0].setValue(param.CORREO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtDV')[0].setValue(param.DV);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtDepartamento')[0].setValue(param.DEPARTAMENTO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtFono')[0].setValue(param.TELEFONO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtNacionalidad')[0].setValue(param.NACIONALIDAD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtApePat')[0].setValue(param.NACIONALIDAD);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtNombre')[0].setValue(param.NOMBRES);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtNumero')[0].setValue(param.NUMERO);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #txtRut')[0].setValue(param.RUT);
            Ext.ComponentQuery.query('#DetalleIngresoPersonalInfo #cbSexo')[0].setValue(param.COD_SEXO);
        }
    },
    items: [{
        xtype: 'form',
        itemId: 'formInfo',
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
            title: 'Información Personal',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    style: 'margin: 0 10px 0 0',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    width: '20%',
                    readOnly : true,
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },{
                    xtype: 'textfield',
                    style: 'margin: 0 10px 0 0',
                    itemId: 'txtDV',
                    name: 'txtDV',
                    labelAlign:'top',
                    fieldLabel: 'DV',
                    width: '5%',
                    typeAhead: true,
                    readOnly : true,
                    maxLength: 1,
                    allowBlank: false,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: {
                    type: 'hbox',
                    pack: 'end'   
                },
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtPeriodo',
                    name: 'txtPeriodo',
                    labelAlign:'top',
                    fieldLabel: 'Periodo',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false,   
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                },]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtNombre',
                    name: 'txtNombre',
                    labelAlign:'top',
                    fieldLabel: 'Nombres',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'    
                }]
            },{
                xtype: 'container',
                columnWidth: .25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtApePat',
                    name: 'txtApePat',
                    labelAlign:'top',
                    fieldLabel: 'Apellido Paterno',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'  
                }]
            },{
                xtype: 'container',
                columnWidth: .25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtApeMat',
                    name: 'txtApeMat',
                    labelAlign:'top',
                    fieldLabel: 'Apellido Materno',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
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
                    name: 'dtNacimiento',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Nacimiento',
                    itemId: 'dtNacimiento',
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
                    xtype: 'combo',
                    name: 'cbSexo',
                    itemId: 'cbSexo',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_SEXO,
                    fieldLabel: 'Sexo',
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
                columnWidth: .25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtNacionalidad',
                    name: 'txtNacionalidad',
                    labelAlign:'top',
                    fieldLabel: 'Nacionalidad',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false ,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbEstadoCivil',
                    itemId: 'cbEstadoCivil',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_ESTADO_CIVIL,
                    fieldLabel: 'Estado Civil',
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
                    xtype: 'combo',
                    name: 'cbNvlEducacional',
                    itemId: 'cbNvlEducacional',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_NIVEL_EDUCACION,
                    fieldLabel: 'Nivel Educacional',
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
                    xtype: 'textfield',
                    itemId: 'txtCalle',
                    name: 'txtCalle',
                    labelAlign:'top',
                    fieldLabel: 'Calle',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
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
                    xtype: 'textfield',
                    itemId: 'txtNumero',
                    name: 'txtNumero',
                    labelAlign:'top',
                    fieldLabel: 'Número',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
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
                    xtype: 'textfield',
                    itemId: 'txtDepartamento',
                    name: 'txtDepartamento',
                    labelAlign:'top',
                    fieldLabel: 'Departamento',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
                    allowBlank: true,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'    
                }]
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtComuna',
                    name: 'txtComuna',
                    labelAlign:'top',
                    fieldLabel: 'Comuna',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
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
                    xtype: 'textfield',
                    itemId: 'txtCiudad',
                    name: 'txtCiudad',
                    labelAlign:'top',
                    fieldLabel: 'Ciudad',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
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
                    xtype: 'thousandnumber',
                    itemId: 'txtFono',
                    name: 'txtFono',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Teléfono',
                    anchor: '100%',
                    allowBlank: true,
                    maxValue: 999999999999,
                    minValue: 0,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },{
                xtype: 'container',
                
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    vtype: 'email',
                    itemId: 'txtCorreo',
                    name: 'txtCorreo',
                    labelAlign:'top',
                    fieldLabel: 'Correo',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 500,
                    allowBlank: true,
                    readOnly : true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;'
                }]
            },],
        }],
        

    }],
    

});