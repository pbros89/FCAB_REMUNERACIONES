Ext.define("fcab.Container.CrearCambioSalud", {
    extend: 'Ext.container.Container',
    xtype: 'CrearCambioSalud',
    itemId: 'CrearCambioSalud',
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
            storeCargarParam_SALUD.load();
            storeCargarParam_TIPO_CAMBIO_SALUD.load();
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
                        var txtRut = Ext.ComponentQuery.query('#CrearCambioSalud #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearCambioSalud #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearCambioSalud #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearCambioSalud #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearCambioSalud #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearCambioSalud #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearCambioSalud #txtIngreso')[0];
                                    var txtSalud = Ext.ComponentQuery.query('#CrearCambioSalud #txtSalud')[0];
                                    var txtValorPlan = Ext.ComponentQuery.query('#CrearCambioSalud #txtValorPlan')[0];
                                    var txtValorGes = Ext.ComponentQuery.query('#CrearCambioSalud #txtValorGes')[0];
                                    var txtValorAdiTra = Ext.ComponentQuery.query('#CrearCambioSalud #txtValorAdiTra')[0];
                                    var txtValorAdiEmp = Ext.ComponentQuery.query('#CrearCambioSalud #txtValorAdiEmp')[0];
                                    var txtValorConvenio = Ext.ComponentQuery.query('#CrearCambioSalud #txtValorConvenio')[0];

                                    var cbSalud = Ext.ComponentQuery.query('#CrearCambioSalud #cbSalud')[0];
                                    var txtPlan = Ext.ComponentQuery.query('#CrearCambioSalud #txtPlan')[0];
                                    var txtGes = Ext.ComponentQuery.query('#CrearCambioSalud #txtGes')[0];
                                    var txtAdiTra = Ext.ComponentQuery.query('#CrearCambioSalud #txtAdiTra')[0];
                                    var txtAdiEmp = Ext.ComponentQuery.query('#CrearCambioSalud #txtAdiEmp')[0];
                                    var txtConvenio = Ext.ComponentQuery.query('#CrearCambioSalud #txtConvenio')[0];
                                    var cbPlan = Ext.ComponentQuery.query('#CrearCambioSalud #cbPlan')[0];
                                    var cbGes = Ext.ComponentQuery.query('#CrearCambioSalud #cbGes')[0];
                                    var cbAdiTra = Ext.ComponentQuery.query('#CrearCambioSalud #cbAdiTra')[0];
                                    var cbAdiEmp = Ext.ComponentQuery.query('#CrearCambioSalud #cbAdiEmp')[0];
                                    var cbConvenio = Ext.ComponentQuery.query('#CrearCambioSalud #cbConvenio')[0];

                                    if(records != null && records.length > 0) {
                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                                        txtSalud.setValue(records[0].data.NOM_SALUD);
                                        txtValorPlan.setValue(records[0].data.VALOR_SALUD != null ? 
                                            (records[0].data.TIPO_VALOR_SALUD + " " + 
                                            Ext.util.Format.number(records[0].data.VALOR_SALUD, '0.0,0')) : '');
                                        txtValorGes.setValue(records[0].data.VALOR_GES != null ? 
                                            (records[0].data.TIPO_GES + " " + 
                                            Ext.util.Format.number(records[0].data.VALOR_GES, '0.0,0')) : '');
                                        txtValorAdiTra.setValue(records[0].data.VALOR_ADI_TRA != null ? 
                                            (records[0].data.TIPO_ADI_TRA + " " + 
                                            Ext.util.Format.number(records[0].data.VALOR_ADI_TRA, '0.0,0')) : '');
                                        txtValorAdiEmp.setValue(records[0].data.VALOR_ADI_EMP != null ? 
                                            (records[0].data.TIPO_ADI_EMP + " " + 
                                            Ext.util.Format.number(records[0].data.VALOR_ADI_EMP, '0.0,0')) : '');
                                        txtValorConvenio.setValue(records[0].data.VALOR_CONVENIO != null ? 
                                            (records[0].data.TIPO_CONVENIO + " " + 
                                            Ext.util.Format.number(records[0].data.VALOR_CONVENIO, '0.0,0')) : '');

                                        cbSalud.setValue(records[0].data.COD_SALUD);
                                        txtPlan.setValue(records[0].data.VALOR_SALUD);
                                        txtGes.setValue(records[0].data.VALOR_GES);
                                        txtAdiTra.setValue(records[0].data.VALOR_ADI_TRA);
                                        txtAdiEmp.setValue(records[0].data.VALOR_ADI_EMP);
                                        txtConvenio.setValue(records[0].data.VALOR_CONVENIO);
                                        cbPlan.setValue(records[0].data.TIPO_VALOR_SALUD);
                                        cbGes.setValue(records[0].data.TIPO_GES);
                                        cbAdiTra.setValue(records[0].data.TIPO_ADI_TRA);
                                        cbAdiEmp.setValue(records[0].data.TIPO_ADI_EMP);
                                        cbConvenio.setValue(records[0].data.TIPO_CONVENIO);
                                    }else{
                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        txtSalud.reset();
                                        txtValorPlan.reset();
                                        txtValorGes.reset();
                                        txtValorAdiTra.reset();
                                        txtValorAdiEmp.reset();
                                        txtValorConvenio.reset();

                                        cbSalud.reset();
                                        txtPlan.reset();
                                        txtGes.reset();
                                        txtAdiTra.reset();
                                        txtAdiEmp.reset();
                                        txtConvenio.reset();
                                        cbPlan.reset();
                                        cbGes.reset();
                                        cbAdiTra.reset();
                                        cbAdiEmp.reset();
                                        cbConvenio.reset();

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
                    itemId: 'txtSalud',
                    name: 'txtSalud',
                    labelAlign:'top',
                    fieldLabel: 'Salud',
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
                    itemId: 'txtValorPlan',
                    name: 'txtValorPlan',
                    labelAlign:'top',
                    fieldLabel: 'Valor Plan',
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
                    itemId: 'txtValorGes',
                    name: 'txtValorGes',
                    labelAlign:'top',
                    fieldLabel: 'Ges',
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
                    itemId: 'txtValorAdiTra',
                    name: 'txtValorAdiTra',
                    labelAlign:'top',
                    fieldLabel: 'Adicional Trabajador',
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
                    itemId: 'txtValorAdiEmp',
                    name: 'txtValorAdiEmp',
                    labelAlign:'top',
                    fieldLabel: 'Adicional Empleador',
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
                    itemId: 'txtValorConvenio',
                    name: 'txtValorConvenio',
                    labelAlign:'top',
                    fieldLabel: 'Convenio Colectivo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        }, {
            xtype: 'fieldset',
            title: 'Cambio Salud',
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
                    store: storeCargarParam_TIPO_CAMBIO_SALUD,
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtPlan',
                    name: 'txtPlan',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Valor Plan',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    value: '0'
                }]
            },{
                xtype: 'container',
                columnWidth: 0.30,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbPlan',
                    itemId: 'cbPlan',
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtGes',
                    name: 'txtGes',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'GES',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
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
                    name: 'cbGes',
                    itemId: 'cbGes',
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtAdiTra',
                    name: 'txtAdiTra',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Trabajador',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
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
                    name: 'cbAdiTra',
                    itemId: 'cbAdiTra',
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtAdiEmp',
                    name: 'txtAdiEmp',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Adicional Empleador',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
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
                    name: 'cbAdiEmp',
                    itemId: 'cbAdiEmp',
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
                columnWidth: 0.70,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtConvenio',
                    name: 'txtConvenio',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Convenio Colectivo',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
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
                    name: 'cbConvenio',
                    itemId: 'cbConvenio',
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
            tooltip: 'Ingresar Cambio Salud',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                var txtRutOld = Ext.ComponentQuery.query('#CrearCambioSalud #txtRutOld')[0];
                var cbSalud = Ext.ComponentQuery.query('#CrearCambioSalud #cbSalud')[0];
                var cbTipoCambio = Ext.ComponentQuery.query('#CrearCambioSalud #cbTipoCambio')[0];
                var form = this.up('form').getForm();
                var values = form.getValues();

                var txtPlan = values.txtPlan != null ? values.txtPlan.replace(",", ".") : null;
                var txtGes = values.txtGes != null ? values.txtGes.replace(",", ".") : null;
                var txtAdiTra = values.txtAdiTra != null ? values.txtAdiTra.replace(",", ".") : null;
                var txtAdiEmp = values.txtAdiEmp != null ? values.txtAdiEmp.replace(",", ".") : null;
                var txtConvenio = values.txtConvenio != null ? values.txtConvenio.replace(",", ".") : null;

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);

                        storeCrearCambioSalud.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_TIPO_CAMBIO :  values.cbTipoCambio
                                , P_NOM_TIPO_CAMBIO : cbTipoCambio.getRawValue()
                                , P_COD_SALUD : values.cbSalud
                                , P_NOM_SALUD : cbSalud.getRawValue()
                                , P_VALOR_PLAN : txtPlan
                                , P_TIPO_PLAN : values.cbPlan
                                , P_VALOR_GES : txtGes
                                , P_TIPO_GES : values.cbGes
                                , P_VALOR_ADI_TRA : txtAdiTra
                                , P_TIPO_ADI_TRA : values.cbAdiTra
                                , P_VALOR_ADI_EMP : txtAdiEmp
                                , P_TIPO_ADI_EMP : values.cbAdiEmp
                                , P_VALOR_CONVENIO : txtConvenio
                                , P_TIPO_CONVENIO : values.cbConvenio
                                , P_OBSERVACION: values.txtObs
                                , P_PERIODO: values.cbPeriodo

                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Cambio de salud creado correctamente.');
                                        cargarMainCambioSalud(null);
                                        Ext.getCmp('CrearCambioSalud').destroy();
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

