Ext.define("fcab.Container.CrearCambioAFP", {
    extend: 'Ext.container.Container',
    xtype: 'CrearCambioAFP',
    itemId: 'CrearCambioAFP',
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
            storeCargarParam_AFP.load();
            storeCargarParam_INSTITUCION_APV.load();
            storeCargarParam_TIPO_CAMBIO_AFP.load();
            storeCargarParam_REGIMEN_APV.load();
            storeExtras_cargarPeriodos.load();
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
                        var txtRut = Ext.ComponentQuery.query('#CrearCambioAFP #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearCambioAFP #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearCambioAFP #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearCambioAFP #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearCambioAFP #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearCambioAFP #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearCambioAFP #txtIngreso')[0];
                                    var txtAFP = Ext.ComponentQuery.query('#CrearCambioAFP #txtAFP')[0];
                                    var txtAPV = Ext.ComponentQuery.query('#CrearCambioAFP #txtAPV')[0];
                                    var txtRegAPV = Ext.ComponentQuery.query('#CrearCambioAFP #txtRegAPV')[0];
                                    var txtMonto = Ext.ComponentQuery.query('#CrearCambioAFP #txtMonto')[0];

                                    var cbAFP = Ext.ComponentQuery.query('#CrearCambioAFP #cbAFP')[0];
                                    var cbAPV = Ext.ComponentQuery.query('#CrearCambioAFP #cbAPV')[0];
                                    var cbRegAPV = Ext.ComponentQuery.query('#CrearCambioAFP #cbRegAPV')[0];
                                    var txtMontoAPV = Ext.ComponentQuery.query('#CrearCambioAFP #txtMontoAPV')[0];
                                    var cbTipoMonto = Ext.ComponentQuery.query('#CrearCambioAFP #cbTipoMonto')[0];

                                    if(records != null && records.length > 0) {
                                        

                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                                        txtAFP.setValue(records[0].data.NOM_AFP);
                                        txtAPV.setValue(records[0].data.NOM_APV);
                                        txtRegAPV.setValue(records[0].data.NOM_REG_APV);
                                        txtMonto.setValue(records[0].data.MONTO_APV != null ? 
                                            (records[0].data.TIPO_MONTO_APV + " " + 
                                            Ext.util.Format.number(records[0].data.MONTO_APV, '0.0,0')) : '');

                                        cbAFP.setValue(records[0].data.COD_AFP);
                                        cbAPV.setValue(records[0].data.COD_APV);
                                        cbRegAPV.setValue(records[0].data.COD_REG_APV);
                                        txtMontoAPV.setValue(records[0].data.MONTO_APV);
                                        cbTipoMonto.setValue(records[0].data.TIPO_MONTO_APV);

                                    }else{
                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        txtAFP.reset();
                                        txtAPV.reset();
                                        txtRegAPV.reset();
                                        txtMonto.reset();
                                        cbAFP.reset();
                                        cbAPV.reset();
                                        cbRegAPV.reset();
                                        txtMontoAPV.reset();
                                        cbTipoMonto.reset();
                                        
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
                    itemId: 'txtAFP',
                    name: 'txtAFP',
                    labelAlign:'top',
                    fieldLabel: 'AFP',
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
                    itemId: 'txtAPV',
                    name: 'txtAPV',
                    labelAlign:'top',
                    fieldLabel: 'APV',
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
                    itemId: 'txtRegAPV',
                    name: 'txtRegAPV',
                    labelAlign:'top',
                    fieldLabel: 'Regimen APV',
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
                    itemId: 'txtMonto',
                    name: 'txtMonto',
                    labelAlign:'top',
                    fieldLabel: 'Monto APV',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        }, {
            xtype: 'fieldset',
            title: 'Cambio AFP',
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
                    store: storeCargarParam_TIPO_CAMBIO_AFP,
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
                    name: 'cbAFP',
                    itemId: 'cbAFP',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_AFP,
                    fieldLabel: 'AFP',
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
                    name: 'cbAPV',
                    itemId: 'cbAPV',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_INSTITUCION_APV,
                    fieldLabel: 'APV',
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
                    name: 'cbRegAPV',
                    itemId: 'cbRegAPV',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_REGIMEN_APV,
                    fieldLabel: 'Regimen APV',
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtMontoAPV',
                    name: 'txtMontoAPV',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto APV',
                    anchor: '100%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 0.30,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbTipoMonto',
                    itemId: 'cbTipoMonto',
                    store: [['UF','UF'], ['$', '$'], ['%', '%']],
                    fieldLabel: 'Formato',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '100%',  
                    style: 'margin: 0 10px 0 0',
                    allowBlank: false,  
                    readOnly: false,  
                    value: '$'
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
            tooltip: 'Ingresar Cambio AFP',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                
                var txtRutOld =  Ext.ComponentQuery.query('#CrearCambioAFP #txtRutOld')[0];
                var cbAFP = Ext.ComponentQuery.query('#CrearCambioAFP #cbAFP')[0];
                var cbAPV = Ext.ComponentQuery.query('#CrearCambioAFP #cbAPV')[0];
                var cbRegAPV = Ext.ComponentQuery.query('#CrearCambioAFP #cbRegAPV')[0];
                var cbTipoCambio = Ext.ComponentQuery.query('#CrearCambioAFP #cbTipoCambio')[0];

                var form = this.up('form').getForm();
                var values = form.getValues();
                var txtMontoAPV = values.txtMontoAPV != null ? values.txtMontoAPV.replace(",", ".") : null;

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                       
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);


                        
                        storeCrearCambioAFP.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_TIPO_CAMBIO :  values.cbTipoCambio
                                , P_NOM_TIPO_CAMBIO : cbTipoCambio.getRawValue()
                                , P_COD_AFP : values.cbAFP
                                , P_NOM_AFP : cbAFP.getRawValue()
                                , P_COD_APV : values.cbAPV
                                , P_NOM_APV : cbAPV.getRawValue()
                                , P_COD_REG_APV : values.cbRegAPV
                                , P_NOM_REG_APV : cbRegAPV.getRawValue()
                                , P_MONTO : txtMontoAPV
                                , P_TIPO_MONTO : values.cbTipoMonto
                                , P_OBSERVACION: values.txtObs
                                , P_PERIODO: values.cbPeriodo

                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Cambio de AFP creado correctamente.');
                                        cargarMainCambioAFP(null);
                                        Ext.getCmp('CrearCambioAFP').destroy();
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

