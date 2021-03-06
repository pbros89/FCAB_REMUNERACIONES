Ext.define("fcab.Container.CrearCambioOtros", {
    extend: 'Ext.container.Container',
    xtype: 'CrearCambioOtros',
    itemId: 'CrearCambioOtros',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
    },
    listeners: {
        afterrender: function() {
            storeCargarParam_TIPO_CAMBIO_OTROS.load();
            storeCargarParam_NIVEL_EDUCACION.load();
            storeCargarParam_ESTADO_CIVIL.load();
            storeExtras_cargarPeriodos.load();
            storeCargarParam_CIUDAD.load();
            storeCargarParam_COMUNA.load();
        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        autoScroll: true,
        height: 600, 
        items:[{
            
            xtype: 'fieldset',
            title: 'Trabajador',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 0.6,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: .8,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    width: '50%',
                    allowBlank: false,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtDV',
                    name: 'txtDV',
                    labelAlign:'top',
                    fieldLabel: 'DV',
                    width: '10%',
                    typeAhead: true,
                    maxLength: 1,
                    allowBlank: false
                },{
                    xtype: 'button',
                    margin: '30 0 0 0',
                    text:'Cargar Personal',
                    handler: function() {
                        var txtRut = Ext.ComponentQuery.query('#CrearCambioOtros #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearCambioOtros #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {


                                    var txtRutOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearCambioOtros #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearCambioOtros #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearCambioOtros #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearCambioOtros #txtIngreso')[0];
                                    var txtCorreoOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtCorreoOld')[0];
                                    var txtTelefonoOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtTelefonoOld')[0];     
                                    var txtCorreo = Ext.ComponentQuery.query('#CrearCambioOtros #txtCorreo')[0];
                                    var txtTelefono = Ext.ComponentQuery.query('#CrearCambioOtros #txtTelefono')[0];
                                    var txtTelefono2 = Ext.ComponentQuery.query('#CrearCambioOtros #txtTelefono2')[0];
                                    var cbEstadoCivil = Ext.ComponentQuery.query('#CrearCambioOtros #cbEstadoCivil')[0];
                                    var cbNvlEducacional = Ext.ComponentQuery.query('#CrearCambioOtros #cbNvlEducacional')[0]
                                    var txtCalle = Ext.ComponentQuery.query('#CrearCambioOtros #txtCalle')[0];
                                    var cbCiudad = Ext.ComponentQuery.query('#CrearCambioOtros #cbCiudad')[0]
                                    var cbComuna = Ext.ComponentQuery.query('#CrearCambioOtros #cbComuna')[0]
                                    var txtDepartamento = Ext.ComponentQuery.query('#CrearCambioOtros #txtDepartamento')[0];
                                    var txtNumero = Ext.ComponentQuery.query('#CrearCambioOtros #txtNumero')[0];

                                    var txtEstCivilOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtEstCivilOld')[0];
                                    var txtEducacionOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtEducacionOld')[0];
                                    var txtCiudadOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtCiudadOld')[0];
                                    var txtComunaOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtComunaOld')[0];
                                    var txtCalleOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtCalleOld')[0];
                                    var txtNumeroOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtNumeroOld')[0];
                                    var txtDepartamentoOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtDepartamentoOld')[0];
                                    var txtTelefono2Old = Ext.ComponentQuery.query('#CrearCambioOtros #txtTelefono2Old')[0];
                                    
                                    if(records != null && records.length > 0) {

                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                                        txtCorreoOld.setValue(records[0].data.CORREO);
                                        txtTelefonoOld.setValue(records[0].data.TELEFONO);
                                        txtCorreo.setValue(records[0].data.CORREO);
                                        txtTelefono.setValue(records[0].data.TELEFONO);

                                        txtEstCivilOld.setValue(records[0].data.NOM_EST_CIVIL);
                                        txtEducacionOld.setValue(records[0].data.ESCOLARIDAD);
                                        txtCiudadOld.setValue(records[0].data.CIUDAD);
                                        txtComunaOld.setValue(records[0].data.COMUNA);
                                        txtCalleOld.setValue(records[0].data.CALLE);
                                        txtNumeroOld.setValue(records[0].data.NUMERO);
                                        txtDepartamentoOld.setValue(records[0].data.DEPARTAMENTO);
                                        txtTelefono2Old.setValue(records[0].data.TELEFONO2);

                                        cbEstadoCivil.setValue(records[0].data.COD_EST_CIVIL);
                                        cbNvlEducacional.setValue(records[0].data.COD_ESCOLARIDAD);
                                        txtCalle.setValue(records[0].data.CALLE);
                                        cbCiudad.setValue(records[0].data.COD_CIUDAD);
                                        cbComuna.setValue(records[0].data.COD_COMUNA);
                                        txtDepartamento.setValue(records[0].data.DEPARTAMENTO);
                                        txtNumero.setValue(records[0].data.NUMERO);
                                        txtTelefono2.setValue(records[0].data.TELEFONO2);
                                    }else{

                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        txtCorreoOld.reset();
                                        txtTelefonoOld.reset();
                                        txtCorreo.reset();
                                        txtTelefono.reset();

                                        cbEstadoCivil.reset();
                                        cbNvlEducacional.reset();
                                        txtCalle.reset();
                                        cbCiudad.reset();
                                        cbComuna.reset();
                                        txtDepartamento.reset();
                                        txtNumero.reset();
                                        txtTelefono2.reset();

                                        txtEstCivilOld.reset();
                                        txtEducacionOld.reset();
                                        txtCiudadOld.reset();
                                        txtComunaOld.reset();
                                        txtCalleOld.reset();
                                        txtNumeroOld.reset();
                                        txtDepartamentoOld.reset();
                                        txtTelefono2Old.reset();

                                        Ext.MessageBox.show({
                                            title: 'ADVERTENCIA',
                                            msg: "No se encontro personal con el RUT ingresado",
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.Msg.OK
                                        });
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
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtRutOld',
                    name: 'txtRutOld',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtNombre',
                    name: 'txtNombre',
                    labelAlign:'top',
                    fieldLabel: 'Nombre',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCC',
                    name: 'txtCC',
                    labelAlign:'top',
                    fieldLabel: 'Centro Costo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCargo',
                    name: 'txtCargo',
                    labelAlign:'top',
                    fieldLabel: 'Cargo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtIngreso',
                    name: 'txtIngreso',
                    labelAlign:'top',
                    fieldLabel: 'Fecha Ingreso',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },  {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtEstCivilOld',
                    name: 'txtEstCivilOld',
                    labelAlign:'top',
                    fieldLabel: 'Estado Civil',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtEducacionOld',
                    name: 'txtEducacionOld',
                    labelAlign:'top',
                    fieldLabel: 'Nivel Educación',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtComunaOld',
                    name: 'txtComunaOld',
                    labelAlign:'top',
                    fieldLabel: 'Comuna',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCiudadOld',
                    name: 'txtCiudadOld',
                    labelAlign:'top',
                    fieldLabel: 'Ciudad',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .50,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCalleOld',
                    name: 'txtCalleOld',
                    labelAlign:'top',
                    fieldLabel: 'Calle',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;', 
                }]
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtNumeroOld',
                    name: 'txtNumeroOld',
                    labelAlign:'top',
                    fieldLabel: 'Número',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',   
                }]
            },{
                xtype: 'container',
                columnWidth: 0.25,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtDepartamentoOld',
                    name: 'txtDepartamentoOld',
                    labelAlign:'top',
                    fieldLabel: 'Departamento',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
                    aallowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',    
                }]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCorreoOld',
                    name: 'txtCorreoOld',
                    labelAlign:'top',
                    fieldLabel: 'Correo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtTelefonoOld',
                    name: 'txtTelefonoOld',
                    labelAlign:'top',
                    fieldLabel: 'Telefono',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtTelefono2Old',
                    name: 'txtTelefono2Old',
                    labelAlign:'top',
                    fieldLabel: 'Telefono2',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        }, {
            xtype: 'fieldset',
            title: 'Cambio Otros',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .4,
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
                    name: 'cbPeriodo',
                    itemId: 'cbPeriodo',
                    displayField: 'PERIODO',
                    valueField: 'PERIODO',
                    store: storeExtras_cargarPeriodos,
                    fieldLabel: 'Periodo',
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
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbTipoCambio',
                    itemId: 'cbTipoCambio',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_CAMBIO_OTROS,
                    fieldLabel: 'Tipo Cambio',
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
                columnWidth: 1,
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
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbComuna',
                    itemId: 'cbComuna',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_COMUNA,
                    fieldLabel: 'Comuna',
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
                    name: 'cbCiudad',
                    itemId: 'cbCiudad',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_CIUDAD,
                    fieldLabel: 'Ciudad',
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
                columnWidth: .50,
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
                columnWidth: 1,
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
                    allowBlank: true,
                    maxLength: 500,
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtTelefono',
                    name: 'txtTelefono',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Telefono',
                    anchor: '100%',
                    allowBlank: false,
                    minValue: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtTelefono2',
                    name: 'txtTelefono2',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Telefono2',
                    anchor: '100%',
                    allowBlank: false,
                    minValue: 0
                }]
            },{

                vtype: 'email',

                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textareafield',
                    itemId: 'txtObs',
                    name: 'txtObs',
                    labelAlign:'top',
                    fieldLabel: 'Observación',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    maxLength: 1000,
                }]
            }]
        }],
        buttons: [{
            tooltip: 'Ingresar Cambio Otros',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                var txtRutOld = Ext.ComponentQuery.query('#CrearCambioOtros #txtRutOld')[0];                       
                var cbTipoCambio = Ext.ComponentQuery.query('#CrearCambioOtros #cbTipoCambio')[0];
                var cbEstadoCivil = Ext.ComponentQuery.query('#CrearCambioOtros #cbEstadoCivil')[0];
                var cbNvlEducacional = Ext.ComponentQuery.query('#CrearCambioOtros #cbNvlEducacional')[0];
                var cbCiudad = Ext.ComponentQuery.query('#CrearCambioOtros #cbCiudad')[0];
                var cbComuna = Ext.ComponentQuery.query('#CrearCambioOtros #cbComuna')[0];
                var form = this.up('form').getForm();
                var values = form.getValues();


                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);


                        storeCrearCambioOtros.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_TIPO_CAMBIO :  values.cbTipoCambio
                                , P_NOM_TIPO_CAMBIO : cbTipoCambio.getRawValue()
                                , P_CORREO : values.txtCorreo
                                , P_TELEFONO : values.txtTelefono
                                , P_OBSERVACION: values.txtObs
                                , P_COD_EST_CIVIL: values.cbEstadoCivil
                                , P_NOM_EST_CIVIL: cbEstadoCivil.getRawValue()
                                , P_COD_ESCOLARIDAD: values.cbNvlEducacional
                                , P_NOM_ESCOLARIDAD: cbNvlEducacional.getRawValue()
                                , P_CALLE: values.txtCalle
                                , P_NUMERO: values.txtNumero
                                , P_DEPARTAMENTO: values.txtDepartamento
                                , P_CIUDAD: cbCiudad.getRawValue()
                                , P_COMUNA: cbComuna.getRawValue()
                                , P_PERIODO: values.cbPeriodo
                                , P_COD_COMUNA: values.cbComuna
                                , P_COD_CIUDAD: values.cbCiudad
                                , P_TELEFONO2: values.txtTelefono2
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Cambio creado correctamente.');
                                        cargarMainCambioOtros(null);
                                        Ext.getCmp('CrearCambioOtros').destroy();
                                    }else{
                                        Ext.MessageBox.show({
                                            title: 'ADVERTENCIA',
                                            msg: records[0].data.r_msg,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }
                                
                            }
                        });
                    }//console.log(form.getValues());
                }
            }
        }]
    }],
});

