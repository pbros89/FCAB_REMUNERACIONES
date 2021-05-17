Ext.define('fcab.Container.MasterTarifario.Crear', {
    extend: 'Ext.container.Container',
    xtype: 'MasterTarifarioCrear',
    itemId: 'MasterTarifarioCrear',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    height: 450,
    scrollable: true,
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items: [{
            xtype: 'container',
            columnWidth: 1,
            layout: 'hbox',
            style: 'margin-bottom: 5px',
            items: [{
                xtype: 'numberfield',
                name: 'txtSolicitud1',
                fieldLabel: 'Nro Solicitud',
                labelAlign: 'left',
                maxValue: 999999999,
                minValue: 1,
                allowBlank: false,
                decimalPrecision: 4,
                margin: '0 10 0 0'
            }, {
                xtype: 'button',
                text: 'Buscar',
                handler: function () {
                    var form = this.up('form').getForm();
                    if (!ValidarFormulario(form)) return;
                    var values = form.getValues();
                    console.log(values);
                    storeCargarSolicitud.load( {
                        params: { 
                            p_solicitud : values.txtSolicitud1
                        },
                        callback: function (records, operation, success) {
                            if (records != null) {
                                var data = records[0].data
                                console.log(data);
                                Ext.ComponentQuery.query('#MasterTarifarioCrear #txtSolicitud2')[0].setValue(data.NRO_SOLICITUD);
                                Ext.ComponentQuery.query('#MasterTarifarioCrear #txtRut')[0].setValue(data.RUT_CLIENTE);
                                Ext.ComponentQuery.query('#MasterTarifarioCrear #txtRazon')[0].setValue(data.RAZON_SOCIAL);
                                Ext.ComponentQuery.query('#MasterTarifarioCrear #txtRuta')[0].setValue(data.ID_RUTA);
                                Ext.ComponentQuery.query('#MasterTarifarioCrear #txtServicio')[0].setValue(data.COD_SUBTIPO_SS);
                            }
                        }
                    }, )
                }
            }]
        }],
    },{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items: [ {
            xtype: 'fieldset',
            title: 'Solicitud',
            columnWidth: 1,

            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nro Solicitud',
                    labelAlign: 'left',
                    name: 'txtSolicitud2',
                    itemId: 'txtSolicitud2',
                    typeAhead: true,
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 200,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Rut',
                    labelAlign: 'left',
                    name: 'txtRut',
                    itemId: 'txtRut',
                    typeAhead: true,
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 200,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Razón Social',
                    labelAlign: 'left',
                    name: 'txtRazon',
                    itemId: 'txtRazon',
                    typeAhead: true,
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 200,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'ID Ruta',
                    labelAlign: 'left',
                    name: 'txtRuta',
                    itemId: 'txtRuta',
                    typeAhead: true,
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 200,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Servicio',
                    labelAlign: 'left',
                    name: 'txtServicio',
                    itemId: 'txtServicio',
                    typeAhead: true,
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 200,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },],
        },{
            xtype: 'fieldset',
            title: 'Tarifas',
            columnWidth: 1,
            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtBono',
                    fieldLabel: 'Bono Conductor',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtBonoSec',
                    fieldLabel: 'Bono Conductor Sec',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtViatico',
                    fieldLabel: 'Víatico',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtValor',
                    fieldLabel: 'Valor',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtTon27_5',
                    fieldLabel: 'Ton 27.5',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtPeaje',
                    fieldLabel: 'Peaje',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtTiempoEspera',
                    fieldLabel: 'Tiempo Espera',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtFactorTE',
                    fieldLabel: 'Factor Tiempo Espera',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 4,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtBonoSQM',
                    fieldLabel: 'Bono SQM',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: "thousandnumber",
                    name: 'txtMp',
                    fieldLabel: 'MP Vacio',
                    labelAlign: 'left',
                    maxValue: 99999999,
                    minValue: 0,
                    allowBlank: false,
                    decimalPrecision: 0,
                    value: 0
                }]
            },],
        }],
        buttons: [{
            text: 'Crear',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    Ext.MessageBox.show({
                        msg: 'Cargando',
                        progressText: 'Espere por favor...',
                        width: 300,
                        wait: {
                            interval: 200
                        }
                    });

                    storeCrearTarifa.load({
                        params: {
                            p_nro_solicitud: values.txtSolicitud2, 
                            p_rut: values.txtRut, 
                            p_razon_social: values.txtRazon, 
                            p_id_ruta: values.txtRuta, 
                            p_servicio: values.txtServicio, 
                            p_bono_conductor: values.txtBono, 
                            p_bono_conductor_sec: values.txtBonoSec, 
                            p_viatico: values.txtViatico, 
                            p_valor: values.txtValor, 
                            p_ton_27_5: values.txtTon27_5, 
                            p_peaje: values.txtPeaje,
                            p_tiempo_espera: values.txtTiempoEspera, 
                            p_factor_te: values.txtFactorTE, 
                            p_bono_sqm: values.txtBonoSQM, 
                            p_mp_vacio: values.txtMp, 
                            p_usuario: NOMBRE
                        },
                        callback: function (records, operation, success) {
                            Ext.MessageBox.hide();
                            if (records != null && records.length > 0) {
                                if (records[0].data.r_msg == 'OK') {
                                    showToast('Tarifa creada correctamente.');
                                    cargarMasterTarifario();
                                    Ext.getCmp('MasterTarifarioCrear').destroy();
                                } else {
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
        }]
    }]

});