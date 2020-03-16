Ext.define("fcab.Container.CrearAusentismo", {
    extend: 'Ext.container.Container',
    xtype: 'CrearAusentismo',
    itemId: 'CrearAusentismo',
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
                    xtype: 'numberfield',
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
                        var txtRut = Ext.ComponentQuery.query('#CrearAusentismo #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearAusentismo #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearAusentismo #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearAusentismo #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearAusentismo #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearAusentismo #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearAusentismo #txtIngreso')[0];
    

                                    if(records != null && records.length > 0) {
                                        

                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);


                                    }else{
                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        
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
            }],
        }, {
            xtype: 'fieldset',
            title: 'Crear Ausentismo',
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
                style: 'margin: 0 5 5 5',
                items: [{
                    xtype: 'combobox',
                    labelAlign:'top',
                    fieldLabel: 'Tipo',
                    displayField: 'NOMBRE',
                    valueField: 'VALOR',
                    anchor: '100%',
                    name: 'cbTipo',
                    itemId: 'cbTipo',
                    editable: true,
                    readOnly: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    selectOnFocus: true,
                    allowBlank: false,
                    store: Ext.create('Ext.data.Store', {
                        data: [
                            {
                                "NOMBRE": "AUSENTISMO",
                                "VALOR": "AUSENTISMO"
                            },
                            {
                                "NOMBRE": "TIPO_LICENCIA",
                                "VALOR": "TIPO_LICENCIA"
                            }
                            
                        ]
                    }),
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            var cbAusentismo = Ext.ComponentQuery.query('#CrearAusentismo #cbAusentismo')[0];
                            cbAusentismo.reset();
                            if(newValue != null){
                                storeCargarParam_AUSENTISMO.load({
                                    params: {
                                        p_cod_emp: EMPRESA,
                                        p_tipo: newValue
                                    }
                                });
                            }else{
                                storeCargarParam_AUSENTISMO.removeAll();
                            }
                        }
                    } 
                    
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbAusentismo',
                    itemId: 'cbAusentismo',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_AUSENTISMO,
                    fieldLabel: 'Ausentismo',
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
                style: 'margin-bottom: 10px',
                items: [{
                        xtype: 'datefield',
                        name: 'dtFec1',
                        labelAlign: 'top',
                        fieldLabel: 'Inicio',
                        itemId: 'dtFec1',
                        emptyText: 'yyyy/mm/dd',
                        submitFormat: 'Y/m/d',
                        format : 'Y/m/d',
                        editable: true,
                        allowBlank: false,
                        width: '100%'
        
                    }
                ]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'hbox',
                style: 'margin-bottom: 10px',
                items: [{
                        xtype: 'datefield',
                        name: 'dtFec2',
                        labelAlign: 'top',
                        fieldLabel: 'Termino',
                        itemId: 'dtFec2',
                        emptyText: 'yyyy/mm/dd',
                        submitFormat: 'Y/m/d',
                        format : 'Y/m/d',
                        editable: true,
                        allowBlank: false,
                        width: '100%'
        
                    }
                ]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 15px',
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: 'Observación',
                    labelAlign:'top',
                    name: 'txtObservacion',
                    itemId: 'txtObservacion',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 1000,
                    allowBlank: true
                }]
            }]
        }],
        buttons: [{
            tooltip: 'Ingresar Ausentismo',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                
                var cbAusentismo = Ext.ComponentQuery.query('#CrearAusentismo #cbAusentismo')[0];
                var txtRutOld = Ext.ComponentQuery.query('#CrearAusentismo #txtRutOld')[0];
                var form = this.up('form').getForm();
                var values = form.getValues();

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                       
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);
                        
                        storeCrearAusentismo.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_TIPO :  values.cbTipo
                                , P_COD_AUSENTISMO : cbAusentismo.getRawValue()
                                , P_NOMBRE_AUSENTISMO : cbAusentismo.getRawValue()
                                , P_FECHA_INI : values.dtFec1
                                , P_FECHA_FIN : values.dtFec2
                                , P_OBSERVACION : values.txtObservacion

                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Ausentismo creado correctamente.');
                                        cargarMainAusentismo(null);
                                        Ext.getCmp('CrearAusentismo').destroy();
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

