Ext.define("fcab.Container.CrearIngHaberRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngHaberRRLL',
    itemId: 'CrearIngHaberRRLL',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);

        storeCargarParam_TIPO_HABER_RRLL.load();
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
                        var txtRut = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtIngreso')[0];

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
            title: 'Haber RRLL',
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
                    name: 'cbTipoHaber',
                    itemId: 'cbTipoHaber',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_HABER_RRLL,
                    fieldLabel: 'Tipo Haber',
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
                            if(newValue != null){
                                storeCargarHaberesRRLLFiltro.load({
                                    params: {
                                        p_cod_emp: EMPRESA,
                                        p_tipo: newValue
                                    }
                                });
                            }else{
                                storeCargarHaberesRRLLFiltro.removeAll();
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
                    name: 'cbHaber',
                    itemId: 'cbHaber',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarHaberesRRLLFiltro,
                    fieldLabel: 'Haber',
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
                            
                            var txtUsaFecha = Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtUsaFecha')[0];
                            var dtInicio = Ext.ComponentQuery.query('#CrearIngHaberRRLL #dtInicio')[0];
                            var dtTermino = Ext.ComponentQuery.query('#CrearIngHaberRRLL #dtTermino')[0];
                            if(newValue != null){
                                var item = obj.selection.data;
                                if(item.USA_FECHA == '1') {
                                    dtInicio.setHidden(false);
                                    dtTermino.setHidden(false);
                                    txtUsaFecha.setHidden(false);
                                    txtUsaFecha.setValue('SI');
                                    dtInicio.setValue(null);
                                    dtTermino.setValue(null);

                                }else{
                                    dtInicio.setHidden(true);
                                    dtTermino.setHidden(true);
                                    txtUsaFecha.setHidden(false);
                                    txtUsaFecha.setValue('NO');
                                    dtInicio.setValue(new Date());
                                    dtTermino.setValue(new Date());
                                }
                                
                            }else{
                                dtInicio.setHidden(true);
                                dtTermino.setHidden(true);
                                txtUsaFecha.setHidden(true);
                                txtUsaFecha.setValue('');
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
                    xtype: 'textfield',
                    itemId: 'txtUsaFecha',
                    name: 'txtUsaFecha',
                    labelAlign:'top',
                    fieldLabel: 'Usa Fecha',
                    anchor: '50%',
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    hidden: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtInicio',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Inicio',
                    itemId: 'dtInicio',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    hidden: true,
                    allowBlank: false,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtTermino',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Termino',
                    itemId: 'dtTermino',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    hidden: true,
                    allowBlank: false,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbFormato',
                    itemId: 'cbFormato',
                    store: [['UF','UF'], ['$', '$'], ['%', '%']],
                    fieldLabel: 'Formato Valores',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtMonto',
                    name: 'txtMonto',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto Total',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            
                        }
                    }
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
            tooltip: 'Ingresar Haber RRLL',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                //Ext.getCmp('cemp').getRawValue();
                
                var txtRutOld =  Ext.ComponentQuery.query('#CrearIngHaberRRLL #txtRutOld')[0];
                var cbHaber =  Ext.ComponentQuery.query('#CrearIngHaberRRLL #cbHaber')[0];

                var form = this.up('form').getForm();
                var values = form.getValues();

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                       
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);

                        storeCrearIngHaberRRLL.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
                                , P_COD_EMP : EMPRESA
                                , P_USUARIO : NOMBRE
                                , P_COD_HABER: values.cbHaber
                                , P_TIPO : values.cbTipoHaber
                                , P_NOM_HABER : cbHaber.getRawValue()
                                , P_MONTO : values.txtMonto
                                , P_INICIO : values.dtInicio
                                , P_TERMINO : values.dtTermino
                                , P_USA_FECHA : values.txtUsaFecha == 'SI'? '1': '0'
                                , P_FORMATO_VALOR : values.cbFormato
                                , P_OBSERVACION : values.txtObs
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Haber RRLL creado correctamente.');
                                        cargarMainIngHaberRRLL(null);
                                        Ext.getCmp('CrearIngHaberRRLL').destroy();
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

