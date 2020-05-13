Ext.define("fcab.Container.CrearCambioSindicato", {
    extend: 'Ext.container.Container',
    xtype: 'CrearCambioSindicato',
    itemId: 'CrearCambioSindicato',
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
            storeCargarParam_SINDICATO.load();
            storeCargarParam_ADHERIDO.load();
            storeCargarParam_TIPO_CAMBIO_SINDICATO.load();
            storeExtras_cargarPeriodos.load();
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
                    maxValue: 999999999,
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
                        var txtRut = Ext.ComponentQuery.query('#CrearCambioSindicato #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearCambioSindicato #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearCambioSindicato #txtRutOld')[0]; 
                                    var txtCC = Ext.ComponentQuery.query('#CrearCambioSindicato #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearCambioSindicato #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearCambioSindicato #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearCambioSindicato #txtIngreso')[0];
                                    var txtSindicatoOld = Ext.ComponentQuery.query('#CrearCambioSindicato #txtSindicatoOld')[0];
                                    var txtAdheridoOld = Ext.ComponentQuery.query('#CrearCambioSindicato #txtAdheridoOld')[0];
                                    var cbSindicato = Ext.ComponentQuery.query('#CrearCambioSindicato #cbSindicato')[0];
                                    var cbAdherido = Ext.ComponentQuery.query('#CrearCambioSindicato #cbAdherido')[0];

                                    if(records != null && records.length > 0) {
                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                                        txtSindicatoOld.setValue(records[0].data.NOM_SINDICATO);
                                        txtAdheridoOld.setValue(records[0].data.NOM_ADH_SINDICATO);

                                        cbSindicato.setValue(records[0].data.COD_SINDICATO);
                                        cbAdherido.setValue(records[0].data.COD_ADH_SINDICADOR);
                                        
                                    }else{

                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        txtSindicatoOld.reset();
                                        txtAdheridoOld.reset();
                                        cbSindicato.reset();
                                        cbAdherido.reset();

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
                    allowBlank: false,
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
                    allowBlank: false,
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
                    allowBlank: false,
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
                    allowBlank: false,
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
                    allowBlank: false,
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
                    itemId: 'txtSindicatoOld',
                    name: 'txtSindicatoOld',
                    labelAlign:'top',
                    fieldLabel: 'Sindicato',
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
                    itemId: 'txtAdheridoOld',
                    name: 'txtAdheridoOld',
                    labelAlign:'top',
                    fieldLabel: 'Adherido',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        }, {
            xtype: 'fieldset',
            title: 'Cambio Sindicato',
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
                    store: storeCargarParam_TIPO_CAMBIO_SINDICATO,
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
                    name: 'cbSindicato',
                    itemId: 'cbSindicato',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_SINDICATO,
                    fieldLabel: 'Sindicato',
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
                    name: 'cbAdherido',
                    itemId: 'cbAdherido',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_ADHERIDO,
                    fieldLabel: 'Adherido',
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
            tooltip: 'Ingresar Cambio Sindicato',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                var txtRutOld = Ext.ComponentQuery.query('#CrearCambioSindicato #txtRutOld')[0];        
                var cbSindicato = Ext.ComponentQuery.query('#CrearCambioSindicato #cbSindicato')[0];
                var cbAdherido = Ext.ComponentQuery.query('#CrearCambioSindicato #cbAdherido')[0];
                var cbTipoCambio = Ext.ComponentQuery.query('#CrearCambioSindicato #cbTipoCambio')[0];
                var form = this.up('form').getForm();
                var values = form.getValues();


                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);

                        storeCrearCambioSindicato.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_TIPO_CAMBIO :  values.cbTipoCambio
                                , P_NOM_TIPO_CAMBIO : cbTipoCambio.getRawValue()
                                , P_COD_SINDICATO : values.cbSindicato
                                , P_NOM_SINDICATO : cbSindicato.getRawValue()
                                , P_COD_ADHERENCIA : values.cbAdherido
                                , P_NOM_ADHERENCIA : cbAdherido.getRawValue()
                                , P_OBSERVACION: values.txtObs
                                , P_PERIODO: values.cbPeriodo
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Cambio creado correctamente.');
                                        cargarMainCambioSindicato(null);
                                        Ext.getCmp('CrearCambioSindicato').destroy();
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

