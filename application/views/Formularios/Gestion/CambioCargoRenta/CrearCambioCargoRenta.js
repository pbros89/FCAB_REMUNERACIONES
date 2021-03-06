Ext.define("fcab.Container.CrearCambioCargoRenta", {
    extend: 'Ext.container.Container',
    xtype: 'CrearCambioCargoRenta',
    itemId: 'CrearCambioCargoRenta',
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
            storeCargarCentroCostosFiltro.load();
            storeCargarCargosFiltro.load();
            storeCargarParam_TIPO_CAMBIO_CARGO_R.load();
            storeCargarParam_JORNADA.load();
            storeCargarParam_TIPO_CONTRATO.load();
            storeExtras_cargarPeriodos.load();
            storeCargarParam_LUGAR_TRABAJO.load();
        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        height: 600, 
        layout: {
            type: 'column',
            align: 'strech'
        },
        autoScroll: true,
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
                        var txtRut = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtCargo')[0];
                                    var txtGerenciaOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtGerenciaOld')[0];
                                    var txtDepartamentoOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtDepartamentoOld')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtIngreso')[0];
                                    var txtTipoContratoOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtTipoContratoOld')[0];
                                    var txtJornadaOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtJornadaOld')[0];
                                    var txtFechaFinOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtFechaFinOld')[0];
                                    var txtSueldoOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtSueldoOld')[0];
                                    var txtJefaturaOld = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtJefaturaOld')[0];

                                    var cbCC = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbCC')[0];
                                    var txtGerencia = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtGerencia')[0];
                                    var txtDepartamento = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtDepartamento')[0];
                                    var txtJefatura = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtJefatura')[0];
                                    var cbCargo = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbCargo')[0];
                                    var cbLugar = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbLugar')[0];
                                    var cbJornada = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbJornada')[0];
                                    var cbTipoContrato = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbTipoContrato')[0];
                                    var txtSueldo = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtSueldo')[0];
                                    var dtFin = Ext.ComponentQuery.query('#CrearCambioCargoRenta #dtFin')[0];
                            
                                    if(records != null && records.length > 0) {
                                        
                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtGerenciaOld.setValue(records[0].data.NOM_GERENCIA);
                                        txtDepartamentoOld.setValue(records[0].data.NOM_DEPARTAMENTO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                                        txtTipoContratoOld.setValue(records[0].data.TIPO_CONTRATO);
                                        txtJornadaOld.setValue(records[0].data.JORNADA);
                                        txtFechaFinOld.setValue(records[0].data.FECHA_FIN_CONTRATO_FORMAT);
                                        txtSueldoOld.setValue(records[0].data.SALARIO_BASE);
                                        txtJefaturaOld.setValue(records[0].data.RUT_SUPERVISOR + " " + records[0].data.NOM_SUPERVISOR);

                                        cbCC.setValue(records[0].data.COD_CC);
                                        cbCargo.setValue(records[0].data.COD_CARGO);
                                        cbJornada.setValue(records[0].data.COD_JORNADA);
                                        cbLugar.setValue(records[0].data.COD_LUGAR_TRABAJO);
                                        cbTipoContrato.setValue(records[0].data.COD_TIPO_CONTRATO);
                                        txtSueldo.setValue(records[0].data.SALARIO_BASE);
                                        dtFin.setValue(records[0].data.FECHA_FIN_CONTRATO_FORMAT);
                                        
                                    }else{

                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtGerenciaOld.reset();
                                        txtDepartamentoOld.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        txtTipoContratoOld.reset();
                                        txtJornadaOld.reset();
                                        txtFechaFinOld.reset();
                                        txtSueldoOld.reset();
                                        txtJefaturaOld.reset();

                                        cbCC.reset();
                                        cbCargo.reset();
                                        cbJornada.reset();
                                        cbTipoContrato.reset();
                                        cbLugar.reset();
                                        txtSueldo.reset();
                                        dtFin.reset();
                                        txtGerencia.reset();
                                        txtDepartamento.reset();
                                        txtJefatura.reset();

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
                    itemId: 'txtGerenciaOld',
                    name: 'txtGerenciaOld',
                    labelAlign:'top',
                    fieldLabel: 'Gerencia',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: false,
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
                    itemId: 'txtDepartamentoOld',
                    name: 'txtDepartamentoOld',
                    labelAlign:'top',
                    fieldLabel: 'Departamento',
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
                    itemId: 'txtJefaturaOld',
                    name: 'txtJefaturaOld',
                    labelAlign:'top',
                    fieldLabel: 'Jefatura',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: false,
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
                    itemId: 'txtTipoContratoOld',
                    name: 'txtTipoContratoOld',
                    labelAlign:'top',
                    fieldLabel: 'Tipo Contrato',
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
                    itemId: 'txtJornadaOld',
                    name: 'txtJornadaOld',
                    labelAlign:'top',
                    fieldLabel: 'Jornada',
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
                    itemId: 'txtFechaFinOld',
                    name: 'txtFechaFinOld',
                    labelAlign:'top',
                    fieldLabel: 'Fecha Fin Contrato',
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
                    xtype: 'thousandnumber',
                    itemId: 'txtSueldoOld',
                    name: 'txtSueldoOld',
                    labelAlign:'top',
                    fieldLabel: 'Sueldo Base',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    decimalPrecision: 0,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        }, {
            xtype: 'fieldset',
            title: 'Cambio Laboral',
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
                    store: storeCargarParam_TIPO_CAMBIO_CARGO_R,
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
                    name: 'cbCC',
                    itemId: 'cbCC',
                    displayField: 'NOMBRE_FULL',
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
                    listeners: {
                        change: function (obj, newValue, oldValue) {
                            var txtGerencia = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtGerencia')[0];
                            var txtDepartamento = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtDepartamento')[0];
                            var txtJefatura = Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtJefatura')[0];
                          if (newValue) {
    
                            var item = obj.selection.data;
                            txtGerencia.setValue(item.NOM_GERENCIA);
                            txtDepartamento.setValue(item.NOM_DEPARTAMENTO);
                            txtJefatura.setValue(item.RUT_JEFE + " " + item.NOM_JEFE);

                          } else {
                            txtGerencia.reset();
                            txtDepartamento.reset();
                            txtJefatura.reset();
                          }
                        },
                      },
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtGerencia',
                    name: 'txtGerencia',
                    labelAlign:'top',
                    fieldLabel: 'Gerencia',
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
                    itemId: 'txtDepartamento',
                    name: 'txtDepartamento',
                    labelAlign:'top',
                    fieldLabel: 'Departamento',
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
                    itemId: 'txtJefatura',
                    name: 'txtJefatura',
                    labelAlign:'top',
                    fieldLabel: 'Jefatura',
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
                    xtype: 'combo',
                    name: 'cbCargo',
                    itemId: 'cbCargo',
                    displayField: 'NOMBRE_FULL',
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
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbLugar',
                    itemId: 'cbLugar',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_LUGAR_TRABAJO,
                    fieldLabel: 'Lugar de Trabajo',
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
                columnWidth: .7,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtFin',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Fin Contrato',
                    itemId: 'dtFin',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: true,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: .3,
                layout: 'anchor',
                style: 'margin: 30px 10px 5px 0',
                items: [{
                    xtype: 'button',
                    text:'Limpiar',
                    handler: function() {
                        var dtFin = Ext.ComponentQuery.query('#CrearCambioCargoRenta #dtFin')[0];
                        dtFin.setValue(null);
                    }
                },]
                
            },{
                xtype: 'container',
                columnWidth: 1,
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
                columnWidth: 1.0,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtSueldo',
                    name: 'txtSueldo',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Sueldo Base',
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
            tooltip: 'Ingresar Cambio Laboral',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                var txtRutOld =  Ext.ComponentQuery.query('#CrearCambioCargoRenta #txtRutOld')[0];
                var cbCC = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbCC')[0];
                var cbCargo = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbCargo')[0];
                var cbTipoCambio = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbTipoCambio')[0];
                var cbTipoContrato = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbTipoContrato')[0];
                var cbJornada = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbJornada')[0];
                var cbLugar = Ext.ComponentQuery.query('#CrearCambioCargoRenta #cbLugar')[0];
                
                var form = this.up('form').getForm();
                var values = form.getValues();
                var txtSueldo = values.txtSueldo != null ? values.txtSueldo.replace(",", ".") : null;

                
                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);


                        storeCrearCambioCargoRenta.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_TIPO_CAMBIO :  values.cbTipoCambio
                                , P_NOM_TIPO_CAMBIO : cbTipoCambio.selection.data.NOMBRE
                                , P_COD_CC : values.cbCC
                                , P_NOM_CC : cbCC.selection.data.NOMBRE
                                , P_COD_CARGO : values.cbCargo
                                , P_NOM_CARGO : cbCargo.selection.data.NOMBRE
                                , P_COD_JORNADA : values.cbJornada
                                , P_NOM_JORNADA : cbJornada.selection.data.NOMBRE
                                , P_COD_TIPO_CONTRATO : values.cbTipoContrato
                                , P_NOM_TIPO_CONTRATO : cbTipoContrato.selection.data.NOMBRE
                                , P_FECHA_FIN_CONTRATO : values.dtFin
                                , P_SUELDO_BASE : txtSueldo
                                , P_OBSERVACION: values.txtObs
                                , P_PERIODO: values.cbPeriodo
                                , P_COD_LUGAR_TRABAJO: values.cbLugar
                                , P_NOM_LUGAR_TRABAJO: cbLugar.selection.data.NOMBRE

                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Cambio laboral creado correctamente.');
                                        cargarMainCambioCargoRenta(null);
                                        Ext.getCmp('CrearCambioCargoRenta').destroy();
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

