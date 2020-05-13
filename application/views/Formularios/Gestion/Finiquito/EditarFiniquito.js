Ext.define("fcab.Container.MainFiniquitoEditar", {
    extend: 'Ext.container.Container',
    xtype: 'MainFiniquitoEditar',
    itemId: 'MainFiniquitoEditar',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function() {
            storeCargarParam_CAUSAL_DESPIDO.load();
            var param = Ext.getCmp('MainFiniquitoEditar').myExtraParams.param2.data;
            console.log(param);
            Ext.ComponentQuery.query('#MainFiniquitoEditar #txtRut')[0].setValue(param.RUT);
            Ext.ComponentQuery.query('#MainFiniquitoEditar #cbCausal')[0].setValue(param.COD_CAUSAL);
            Ext.ComponentQuery.query('#MainFiniquitoEditar #dtBaja')[0].setValue(param.FECHA_BAJA);
            Ext.ComponentQuery.query('#MainFiniquitoEditar #txtObs')[0].setValue(param.OBSERVACION);
            Ext.ComponentQuery.query('#MainFiniquitoEditar #txtPeriodo')[0].setValue(param.PERIODO);

            storeCargarPersonalFiniquito.load({
                params : {
                      p_personal : param.FK_PERSONAL
                    , p_cod_emp: EMPRESA
                    
                },
                callback: function(records, operation, success) {
                    if(records != null && records.length > 0) {
                        var txtCC = Ext.ComponentQuery.query('#MainFiniquitoEditar #txtCC')[0];
                        var txtCargo = Ext.ComponentQuery.query('#MainFiniquitoEditar #txtCargo')[0];
                        var txtNombre = Ext.ComponentQuery.query('#MainFiniquitoEditar #txtNombre')[0];
                        var txtIngreso = Ext.ComponentQuery.query('#MainFiniquitoEditar #txtIngreso')[0];

                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                        txtCargo.setValue(records[0].data.COD_CARGO+'-'+records[0].data.NOM_CARGO);
                        txtNombre.setValue(records[0].data.NOMBRE);
                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                    }else{
                        Ext.MessageBox.show({
                            title: 'ADVERTENCIA',
                            msg: "No se encontro personal con el RUT ingresado",
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                    
                }
            });
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
            columnWidth: 1,
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
                    xtype: 'textfield',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
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
                columnWidth: 1,
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
                columnWidth: 1,
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
            title: 'Finiquito',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
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
                    xtype: 'textfield',
                    itemId: 'txtPeriodo',
                    name: 'txtPeriodo',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 20,
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
                    name: 'cbCausal',
                    itemId: 'cbCausal',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_CAUSAL_DESPIDO,
                    fieldLabel: 'Causal',
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
                    xtype: 'datefield',
                    name: 'dtBaja',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Baja',
                    itemId: 'dtBaja',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: false,
    
                },]
                
            }, {
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
            tooltip: 'Editar Finiquito',
            //scale: 'large',
            text: 'Editar',
            handler: function () {

                var cbCausal = Ext.ComponentQuery.query('#MainFiniquitoEditar #cbCausal')[0];
                var param = Ext.getCmp('MainFiniquitoEditar').myExtraParams.param2.data;
                var form = this.up('form').getForm();
                var values = form.getValues();

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                        var values = form.getValues();

                        storeEditarFiniquito.load({
                            params : {
                                  p_finiquito : param.PK_FINIQUITO
                                , p_cod_causal : values.cbCausal
                                , p_nom_causal : cbCausal.getRawValue()
                                , p_fecha_baja : values.dtBaja
                                , p_usuario : NOMBRE
                                , p_cod_emp: EMPRESA
                                , p_obs: values.txtObs
                                , P_PERIODO: param.PERIODO
                                
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        cargarMainFiniquito(null);
                                        showToast('Finiquito editado correctamente.');
                                        Ext.getCmp('MainFiniquitoEditar').destroy();
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
                    }
                    
                }
            }
        }]
    }],
});

