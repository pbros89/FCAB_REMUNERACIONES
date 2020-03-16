Ext.define("fcab.Container.CrearIngresoPersonalInfo", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngresoPersonalInfo',
    itemId: 'CrearIngresoPersonalInfo',
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
                columnWidth: 1,
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    width: '20%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtDV',
                    name: 'txtDV',
                    labelAlign:'top',
                    fieldLabel: 'DV',
                    width: '5%',
                    typeAhead: true,
                    maxLength: 1,
                    allowBlank: false
                },{
                    xtype: 'button',
                    width: '10%',
                    style: 'margin: 0 10px 5px 0',
                    text:'Validar',
                    handler: function() {
                        var txtRut = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtDV')[0].getValue();
                        var txtValidar = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtValidar')[0];

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {

                                    if(records != null && records.length > 0) {
                                        txtValidar.setHtml('<span style="color:red"><b>No Disponible</b></span>');

                                    }else{
                                        txtValidar.setHtml('<span style="color:green"><b>Disponible</b></span>');
                                    }
                                    
                                }
                            });
                        }else{
                            Ext.MessageBox.show({
                                title: 'ADVERTENCIA',
                                msg: "Los campos RUT y DV son requeridos",
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                },{
                    itemId:'txtValidar',
                    border: false,
                    style: 'margin: 0 10px 5px 0',
                    html: '<span><b>Falta Validar</b></span>'
                }]
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
                    allowBlank: false    
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
                    fieldLabel: 'Apellido',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false    
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
                    allowBlank: false    
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
                    readOnly: false,  
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
                    allowBlank: false    
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
                    readOnly: false,  
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
                    readOnly: false,  
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
                    allowBlank: false    
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
                    allowBlank: false    
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
                    allowBlank: true    
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
                    allowBlank: false    
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
                    allowBlank: false    
                }]
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
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
                    minValue: 0
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
                    allowBlank: true
                }]
            },],
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
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabCar')[0].tab.setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal #tabCar')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#CrearIngresoPersonal')[0].setActiveTab(1);
                }
                
            }
        }]

    }],
    

});