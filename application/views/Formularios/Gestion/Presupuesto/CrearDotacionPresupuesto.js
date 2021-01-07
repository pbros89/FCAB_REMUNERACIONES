Ext.define('fcab.Container.CrearDotacionPresupuesto', {
    extend: 'Ext.container.Container',
    xtype: 'CrearDotacionPresupuesto',
    itemId: 'CrearDotacionPresupuesto',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners: {
        beforerender : function() {
            storeCargarCCPresupPorUsuario.load({
                params: {
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE,
                    p_rol: ROL
                }
            });

            storeCargarCargos.load({
                params: {
                    p_cod_emp: EMPRESA,
                    p_estado: 'A'
                }
            })

        }
    },
    items: [{
        xtype: 'form',
        bodyPadding: 10,
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
                labelAlign:'left',
                fieldLabel: 'Centro de Costo',
                displayField: 'DESC_CC',
                valueField: 'PK_COD_CC',
                anchor: '100%',
                name: 'cbCC',
                itemId: 'cbCC',
                editable: true,
                triggerAction: 'all',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                selectOnFocus: true,
                allowBlank: false,
                store: storeCargarCCPresupPorUsuario
                
            }]
        }, {
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'combo',
                name: 'cbCargo',
                itemId: 'cbCargo',
                anchor: '100%',
                fieldLabel: 'Cargo',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                displayField: 'NOMBRE_FULL',
                valueField: 'PK_COD_CARGO',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                allowBlank: false,
                store: storeCargarCargos
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtEne',
                itemId: 'txtEne',
                fieldLabel: 'ENE',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtFeb',
                itemId: 'txtFeb',
                fieldLabel: 'FEB',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtMar',
                itemId: 'txtMar',
                fieldLabel: 'MAR',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtAbr',
                itemId: 'txtAbr',
                fieldLabel: 'ABR',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtMay',
                itemId: 'txtMay',
                fieldLabel: 'MAY',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtJun',
                itemId: 'txtJun',
                fieldLabel: 'JUN',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtJul',
                itemId: 'txtJul',
                fieldLabel: 'JUL',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtAgo',
                itemId: 'txtAgo',
                fieldLabel: 'AGO',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtSep',
                itemId: 'txtSep',
                fieldLabel: 'SEP',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtOct',
                itemId: 'txtOct',
                fieldLabel: 'OCT',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtNov',
                itemId: 'txtNov',
                fieldLabel: 'NOV',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'thousandnumber',
                name: 'txtDic',
                itemId: 'txtDic',
                fieldLabel: 'DIC',
                labelAlign:'top',
                maxValue: 1000000,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 0,
                value: 0,
                width: '100%',
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
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
        }],
        buttons: [{
            text: 'Agregar',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    var param = Ext.getCmp('CrearDotacionPresupuesto').myExtraParams.param2.data;

                    var cbCargo = Ext.ComponentQuery.query('#CrearDotacionPresupuesto #cbCargo')[0];
                    
                    console.log(values);
                    storeCrearPresupDotacion.load({
                        params : {
                            p_cod_emp: EMPRESA,
                            p_anho: param.PK_ANHO,
                            p_tipo: param.PK_TIPO,
                            p_cod_cc: values.cbCC,
                            p_cod_cargo: values.cbCargo,
                            p_nom_cargo: cbCargo.selection.data.NOM_CARGO,
                            p_rol: cbCargo.selection.data.FK_ROL,
                            p_dotacion: 0,
                            p_ene: values.txtEne,
                            p_feb: values.txtFeb,
                            p_mar: values.txtMar,
                            p_abr: values.txtAbr,
                            p_may: values.txtMay,
                            p_jun: values.txtJun,
                            p_jul: values.txtJul,
                            p_ago: values.txtAgo,
                            p_sep: values.txtSep,
                            p_oct: values.txtOct,
                            p_nov: values.txtNov,
                            p_dic: values.txtDic,
                            p_observacion: values.txtObservacion,
                            p_usuario: NOMBRE
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Cargo agregado correctamente.');
                                    if(Ext.getCmp('MainPresupuestoDetalle') != null){
                                        cargarDetallePresupuesto();
                                        cargarCCDotacionPresupuestoDetalle();
                                    }
                                    if(Ext.getCmp('DotacionPresupuesto') != null){
                                        cargarCCDotacionPresupuesto();
                                    }
                                    Ext.getCmp('CrearDotacionPresupuesto').destroy();
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
        }]
    }]
});
